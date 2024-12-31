// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(in vec2 coord, in vec2 borderWidth) {
    vec2 bl = step(borderWidth, coord);
    vec2 tr = step(borderWidth, 1.0-coord);
    return bl.x * bl.y  *  tr.x * tr.y;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    float box = rect(st, vec2(0.2, 0.4));

    color = vec3(box);

    gl_FragColor = vec4(color,1.0);
}
