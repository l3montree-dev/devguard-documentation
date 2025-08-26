package sigstore
import future.keywords.if

default isCompliant = false

# Ensure the attestation has the correct type
validStatement if {
	input._type == "https://in-toto.io/Statement/v0.1"
	input.predicateType == "https://cosign.sigstore.dev/attestation/v1"
}

# Ensure the subject references the correct image
valid_subject if {
	some i
	input.subject[i].name == "ghcr.io/l3montree-dev/oh-my-honeypot"
	input.subject[i].digest.sha256
}

# Parse Data from stringified JSON
validData if {
	parsedData := json.unmarshal(input.predicate.Data)
	parsedData.key == "test-attestation-2"
}

# The attestation is valid only if all conditions pass
isCompliant if {
	validStatement
	valid_subject
	validData
}
