// Copyright (C) 2026 l3montree GmbH
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import { sign } from '@ltonetwork/http-message-signatures'
/**
 * ECDSA P-256 Signer for HTTP Message Signatures
 * Compatible with the Go backend's pat_service.go
 */
class EcdsaP256Signer {
    alg = 'ecdsa-p256-sha256'
    private privateKey: CryptoKey | null = null
    private publicKeyHex: string = ''
    private fingerprintValue: string = ''

    constructor(public keyid: string = 'sig77') {}

    /**
     * Initialize signer from hex-encoded private key
     */
    async init(hexPrivateKey: string): Promise<void> {
        // Convert hex to BigInt
        const d = BigInt('0x' + hexPrivateKey)

        // Convert to raw bytes (32 bytes for P-256)
        const dBytes = new Uint8Array(32)
        let dValue = d
        for (let i = 31; i >= 0; i--) {
            dBytes[i] = Number(dValue & BigInt(0xff))
            dValue = dValue >> BigInt(8)
        }

        // Derive public key coordinates using elliptic curve point multiplication
        // P-256 base point G multiplied by the private key scalar d
        const { x, y } = await this.derivePublicKeyPoint(d)

        // Import the private key with complete JWK including public key coordinates
        const jwk = {
            kty: 'EC',
            crv: 'P-256',
            d: this.base64UrlEncode(dBytes),
            x: this.base64UrlEncode(x),
            y: this.base64UrlEncode(y),
            ext: true,
        }

        this.privateKey = await crypto.subtle.importKey(
            'jwk',
            jwk,
            { name: 'ECDSA', namedCurve: 'P-256' },
            true,
            ['sign'],
        )

        // Convert X and Y from bytes to hex
        const xHex = Array.from(x)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
        const yHex = Array.from(y)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')

        // Pad to 64 characters (32 bytes) each
        this.publicKeyHex = xHex.padStart(64, '0') + yHex.padStart(64, '0')

        // Calculate fingerprint (SHA-256 of public key hex string)
        this.fingerprintValue = await this.calculateFingerprint(
            this.publicKeyHex,
        )
    }

    /**
     * Derive public key point (x, y) from private key scalar using EC point multiplication
     * Implements the same logic as Go's privKey.ScalarBaseMult(privKey.D.Bytes())
     */
    private async derivePublicKeyPoint(
        d: bigint,
    ): Promise<{ x: Uint8Array; y: Uint8Array }> {
        // Convert d to bytes
        const dBytes = new Uint8Array(32)
        let dValue = d
        for (let i = 31; i >= 0; i--) {
            dBytes[i] = Number(dValue & BigInt(0xff))
            dValue = dValue >> BigInt(8)
        }

        // Create a complete PKCS#8 private key structure for P-256
        // that includes a placeholder public key point - the browser will compute the real one
        // Format: https://datatracker.ietf.org/doc/html/rfc5915

        // For P-256, we need to build: SEQUENCE { version, privateKey, curve, publicKey }
        // But WebCrypto's importKey with 'pkcs8' format requires the full structure

        // Simpler approach: Build SEC1/ECPrivateKey format and wrap it in PKCS#8
        // ECPrivateKey ::= SEQUENCE {
        //   version INTEGER { ecPrivkeyVer1(1) },
        //   privateKey OCTET STRING,
        //   parameters [0] EXPLICIT (OID for curve) OPTIONAL,
        //   publicKey [1] EXPLICIT BIT STRING OPTIONAL
        // }

        // We'll compute the public key using scalar multiplication ourselves
        // P256 curve parameters (secp256r1 / prime256v1)
        const p = BigInt(
            '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF',
        )
        const a = BigInt(
            '0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC',
        )
        // b parameter not needed for scalar mult, only for point validation
        const Gx = BigInt(
            '0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296',
        )
        const Gy = BigInt(
            '0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5',
        )

        // Perform scalar multiplication: (x, y) = d × G
        const { x, y } = this.scalarMultP256(d, Gx, Gy, a, p)

        // Convert to 32-byte arrays
        const xBytes = this.bigIntToBytes(x, 32)
        const yBytes = this.bigIntToBytes(y, 32)

        return { x: xBytes, y: yBytes }
    }

    /**
     * Scalar multiplication on P-256 curve using double-and-add algorithm
     */
    private scalarMultP256(
        k: bigint,
        Gx: bigint,
        Gy: bigint,
        a: bigint,
        p: bigint,
    ): { x: bigint; y: bigint } {
        // Point at infinity
        let Rx = BigInt(0)
        let Ry = BigInt(0)
        let isInfinity = true

        // Double-and-add algorithm
        let Qx = Gx
        let Qy = Gy

        for (let i = 0; i < 256; i++) {
            if ((k >> BigInt(i)) & BigInt(1)) {
                if (isInfinity) {
                    Rx = Qx
                    Ry = Qy
                    isInfinity = false
                } else {
                    const result = this.pointAddP256(Rx, Ry, Qx, Qy, a, p)
                    Rx = result.x
                    Ry = result.y
                }
            }

            // Point doubling
            if (i < 255) {
                const result = this.pointDoubleP256(Qx, Qy, a, p)
                Qx = result.x
                Qy = result.y
            }
        }

        return { x: Rx, y: Ry }
    }

    /**
     * Point addition on elliptic curve
     */
    private pointAddP256(
        x1: bigint,
        y1: bigint,
        x2: bigint,
        y2: bigint,
        a: bigint,
        p: bigint,
    ): { x: bigint; y: bigint } {
        if (x1 === x2 && y1 === y2) {
            return this.pointDoubleP256(x1, y1, a, p)
        }

        const slope = this.modDiv(y2 - y1, x2 - x1, p)
        const x3 = this.mod(slope * slope - x1 - x2, p)
        const y3 = this.mod(slope * (x1 - x3) - y1, p)

        return { x: x3, y: y3 }
    }

    /**
     * Point doubling on elliptic curve
     */
    private pointDoubleP256(
        x: bigint,
        y: bigint,
        a: bigint,
        p: bigint,
    ): { x: bigint; y: bigint } {
        const slope = this.modDiv(BigInt(3) * x * x + a, BigInt(2) * y, p)
        const x3 = this.mod(slope * slope - BigInt(2) * x, p)
        const y3 = this.mod(slope * (x - x3) - y, p)

        return { x: x3, y: y3 }
    }

    /**
     * Modular division: (a / b) mod p
     */
    private modDiv(a: bigint, b: bigint, p: bigint): bigint {
        return this.mod(a * this.modInv(b, p), p)
    }

    /**
     * Modular multiplicative inverse using extended Euclidean algorithm
     */
    private modInv(a: bigint, m: bigint): bigint {
        a = this.mod(a, m)
        let [oldR, r] = [a, m]
        let [oldS, s] = [BigInt(1), BigInt(0)]

        while (r !== BigInt(0)) {
            const quotient = oldR / r
            ;[oldR, r] = [r, oldR - quotient * r]
            ;[oldS, s] = [s, oldS - quotient * s]
        }

        return this.mod(oldS, m)
    }

    /**
     * Modulo operation that always returns positive result
     */
    private mod(n: bigint, m: bigint): bigint {
        return ((n % m) + m) % m
    }

    /**
     * Convert BigInt to byte array
     */
    private bigIntToBytes(n: bigint, length: number): Uint8Array {
        const bytes = new Uint8Array(length)
        for (let i = length - 1; i >= 0; i--) {
            bytes[i] = Number(n & BigInt(0xff))
            n = n >> BigInt(8)
        }
        return bytes
    }

    /**
     * Sign data using ECDSA P-256
     * Required by @ltonetwork/http-message-signatures
     */
    async sign(data: string): Promise<Uint8Array> {
        if (!this.privateKey) {
            throw new Error('Signer not initialized')
        }

        const encoded = new TextEncoder().encode(data)
        const signature = await crypto.subtle.sign(
            { name: 'ECDSA', hash: 'SHA-256' },
            this.privateKey,
            encoded,
        )

        return new Uint8Array(signature)
    }

    /**
     * Get the fingerprint (SHA-256 of public key)
     */
    getFingerprint(): string {
        return this.fingerprintValue
    }

    /**
     * Calculate SHA-256 fingerprint
     */
    private async calculateFingerprint(pubKeyHex: string): Promise<string> {
        const encoder = new TextEncoder()
        const data = encoder.encode(pubKeyHex)
        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    }

    /**
     * Base64URL encode
     */
    private base64UrlEncode(bytes: Uint8Array): string {
        const base64 = btoa(String.fromCharCode(...Array.from(bytes)))
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }
}

/**
 * Sign HTTP request using @ltonetwork/http-message-signatures
 */
export const signRequest = async (
    req: any,
    hexPrivateKey: string,
): Promise<any> => {
    try {
        // Initialize the signer
        const signer = new EcdsaP256Signer('sig77')
        await signer.init(hexPrivateKey)

        // Convert Swagger UI request to Fetch API Request
        const url = req.url
        const method = req.method || 'GET'
        const headers = new Headers(req.headers || {})
        const body = req.body || ''

        // Generate Content-Digest header (required by backend even for empty bodies)
        let contentDigest =
            'sha-256=:47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=:' // empty string digest base64
        if (body) {
            // For requests with body, compute actual SHA-256 digest
            const encoder = new TextEncoder()
            const data = encoder.encode(body)
            const hashBuffer = await crypto.subtle.digest('SHA-256', data)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashBase64 = btoa(String.fromCharCode(...hashArray))
            contentDigest = `sha-256=:${hashBase64}:`
        }
        headers.set('Content-Digest', contentDigest)

        // Create a Request object
        const request = new Request(url, {
            method,
            headers,
            body: body ? body : undefined,
        })

        // Sign the request using the library
        // The library will add Signature and Signature-Input headers
        await sign(request, {
            key: 'sig77', // Signature identifier (the name before '=' in the Signature header)
            signer,
            components: ['@method', 'content-digest'],
        })

        // Add the X-Fingerprint header (custom to devguard)
        request.headers.set('X-Fingerprint', signer.getFingerprint())

        // Convert back to Swagger UI format
        req.headers = {}
        request.headers.forEach((value, key) => {
            req.headers[key] = value
        })

        console.log('Request signed successfully', {
            fingerprint: signer.getFingerprint(),
            method,
            headers: Object.keys(req.headers),
        })

        return req
    } catch (error) {
        console.error('Error signing request:', error)
        throw error
    }
}
