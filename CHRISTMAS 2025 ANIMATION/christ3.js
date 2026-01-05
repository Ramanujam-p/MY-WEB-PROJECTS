gsap.registerPlugin(MotionPathPlugin, Physics2DPlugin);

const select = s => document.querySelector(s);
const mainSVG = select(".mainSVG");
const pContainer = select(".pContainer");
const sparkle = select(".sparkle");

gsap.set("svg", { visibility: "visible" });
gsap.set(sparkle, { y: -100 });

function getSVGPoints(pathSelector) {
  const raw = MotionPathPlugin.getRawPath(pathSelector);
  if (!raw || !raw[0]) return [];
  const points = [];
  for (let i = 0; i < raw[0].length; i += 2) {
    points.push({ x: raw[0][i], y: raw[0][i + 1] });
  }
  return points;
}

const treePath = getSVGPoints(".treePath");
const bottomPath = getSVGPoints(".treeBottomPath");

const colors = ["#E8F6F8", "#ACE8F8", "#B74551", "#5DBA72"];
const shapes = ["#star", "#circ", "#cross", "#heart"];
const particles = [];
let index = 0;

function createParticles() {
  for (let i = 0; i < 120; i++) {
    const p = select(shapes[i % shapes.length]).cloneNode(true);
    p.setAttribute("fill", colors[i % colors.length]);
    mainSVG.appendChild(p);
    gsap.set(p, { x: -100, y: -100, scale: 0.6 });
    particles.push(p);
  }
}

function playParticle() {
  const p = particles[index];
  gsap.set(p, {
    x: gsap.getProperty(pContainer, "x"),
    y: gsap.getProperty(pContainer, "y")
  });

  gsap.to(p, {
    duration: 2.5,
    physics2D: {
      velocity: gsap.utils.random(-40, 40),
      angle: gsap.utils.random(-180, 180),
      gravity: 30
    },
    scale: 0,
    rotation: 360
  });

  index = (index + 1) % particles.length;
}

createParticles();

gsap.timeline({ onUpdate: playParticle })
  .to(".pContainer, .sparkle", {
    duration: 5,
    motionPath: { path: ".treePath" },
    ease: "none"
  })
  .to(".pContainer, .sparkle", {
    duration: 2,
    motionPath: { path: ".treeBottomPath" },
    ease: "none"
  });

gsap.globalTimeline.timeScale(1.3);
