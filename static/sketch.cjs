// a shader variable
let theShader;
let shaderBg;

let time_;

function isMobile() {
  return windowWidth < 768 ||
    window.matchMedia("(pointer: coarse)").matches;
}

function isHomepage() {
  return window.location.pathname === "/";
}

function preload() {
  if (!isHomepage()) return;
  theShader = loadShader("/shader.vert", "/shader.frag");
}

function setup() {
  if (!isHomepage()) {
    noCanvas();
    noLoop();
    return;
  }
  let cnv = createCanvas(windowWidth, windowHeight);
  // Pin canvas as a fixed background so it doesn't push page content
  cnv.style("position", "fixed");
  cnv.style("top", "0");
  cnv.style("left", "0");
  cnv.style("z-index", "-1");
  cnv.style("pointer-events", "none");

  noStroke();
  time_ = random(0, TWO_PI);

  if (isMobile()) {
    let sw = Math.round(windowWidth * 0.6);
    let sh = Math.round(windowHeight * 0.6);
    shaderBg = createGraphics(sw, sh, WEBGL);
    shaderBg.pixelDensity(1);
    shaderBg.style("display", "block");
    shaderBg.style("position", "fixed");
    shaderBg.style("left", "-9999px");
    frameRate(24);
  } else {
    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
  }
}

function draw() {
  if (!shaderBg || !theShader) return;
  background(28, 40, 54);
  shaderBg.style("display", "block");
  shaderBg.shader(theShader);

  time_ += 20 / ((frameRate() || 60) * 140);
  if (time_ > TWO_PI) {
    time_ -= TWO_PI;
  }
  theShader.setUniform("iAngle", time_);

  let pow = map(sin(time_), -1, 1, 6, 12);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform("iPower", pow);
  theShader.setUniform("iResolution", [shaderBg.width, shaderBg.height]);

  shaderBg.rect(0, 0, shaderBg.width, shaderBg.height);
  image(shaderBg, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (shaderBg) shaderBg.remove();

  if (isMobile()) {
    let sw = Math.round(windowWidth * 0.6);
    let sh = Math.round(windowHeight * 0.6);
    shaderBg = createGraphics(sw, sh, WEBGL);
    shaderBg.pixelDensity(1);
    shaderBg.style("display", "block");
    shaderBg.style("position", "fixed");
    shaderBg.style("left", "-9999px");
  } else {
    shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
  }
}
