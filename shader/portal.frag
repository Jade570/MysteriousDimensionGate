// must always set precision
precision mediump float;

// variables passed from application
uniform vec2 u_resolution; // [width, height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;
uniform vec2 u_mousey;

void main() {

vec2 st = gl_FragCoord.xy/u_resolution.xy;
float pos = mod(gl_FragCoord.x, u_mouse[0]);

float line = (gl_FragCoord.y >u_resolution[1]-u_mousey[1] && gl_FragCoord.y <u_resolution[1]-u_mousey[0])
              ?(sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5 : 0.;

//float line = (sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5;

gl_FragColor = vec4 (1., 1., 1.*line, 1.*line);
}
