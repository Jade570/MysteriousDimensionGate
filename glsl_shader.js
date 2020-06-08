function setupCubeMap() {
  gl1 = this._renderer.GL;
  tex = gl1.createTexture();
  //gl.activeTexture(gl.TEXTURE0);

  gl1.bindTexture(gl1.TEXTURE_CUBE_MAP, tex);
  gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);

  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[0].canvas);
  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[1].canvas);
  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[2].canvas);
  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[3].canvas);
  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[4].canvas);
  gl1.texImage2D(gl1.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl1.RGBA, gl1.RGBA,
    gl1.UNSIGNED_BYTE, img[5].canvas);
}

function renderSkyBox() {
  //tex = gl.createTexture();
  shader(skyboxShader);
  // set uniform variable for cubemap texture
  gl1.useProgram(skyboxShader._glProgram);
  texLoc = gl1.getUniformLocation(skyboxShader._glProgram, "cubeMap");
  gl1.uniform1i(texLoc, 0);

  gl1.depthFunc(gl1.LEQUAL);
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
  gl1.depthFunc(gl1.LESS);
  resetShader();
}

function setupPortal(){
  shader(portalShader);
  portalShader.setUniform("u_resolution", [width, height]);
  portalShader.setUniform("u_time", frameCount*0.01);
  portalShader.setUniform("u_mouse", [mouseX, mouseY]);
  portalShader.setUniform("u_mousey", [mouseY-5, mouseY+5]);
  portalShader.setUniform("u_pmouse", [pmouseX, pmouseY]);
  rect(0,0,width, height);
}
