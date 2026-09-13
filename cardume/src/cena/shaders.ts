// Shaders próprios da cena. Todos aplicam a névoa na mão (mesma fórmula do
// FogExp2 do three, com a cor/densidade atualizadas pela cena a cada quadro)
// e terminam com os chunks de tone mapping + espaço de cor, pra casar com os
// materiais padrão do three na mesma tela.

const nevoaVert = /* glsl */ `
  varying float vDist;
`

const nevoaFrag = /* glsl */ `
  uniform vec3 uNevoa;
  uniform float uDensidade;
  varying float vDist;
  vec3 comNevoa(vec3 cor) {
    float f = 1.0 - exp(-uDensidade * uDensidade * vDist * vDist);
    return mix(cor, uNevoa, clamp(f, 0.0, 1.0));
  }
`

const saida = /* glsl */ `
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
`

// Cáusticas: bordas de células de Voronoi animadas (distância F2 - F1 perto de
// zero = borda), em duas escalas girando em sentidos opostos. Dá a rede de
// linhas claras que a luz forma no fundo raso.
const causticas = /* glsl */ `
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float bordas(vec2 p, float t) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float d1 = 8.0;
    float d2 = 8.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 g = vec2(float(x), float(y));
        vec2 o = hash2(i + g);
        o = 0.5 + 0.42 * sin(t + 6.2831 * o);
        float d = length(g + o - f);
        if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
      }
    }
    return d2 - d1;
  }
  float causticas(vec2 uv, float t) {
    float a = bordas(uv, t * 0.9);
    float b = bordas(uv * 1.73 + 3.1, -t * 0.7);
    return smoothstep(0.2, 0.0, a) + 0.55 * smoothstep(0.16, 0.0, b);
  }
  // no fundo as linhas são mais finas e mais apertadas
  float causticasFinas(vec2 uv, float t) {
    float a = bordas(uv, t * 0.9);
    float b = bordas(uv * 1.61 + 7.3, -t * 0.8);
    return smoothstep(0.11, 0.0, a) + 0.5 * smoothstep(0.08, 0.0, b);
  }
`

/* ---------------- superfície vista de baixo ---------------- */

export const superficieVert = /* glsl */ `
  ${nevoaVert}
  varying vec3 vMundo;
  void main() {
    vec4 mundo = modelMatrix * vec4(position, 1.0);
    vMundo = mundo.xyz;
    vec4 mv = viewMatrix * mundo;
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

export const superficieFrag = /* glsl */ `
  uniform float uTempo;
  uniform vec3 uCamera;
  uniform float uBrilho;
  ${nevoaFrag}
  ${causticas}
  varying vec3 vMundo;
  void main() {
    vec2 p = vMundo.xz;
    float c = causticas(p * 0.18, uTempo * 0.8);
    // Janela de Snell: direto acima de você a superfície é bem mais clara.
    float janela = smoothstep(26.0, 2.0, length(p - uCamera.xz));
    vec3 cor = mix(vec3(0.16, 0.55, 0.62), vec3(0.72, 0.95, 0.96), janela);
    cor += c * vec3(0.55, 0.8, 0.82) * (0.35 + janela);
    cor *= uBrilho;
    gl_FragColor = vec4(comNevoa(cor), 1.0);
    ${saida}
  }
`

/* ---------------- areia com cáusticas (platô de 14 m) ---------------- */

export const areiaVert = /* glsl */ `
  ${nevoaVert}
  varying vec3 vMundo;
  void main() {
    vec4 mundo = modelMatrix * vec4(position, 1.0);
    vMundo = mundo.xyz;
    vec4 mv = viewMatrix * mundo;
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

export const areiaFrag = /* glsl */ `
  uniform float uTempo;
  uniform float uLuz;
  uniform float uCaustica;
  ${nevoaFrag}
  ${causticas}
  varying vec3 vMundo;
  void main() {
    vec2 p = vMundo.xz;
    // ondulações da areia (marcas que a corrente deixa)
    float ondas = 0.5 + 0.5 * sin(p.x * 1.3 + sin(p.y * 0.4) * 2.0);
    vec3 areia = mix(vec3(0.36, 0.35, 0.28), vec3(0.47, 0.45, 0.36), ondas * 0.6);
    float c = causticasFinas(p * 0.95, uTempo);
    vec3 cor = areia * uLuz + c * uCaustica * uLuz * vec3(0.75, 0.92, 0.88);
    gl_FragColor = vec4(comNevoa(cor), 1.0);
    ${saida}
  }
`

/* ---------------- raios de sol ---------------- */

export const raioVert = /* glsl */ `
  ${nevoaVert}
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDist = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

export const raioFrag = /* glsl */ `
  uniform float uTempo;
  uniform float uOpacidade;
  uniform float uSemente;
  varying vec2 vUv;
  varying float vDist;
  void main() {
    float lado = sin(vUv.x * 3.14159);
    lado *= lado;
    float queda = pow(vUv.y, 1.8);
    float tremor = 0.65 + 0.35 * sin(uTempo * 0.7 + uSemente * 11.0) * sin(uTempo * 0.43 + uSemente * 5.0);
    float perto = smoothstep(0.5, 4.0, vDist); // some quando atravessa a câmera
    float a = lado * queda * tremor * uOpacidade * perto;
    gl_FragColor = vec4(vec3(0.85, 0.98, 1.0) * a, a);
  }
`

/* ---------------- neve marinha ---------------- */

export const neveVert = /* glsl */ `
  uniform float uTempo;
  uniform float uCamY;
  uniform float uTamanho;
  attribute float aSemente;
  ${nevoaVert}
  varying float vSemente;
  void main() {
    vec3 p = position;
    // volume infinito: a neve "acompanha" a câmera na vertical, dando a volta
    float y = mod(p.y - uTempo * (0.05 + aSemente * 0.08) - uCamY + 22.0, 44.0) - 22.0;
    p.y = uCamY + y;
    p.x += sin(uTempo * 0.3 + aSemente * 20.0) * 0.25;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDist = -mv.z;
    vSemente = aSemente;
    // teto no tamanho: sem ele, o floco que passa colado na câmera vira um
    // borrão do tamanho da tela
    gl_PointSize = min(uTamanho * (0.4 + aSemente) * (260.0 / vDist), 9.0);
    gl_Position = projectionMatrix * mv;
  }
`

export const neveFrag = /* glsl */ `
  uniform float uAlfa;
  ${nevoaFrag}
  varying float vSemente;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d) * uAlfa * (0.5 + vSemente * 0.5);
    float f = 1.0 - exp(-uDensidade * uDensidade * vDist * vDist);
    a *= (1.0 - f) * smoothstep(1.2, 4.0, vDist);
    gl_FragColor = vec4(vec3(0.9, 0.96, 0.95), a);
  }
`

/* ---------------- bolhas ---------------- */

export const bolhaVert = /* glsl */ `
  attribute float aTamanho;
  varying float vVivo;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vVivo = step(0.001, aTamanho);
    gl_PointSize = aTamanho * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

export const bolhaFrag = /* glsl */ `
  varying float vVivo;
  void main() {
    if (vVivo < 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float aro = smoothstep(0.32, 0.5, d) * (1.0 - smoothstep(0.46, 0.5, d));
    float reflexo = smoothstep(0.14, 0.0, length(c - vec2(-0.16, -0.16)));
    float a = aro * 0.75 + reflexo * 0.9 + 0.06;
    gl_FragColor = vec4(vec3(0.92, 0.99, 1.0), a);
  }
`

/* ---------------- facho da lanterna ---------------- */

export const fachoVert = /* glsl */ `
  varying float vAlong;
  varying vec3 vNormal;
  varying vec3 vVista;
  void main() {
    vAlong = uv.y;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vVista = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

export const fachoFrag = /* glsl */ `
  uniform float uIntensidade;
  varying float vAlong;
  varying vec3 vNormal;
  varying vec3 vVista;
  void main() {
    // Quem segura a lanterna olha de dentro do cone, quase na ponta — dali a
    // parede do cone é toda vista de raspão. Por isso o brilho vem do ângulo
    // rasante (e não de frente), e cai com a distância da lanterna.
    float rasante = 1.0 - abs(dot(vNormal, vVista));
    float a = pow(vAlong, 1.3) * pow(rasante, 0.6) * uIntensidade;
    gl_FragColor = vec4(vec3(1.0, 0.9, 0.68) * a, a);
  }
`
