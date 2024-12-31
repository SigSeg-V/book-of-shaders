// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// returns the rotation for a given angle
mat2 Rotate(float angle) {
    return mat2(
        cos(angle), -sin(angle),
        sin(angle), cos(angle)
    );
}

// outlines a given shape
vec3 Outline(in vec2 st, in float shape, in vec3 color){
  float outline =  smoothstep( shape-0.12, shape, st.y) -
          smoothstep( shape, shape+0.12, st.y);
    
    return (1.0-shape)*color+outline;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = (vec2(0.5)-st);
    // add rotation
	pos = Rotate(-3.0 * u_time) * pos;
    
    
    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    // 3 blade propeller
    float f = cos(a*3.);
    
    // 6 blade propeller
    f = abs(cos(a*3.0));
    
    // 5 blade flower style
    f = abs(cos(a*2.5))*.5+.3;
    
    // snowflake
    f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    
    // cog
    f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    color = Outline(st, 1.-smoothstep(f,f+0.02,r), color);

    gl_FragColor = vec4(color, 1.0);
}
