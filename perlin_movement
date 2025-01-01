// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float RandVec(vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float Rand(float x) {
    return fract(sin(x)*1000000.0);
}

float Noise(float x) {
    float i = floor(x);  // integer
	float f = fract(x);  // fraction
    
    return mix(Rand(i), Rand(i + 1.0), smoothstep(0.,1.,f));
}

// make a new circle, splat into a vec3 to get color information
float circle(in vec2 uv, in vec2 coords, in float radius) {
    vec2 dist = uv-vec2(coords);
	return 1.-smoothstep(radius-(radius*0.01),
                         radius+(radius*0.01),
                         dot(dist,dist)*4.0);
}

void MakeCircle(in vec2 uv, in vec2 coords, in float radius, in vec3 circleColor, inout vec3 pixelColor) {
    
    float circ = circle(uv, coords, radius);
    pixelColor = mix(pixelColor, circleColor, circ);
}


void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.5);
    
    MakeCircle(uv, vec2(Noise(u_time), Noise(u_time + 1.0)), 0.01, vec3(0.0,0.0,1.0), color);
    
    //color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}
