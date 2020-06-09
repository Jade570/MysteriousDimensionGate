// must always set precision
precision mediump float;

// variables passed from application
uniform vec2 u_resolution; // [width, height]
uniform vec2 u_mouse; // [mouseX, mouseY]
uniform float u_time;
uniform vec2 u_mousey;

void main() {

vec2 st = gl_FragCoord.xy/u_resolution.xy;


float line = (gl_FragCoord.y >u_resolution[1]-u_mousey[1] && gl_FragCoord.y <u_resolution[1]-u_mousey[0])
              ?(sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5 : 0.;
float line2 = (gl_FragCoord.y >u_resolution[1]-u_mousey[1]+15. && gl_FragCoord.y <u_resolution[1]-u_mousey[0]+15.)
              ?(sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5 : 0.;
float line3 = (gl_FragCoord.y >u_resolution[1]-u_mousey[1]-15. && gl_FragCoord.y <u_resolution[1]-u_mousey[0]-15.)
              ?(sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5 : 0.;


//float line = (sin(st.y * 300. + (u_mouse[1])/2. + 1.57)+1.0)*0.5;

gl_FragColor = vec4 (0., 0., 1.-line, 1.*line*(sin(u_time*1.85)+1.2)*0.4);
gl_FragColor += vec4 (1.-line2, 1.-line, 0., 1.*line2*(cos(u_time*2.5)+1.2)*0.4);
gl_FragColor += vec4(0., 1.-line3, 0., 1.*line3*(sin(u_time*1.3)+1.2)*0.4);

}
