// must always set precision
precision mediump float;

// variables passed from application
uniform vec2 u_resolution; // [width, height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;
uniform vec2 u_mousey;
uniform bool mousePressed;

void main() {

vec2 st = gl_FragCoord.xy/u_resolution.xy;
vec2 pos = vec2(gl_FragCoord.x - u_mouse[0], u_mouse[1] + gl_FragCoord.y-u_resolution[1]);
vec2 pos1 = vec2(gl_FragCoord.x - u_mouse[0]+100., u_mouse[1] + gl_FragCoord.y-u_resolution[1]);

float _circle = dot(pos,pos)/10000.;
float _circle1 = dot(pos1,pos1)/1000.;

gl_FragColor = mousePressed?vec4(0.,0.,0., 1.-_circle):vec4(0.,0.,0.,0.);
//gl_FragColor = vec4(0.,0.,0., 1.-_circle);
//gl_FragColor += vec4(1.,0.,0., 1.-_circle1);
//gl_FragColor = vec4(0.,0.,0.,1.-_circle2);
}
