// must always set precision
precision mediump float;

// variables passed from application
uniform vec2 u_resolution; // [width, height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;

void main() {

vec2 pos = mod(gl_FragCoord.xy, u_mouse);
float dist_squared = dot(pos, pos) /200.;
float f1 = pow(dist_squared, 3.);
float f = pow(dist_squared, 5.5);


gl_FragColor = vec4 (1., 1., 0.+f, 0.);
}
