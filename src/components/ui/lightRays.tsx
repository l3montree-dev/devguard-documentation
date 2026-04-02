// Copyright 2026 refaeishikho
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import LightRays from '@/components/vulnerability-database/light-rays'
export default function LightRaysComponent() {
    return (
        <div className="mt-20 flex items-center justify-center sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0">
            <div
                style={{
                    width: '100vw',
                    height: '80vh',
                }}
                className="from-background pointer-events-none absolute inset-x-0 inset-y-0 right-1 bottom-0 -z-20 h-1/3 bg-linear-to-t to-transparent opacity-70"
            >
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={0.5}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>
        </div>
    )
}
