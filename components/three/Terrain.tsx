'use client';

import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A topographic contour-line terrain — the studio's trade made literal.
// Elevation comes from fbm simplex noise; the fragment shader draws
// surveyor contour bands. Scroll pushes the camera through the landform;
// time makes it breathe.

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  varying float vElev;
  varying vec2 vUv;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float value = 0.0;
    float amp = 0.55;
    for (int i = 0; i < 4; i++) {
      value += amp * snoise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return value;
  }

  void main(){
    vUv = uv;
    vec3 pos = position;
    vec2 p = pos.xy * 0.34;
    p.y += uScroll * 2.4;
    p += vec2(uTime * 0.018, uTime * 0.011);
    float elevation = fbm(p);
    pos.z += elevation * 0.95;
    vElev = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorLine;
  uniform vec3 uColorBase;
  uniform vec3 uColorHigh;
  varying float vElev;
  varying vec2 vUv;

  void main(){
    float bands = vElev * 15.0;
    float dist = abs(fract(bands - 0.5) - 0.5) / fwidth(bands);
    float line = 1.0 - min(dist, 1.0);
    line = smoothstep(0.0, 1.0, line);

    vec3 ground = mix(uColorBase, uColorHigh, smoothstep(-0.6, 0.9, vElev) * 0.5);
    vec3 color = mix(ground, uColorLine, line * 0.9);

    // Fade the sheet into the section at every edge.
    float depthFade = smoothstep(0.02, 0.22, vUv.y) * (1.0 - smoothstep(0.68, 0.98, vUv.y));
    float sideFade = smoothstep(0.0, 0.14, vUv.x) * (1.0 - smoothstep(0.86, 1.0, vUv.x));
    float alpha = depthFade * sideFade;

    gl_FragColor = vec4(color, alpha);
  }
`;

function TerrainMesh({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorLine: { value: new THREE.Color('#A98F63') },
      uColorBase: { value: new THREE.Color('#EFEDE4') },
      uColorHigh: { value: new THREE.Color('#D8D3C1') },
    }),
    []
  );

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    const current = material.current.uniforms.uScroll.value;
    material.current.uniforms.uScroll.value += (scrollRef.current - current) * 0.06;
  });

  return (
    <mesh rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -0.55, 0]}>
      <planeGeometry args={[15, 9, 240, 150]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Terrain({ scrollRef }: { scrollRef: MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.15, 3.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <TerrainMesh scrollRef={scrollRef} />
    </Canvas>
  );
}
