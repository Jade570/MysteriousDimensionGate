let starShader, portalShader, skyboxShader;
let currentState;
let img = [];
let daily = [], isaac = [], tetris = [];
let objects = [];
let cup;
let gl1, gl2; // WebGL pointer
let objtex, objtexloc, tex, texLoc;
let cnv;

function preload() {
  skyboxShader = loadShader('shader/skybox.vert', 'shader/skybox.frag');
  starShader = loadShader('shader/star.vert', 'shader/star.frag');
  portalShader = loadShader('shader/portal.vert', 'shader/portal.frag');

  // load six cubemap textures
  img[0] = loadImage("assets/sample/right.jpg");
  img[1] = loadImage("assets/sample/left.jpg");
  img[2] = loadImage("assets/sample/top.jpg");
  img[3] = loadImage("assets/sample/bottom.jpg");
  img[4] = loadImage("assets/sample/front.jpg");
  img[5] = loadImage("assets/sample/back.jpg");
  cup = loadImage("assets/sample/cup.jpg");

  for (let i = 0; i<7; i++){
    isaac[i] = loadImage("assets/isaac/"+i+".png");
    tetris[i] = loadImage("assets/tetris/"+i+".png");
    daily[i] = loadImage("assets/daily/"+i+".png");
  }
}

function setup() {
  cnv = createCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight), WEBGL);


  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
  //setupobjecttexture();

  for (let i = 0; i<7; i++){
    objects[i] = new Portal_Object();
  }
  pState = 1;
  rectMode(CENTER);

  ///////////////SOUND_GENERATE//////////////
  setupOscillator();
  startOscillator();
}

function draw() {

  background(255);
  renderSkyBox(); // draw skybox

  for (let i = 0; i<7; i++){
    objects[i].render();
  }

  push();
  fill(0,0,0,0);
  setupPortal();
  pop();
  /////////////////SOUND_GENERATE/////////////////
  updateOscillator();
  stopOscillator();
  playOscillator();
}

function windowResized() {
  resizeCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight));
}
