// a shader variable
let theShader;
let shaderBg;

let img;
let time_;
let framerate;

function preload() {
  // load the shader
  theShader = loadShader("src/shader.vert", "src/shader.frag");
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  //pixelDensity(1);

  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  time_ = 0;

  // shaders require WEBGL mode to work
  shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
  
  // framerate = createP('0.0'); // display framerate
  // setInterval(_ => framerate.html(frameRate() | 0), 250);
}

function draw() {
  // we can draw the background each frame or not.
  // if we do we can use transparency in our shader.
  // if we don't it will leave a trailing after image.
  background(28, 40, 54); // Set the background color
  // shader() sets the active shader with our shader
  // make sure display is set to block
  shaderBg.style('display', 'block');

  shaderBg.shader(theShader);

  // get the mouse coordinates, map them to values between 0-1 space
  let yMouse = (map(mouseY, 0, height, height, 0) / height) * 2 - 1;
  let xMouse = (mouseX / width) * 2 - 1;

  // Make sure pixels are square
  xMouse = (xMouse * width) / height;
  yMouse = yMouse;
  
  let pow = map(sin(time_), -1, 1, 6, 12); // make pow change over time between 6 and 12

  // pass the interactive information to the shader
  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform("iPower", pow);
  theShader.setUniform("iAngle", time_);
  theShader.setUniform("iMouse", [xMouse, yMouse]);



  // rect gives us some geometry on the screen to draw the shader on
  shaderBg.rect(0, 0, width, height);
  image(shaderBg, 0, 0, width, height);
  
  let increment = 20 / ((frameRate() || 60) * 140); // timestep based on framerate, will rotate same speed on all regardless of framerate
  time_ += increment;
  if(time_ > TWO_PI) time_ -= TWO_PI; // prevent time from getting to big and maybe causing errors?

  // flip coordinate information box
  let flipX = 0;
  let flipY = 0;
  if (width - mouseX < 200) {
    flipX = -130;
  }
  if (height - mouseY < 100) {
    flipY = -35;
  }

  
  // fill(255);
  // rect(mouseX + flipX, mouseY + flipY, 60, 40);
  // fill(0);
  // text("x: " + int(mouseX), mouseX + 15 + flipX, mouseY + 15 + flipY);
  // text("y: " + int(mouseY), mouseX + 15 + flipX, mouseY + 30 + flipY);
  // fill(0);
  // rect(mouseX + 60 + flipX, mouseY + flipY, 70, 40);
  // fill(255);
  // text("x: " + nfc(xMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 15 + flipY);
  // text("y: " + nfc(yMouse, 3), mouseX + 15 + 60 + flipX, mouseY + 30 + flipY);
  // console.log(imView);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let imView = false;

function mousePressed() {
  if (imView === false) {
    imView = true;
  }
  cursor('grabbing');
}

function mouseReleased() {
  if (imView === true) {
    imView = false;
  }
  cursor('grab');
}