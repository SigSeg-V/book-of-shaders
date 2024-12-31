#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.912,0.269,0.003);
vec3 colorB = vec3(0.376,1.000,0.002);


float easeInOutQuart(float x) {
return x < 0.5 ?
      8.0 * pow(x, 4.0) 
    : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;
}

float easeOutBounce(float x) {
float n1 = 7.5625;
float d1 = 2.75;

if (x < 1.0 / d1) {
    return n1 * pow(x, 2.0);
} else if (x < 2.0 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
} else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
} else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}
}

float easeInOutBounce(float x) {
return x < 0.5
  ? (1.0 - easeOutBounce(1.0 - 2.0 * x)) / 2.0
  : (1.0 + easeOutBounce(2.0 * x - 1.0)) / 2.0;
}

void main() {
    vec3 color = vec3(0.0);

    //float pct = easeInOutQuart(sin(u_time));
    float pct = easeInOutBounce(sin(u_time));
    
    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}
