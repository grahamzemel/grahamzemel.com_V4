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
  theShader = loadShader("src/shader.vert", "src/shader.frag");
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  //pixelDensity(1);

  createCanvas(windowWidth, windowHeight);
  noStroke();
  time_ = 0;
  shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);

  // framerate = createP('0.0'); // display framerate
  // setInterval(_ => framerate.html(frameRate() | 0), 250);
}
let baseRotation; // Variable to store the base rotation state
let manualRotationOffset = 0; // Offset for manual rotation
let manualTime; // Time at which manual rotation started
let storedTime; // Variable to store the iTime value when the mouse is pressed

function mousePressed() {
  isMousePressed = true;
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  cursor('pointer');

  // Capture the iTime value when manual rotation starts

  // baseRotation = time_ + manualRotationOffset;
  baseRotation = time_;
}

function mouseReleased() {
  isMousePressed = false;
  cursor('default');

  // Calculate the time elapsed during manual rotation
  // let elapsedManualTime = (millis() / 1000.0) - manualTime;
  // time_ = baseRotation + elapsedManualTime * 20 / ((frameRate() || 60) * 140);
  // time_ = baseRotation + manualRotationOffset;
  // baseRotation = manualRotationOffset + time_;
  // manualRotationOffset = 0; // Reset manual rotation offset

}


function draw() {
  background(28, 40, 54);
  shaderBg.style('display', 'block');
  shaderBg.shader(theShader);

  if (isMousePressed) {
    let deltaX = mouseX - prevMouseX;
    let deltaY = mouseY - prevMouseY;

    if (deltaX != 0 || deltaY != 0) {
      // Only calculate rotation change if there is mouse movement
      let rotationChange = atan2(deltaY, deltaX) * 0.01; // Adjust sensitivity
      manualRotationOffset += rotationChange;
      // Apply the combined rotation
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
  }

  let pow = map(sin(time_), -1, 1, 6, 12);
  theShader.setUniform("iTime", millis() / 1000.0); // Consistent iTime
  theShader.setUniform("iPower", pow);
  theShader.setUniform("iResolution", [width, height]);

  shaderBg.rect(0, 0, width, height);
  image(shaderBg, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let imView = false;
