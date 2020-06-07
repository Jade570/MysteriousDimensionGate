let portalShader, objectShader, skyboxShader;
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
  objectShader = loadShader('shader/portal.vert', 'shader/portal.frag');

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
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);

  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
  //setupobjecttexture();

  for (let i = 0; i<7; i++){
    objects[i] = new Portal_Object();
  }
  pState = 1;

  ///////////////SOUND_GENERATE//////////////
  setupOscillator();
  startOscillator();
}

function draw() {
  clear();
  //rendercup();
  renderSkyBox(); // draw skybox

  for (let i = 0; i<7; i++){
    objects[i].render();
  }


  /////////////////SOUND_GENERATE/////////////////
  updateOscillator();
  stopOscillator();
  playOscillator();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
