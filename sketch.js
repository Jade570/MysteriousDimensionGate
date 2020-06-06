let target = []; //array of target objects
let sensitivity_slider; //a visual graph of mouse sensitivity
let skyboxShader;
let xavierimg = [];

function preload() {
  skyboxShader = loadShader('skybox.vert', 'skybox.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  textureMode(NORMAL);
  setupCubeMap();

  //camera set-up
  cam_x = 0;
  cam_y = 0;
  cam_z = -(windowHeight / 2 / tan(PI * 30.0 / 180.0));
  cam_dx = 0;
  cam_dy = 0;
  cam_dz = 0;
  pan = 0;
  tilt = 0;
  updateCamCenter();

  //aim point set-up
  aim_rad = (-cam_z) / 10 ;


  //default mouse sensitivity
  sensitivity = 8;

  //sensitivity slider (doesn't work in mouse, but shows current sensitivity.)
  //you can control sensitivity by UP/DOWN arrow key.
  sensitivity_slider = createSlider(1, 20);
  sensitivity_slider.position(10, 10);
}

function draw() {
  background(0);
  lights();


  //camera set-up
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, -1, 0);
  pan += radians(movedX) / sensitivity;
  tilt -= radians(movedY) / sensitivity;
  updateCamCenter();
  handleUserInput();

  //aimpoint set-up
  push();
  translate(aim_x, aim_y, aim_z);
  fill(255, 255, 255);
  noStroke();
  sphere(0.5, 4, 4);
  pop();

  //change sensitivity (by UP/DOWN arrows)
  if (keyIsPressed) {
    if (keyCode == UP_ARROW) {
      sensitivity -= 0.1;
      if (sensitivity >= 20) {
        sensitivity = 20;
      }
    } else if (keyCode == DOWN_ARROW) {
      sensitivity += 0.1;
      if (sensitivity <= 1) {
        sensitivity = 1;
      }
    }
  }
  sensitivity_slider.value(16 - sensitivity);
}


function keyPressed() {
  //movement key input
  if (key == " ") {
    if (jump_toggle == false) {
      jump_toggle = true;
      t0 = millis();
    }
  }

  if (key == 'w') {
    forward = true;
  }
  if (key == 's') {
    back = true;
  }
  if (key == 'a') {
    left = true;
  }
  if (key == 'd') {
    right = true;
  }
}


function keyReleased() {
  //finish movement key input
  if (key == 'w') {
    forward = false;
  }
  if (key == 's') {
    back = false;
  }
  if (key == 'a') {
    left = false;
  }
  if (key == 'd') {
    right = false;
  }
}

function setupCubeMap() {
  gl = this._renderer.GL;
  tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[0].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[1].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[2].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[3].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[4].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, xavierimg[5].canvas);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER,
  gl.LINEAR);
}

// draw skybox as last object to draw only necessary parts
function renderSkyBox() {
shader(skyboxShader);
// set uniform variable for cubemap texture
texLoc = gl.getUniformLocation(skyboxShader._glProgram, "cubeMap");
gl.uniform1i(texLoc, 0);
// set z-depth test condition from 'less' to 'less than or equal' to
make skybox always pass z-depth test because depth buffer is usually
inialized with +1.
gl.depthFunc(gl.LEQUAL);
push();
// right
beginShape();
vertex(1, -1, -1, 0, 0);
vertex(1, 1, -1, 0, 1);
vertex(1, 1, 1, 1, 1);
vertex(1, -1, 1, 1, 0);
endShape();
//left
beginShape();
vertex(-1, -1, 1, 0, 0);
vertex(-1, 1, 1, 0, 1);
vertex(-1, 1, -1, 1, 1);
vertex(-1, -1, -1, 1, 0);
endShape();
// top
beginShape();
vertex(-1, -1, 1, 0, 0);
vertex(-1, -1, -1, 0, 1);
vertex(1, -1, -1, 1, 1);
vertex(1, -1, 1, 1, 0);
endShape();
//bottom
beginShape();
vertex(-1, 1, -1, 0, 0);
vertex(-1, 1, 1, 0, 1);
vertex(1, 1, 1, 1, 1);
vertex(1, 1, -1, 1, 0);
endShape();
//front
beginShape();
vertex(-1, -1, -1, 0, 0);
vertex(-1, 1, -1, 0, 1);
vertex(1, 1, -1, 1, 1);
vertex(1, -1, -1, 1, 0);
endShape();
// back
beginShape();
vertex(1, -1, 1, 0, 0);
vertex(1, 1, 1, 0, 1);
vertex(-1, 1, 1, 1, 1);
vertex(-1, -1, 1, 1, 0);
endShape();
pop();
// return z-depth test back to default mode
gl.depthFunc(gl.LESS);
resetShader();
}





function mouseClicked() {

  //lock pointer
  requestPointerLock();
}
