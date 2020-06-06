let osc_sin, osc_tri, osc_saw, osc_square;
let freq, amp, scene, playing;
let sel;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);

  osc_sin = new p5.Oscillator('sine');
  osc_tri = new p5.Oscillator('triangle');
  osc_saw = new p5.Oscillator('sawtooth');
  osc_square = new p5.Oscillator('square');

  sel = createSelect();
  sel.position(10, 10);
  sel.option('1');
  sel.option('2');
  sel.option('3');
  sel.option('4');
}

function draw() {
  background(220)
  freq = constrain(map(mouseY, height, 0, 100, 500), 100, 500);
  amp = constrain(map(mouseX, 0, width, 0, 1), 0, 1);

  scene = sel.value();

  if (playing) {
    if (scene == '1') {

      osc_sin.freq(int(freq), 0.1);
      osc_sin.amp(amp, 0.1);

      osc_saw.freq(freq, 0.1);
      osc_saw.amp(1 - amp, 0.1);
    }

    if (scene == '2') {

      osc_saw.freq(int(freq), 0.1);
      osc_saw.amp(amp, 0.1);

      osc_square.freq(freq, 0.1);
      osc_square.amp(1 - amp, 0.1);
    }

    if (scene == '3') {

      osc_square.freq(int(freq), 0.1);
      osc_square.amp(amp, 0.1);

      osc_tri.freq(freq, 0.1);
      osc_tri.amp(1 - amp, 0.1);
    }

    if (scene == '4') {

      osc_tri.freq(int(freq), 0.1);
      osc_tri.amp(amp, 0.1);

      osc_saw.freq(freq, 0.1);
      osc_saw.amp(1 - amp, 0.1);
    }
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();

  if (scene == '1') {
    osc_sin.start();
    osc_saw.start();
  }

  if (scene == '2') {
    osc_square.start();
    osc_saw.start();
  }

  if (scene == '3') {
    osc_tri.start();
    osc_square.start();
  }

  if (scene == '4') {
    osc_saw.start();
    osc_tri.start();
  }

  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds

  if (scene == '1') {
    osc_sin.amp(0, 0.5);
    osc_saw.amp(0, 0.5);
  }

  if (scene == '2') {
    osc_square.amp(0, 0.5);
    osc_saw.amp(0, 0.5);
  }

  if (scene == '3') {
    osc_tri.amp(0, 0.5);
    osc_square.amp(0, 0.5);
  }

  if (scene == '4') {
    osc_saw.amp(0, 0.5);
    osc_tri.amp(0, 0.5);
  }

  // osc.amp(0, 0.5);
  playing = false;
}
