// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// finds bounds for the rectangle - splat this into a vec3 for color validation
float rect(in vec2 coord, in vec2 offset, in vec2 borderWidth) {
    coord -= offset;
    vec2 bl = step(borderWidth, coord);
    vec2 tr = step(borderWidth, 1.0-coord);
    return bl.x * bl.y  *  tr.x * tr.y;
}

// creates a new rectangle of given color at offset from the center of the screen
void MakeRect(in vec2 coord, in vec2 offset, in vec2 borderWidth, in vec3 rectColor, inout vec3 pixelColor) {
    float box = rect(coord, offset, borderWidth);

    pixelColor = mix(pixelColor, rectColor, box);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // background
    MakeRect(st, vec2(0.0, 0.0), vec2(0.1, 0.0), vec3(1.000,0.993,0.892), color);
    
    // red rect
    MakeRect(st, vec2(-0.3, 0.4), vec2(0.4, 0.3), vec3(1.0,0.0,0.0), color);
    
	// yellow rect
    MakeRect(st, vec2(0.3, 0.4), vec2(0.4, 0.3), vec3(1.0,1.0,0.0), color);
    
    // blue rect
    MakeRect(st, vec2(0.3, -0.45), vec2(0.4, 0.45), vec3(0.0,0.0,1.0), color);
    
    // black lines l to r
    MakeRect(st, vec2(-0.3, 0.4), vec2(0.48, 0.3), vec3(0.0,0.0,0.0), color);

    MakeRect(st, vec2(-0.2, 0.), vec2(0.48, 0.), vec3(0.0,0.0,0.0), color);
    
    MakeRect(st, vec2(0.3, 0.), vec2(0.48, 0.), vec3(0.0,0.0,0.0), color);
    
    MakeRect(st, vec2(0.2, 0.), vec2(0.48, 0.), vec3(0.0,0.0,0.0), color);
    
    // black lines t to b
    MakeRect(st, vec2(0., 0.36), vec2(0., 0.48), vec3(0.0,0.0,0.0), color);
    
    MakeRect(st, vec2(0., 0.2), vec2(0., 0.48), vec3(0.0,0.0,0.0), color);
    
    MakeRect(st, vec2(0.2, -0.4), vec2(0.1, 0.48), vec3(0.0,0.0,0.0), color);
    
    gl_FragColor = vec4(color,1.0);
}
