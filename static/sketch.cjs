// a shader variable
let theShader;
let shaderBg;

let img;
let time_;
let framerate;
let isMousePressed = false;
let anchorX, anchorY;
let rotation = 0;

function preload() {
  // load the shader
  theShader = loadShader("./shader.vert", "./shader.frag");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  noStroke();
  time_ = random(0, TWO_PI); // randomizes the starting rotation
  shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);

}
let baseRotation; // Variable to store the base rotation state
let manualRotationOffset = 0; // Offset for manual rotation
let manualTime; // Time at which manual rotation started
let storedTime; // Variable to store the iTime value when the mouse is pressed

function mousePressed() {
  // check if screen is above 640px wide, if not, don't allow rotation
  if (windowWidth < 640) {
    return;
  }
  isMousePressed = true;
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  cursor('pointer');
  baseRotation = time_;
}

function mouseReleased() {
  isMousePressed = false;
  cursor('default');
}

function draw() {
  background(28, 40, 54);
  shaderBg.style('display', 'block');
  shaderBg.shader(theShader);

  if (isMousePressed) {
    let deltaX = mouseX - prevMouseX;
    let deltaY = mouseY - prevMouseY;

    if (deltaX != 0 || deltaY != 0) {
      let rotationChange = atan2(deltaY, deltaX) * 0.01; // Adjust sensitivity
      manualRotationOffset += rotationChange;
      theShader.setUniform("iAngle", baseRotation + manualRotationOffset);
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
  } else {
    // Continue automatic rotation
    time_ += 20 / ((frameRate() || 60) * 140);
    if (time_ > TWO_PI) {
      time_ -= TWO_PI;
    }
    theShader.setUniform("iAngle", time_ + manualRotationOffset);
  }

  let pow = map(sin(time_), -1, 1, 6, 12);
  theShader.setUniform("iTime", millis() / 1000.0); // Consistent iTime
  theShader.setUniform("iPower", pow);
  theShader.setUniform("iResolution", [width, height]);

  shaderBg.rect(0, 0, width, height);
  image(shaderBg, 0, 0, width, height);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

let imView = false;
