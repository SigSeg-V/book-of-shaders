// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// make a new circle, splat into a vec3 to get color information
float circle(in vec2 uv, in vec2 coords, in float radius) {
    return step(distance(uv, coords), radius);
}

void MakeCircle(in vec2 uv, in vec2 coords, in float radius, in vec3 circleColor, inout vec3 pixelColor) {
    
    float circ = circle(uv, coords, radius);
    pixelColor = mix(pixelColor, circleColor, circ);
}

void main(){
	vec2 uv = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // a. The DISTANCE from the pixel to the center
    MakeCircle(uv, vec2(0.4, 0.2), 0.1, vec3(0.0,0.0,1.0), color);

	gl_FragColor = vec4( color, 1.0 );
}
