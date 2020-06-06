let skyboxShader;
let img = [];
let cup;
let gl; // WebGL pointer
let tex, texLoc;

function preload() {
  skyboxShader = loadShader('shader/skybox.vert', 'shader/skybox.frag');
  // load six cubemap textures
  img[0] = loadImage("assets/sample/right.jpg");
  img[1] = loadImage("assets/sample/left.jpg");
  img[2] = loadImage("assets/sample/top.jpg");
  img[3] = loadImage("assets/sample/bottom.jpg");
  img[4] = loadImage("assets/sample/front.jpg");
  img[5] = loadImage("assets/sample/back.jpg");
  cup = loadImage("assets/sample/cup.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
}

function draw() {
  clear();
  orbitControl();
  renderSkyBox(); // draw skybox
}


function setupCubeMap() {
  gl = this._renderer.GL;
  tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[0].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[1].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[2].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[3].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[4].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA,
    gl.UNSIGNED_BYTE, img[5].canvas);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER,
    gl.LINEAR);
}

function renderSkyBox() {
  gl = this._renderer.GL;
  tex = gl.createTexture();
  shader(skyboxShader);
  // set uniform variable for cubemap texture
  gl.useProgram(skyboxShader._glProgram);
  texLoc = gl.getUniformLocation(skyboxShader._glProgram, "cubeMap");
  gl.uniform1i(texLoc, 0);

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
