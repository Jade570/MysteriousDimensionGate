
class Portal_Object{
  constructor(){
    this.texture = daily[int(random(7))];
    this.origx = 0;
    this.origy = 0;
    this.x = 0;
    this.y = 300;
    this.z = 0;
    this.t;
    this.g = random(0.5, 3);
    this.pop = random(8, 20);
    this.click;
  }

  render(){
    if (mouseIsPressed || this.y < this.origy+300){
      push();
      translate(this.x,this.y, this.z);
      texture(this.texture);
      plane(50,50);
      pop();
      this.updatePos();
      this.fall();
    }
  }

  updatePos(){ //while mouse pressed
    if (this.y >= this.origy+300){
      this.origx = mouseX - windowWidth/2 + random(-50, 50);
      this.origy = mouseY - windowHeight/2 + random(-30, 30) + 100;
      this.x = this.origx;
      this.y = this.origy;
      this.z = 0;
      this.t = 0;
      this.texture = themeChange();
      this.g = random(0.5, 3);
    }
    if (pState != currentState){
      this.texture = themeChange();
      pState = currentState;
    }
  }


  fall(){
    this.t+= 0.5;
    this.y += this.g*this.t;
    this.z += this.pop;
  }




}

function themeChange(){
  switch(currentState){
    case 1:
      return daily[int(random(7))];

    case 2:
      return isaac[int(random(7))];

    case 3:
    return tetris[int(random(7))];


    case 4:
    return star[int(random(7))];
    break;
  }
}
