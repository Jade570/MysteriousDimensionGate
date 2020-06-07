let objectShader, skyboxShader;
let img = [];
let cup;
let gl1, gl2; // WebGL pointer
let objtex, objtexloc, tex, texLoc;
let cnv;

function preload() {
  skyboxShader = loadShader('shader/skybox.vert', 'shader/skybox.frag');
  objectShader = loadShader('shader/object.vert', 'shader/object.frag');

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
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);

  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
  //setupobjecttexture();






  ///////////////SOUND_GENERATE//////////////
  setupOscillator();
  startOscillator();

}

function draw() {
  clear();
  orbitControl();
  //rendercup();
  renderSkyBox(); // draw skybox



  /////////////////SOUND_GENERATE/////////////////
  updateOscillator();
  stopOscillator();
  playOscillator();
}
