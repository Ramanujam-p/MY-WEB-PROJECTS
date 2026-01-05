gsap.registerPlugin(
  MotionPathPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  Physics2DPlugin
);

MorphSVGPlugin.convertToPath("polygon");

const select = s => document.querySelector(s);

const mainSVG = select(".mainSVG");
const pContainer = select(".pContainer");
const sparkle = select(".sparkle");

gsap.set("svg", { visibility: "visible" });
gsap.set(sparkle, { y: -100, transformOrigin: "50% 50%" });

function getSVGPoints(path) {
  const raw = MotionPathPlugin.getRawPath(path);
  if (!raw) return [];
  const pts = [];
  for (let i = 0; i < raw[0].length; i += 2) {
    pts.push({ x: raw[0][i], y: raw[0][i + 1] });
  }
  return pts;
}

const treePath = getSVGPoints(".treePath");
const treeBottomPath = getSVGPoints(".treeBottomPath");

const colors = ["#E8F6F8", "#ACE8F8", "#B74551", "#5DBA72"];
const shapes = ["#star", "#circ", "#cross", "#heart"];
const particles = [];
let index = 0;

function createParticles() {
  for (let i = 0; i < 150; i++) {
    const p = select(shapes[i % shapes.length]).cloneNode(true);
    p.setAttribute("fill", colors[i % colors.length]);
    mainSVG.appendChild(p);
    gsap.set(p, { x: -100, y: -100, scale: 0.5 });
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
    duration: 3,
    physics2D: {
      velocity: gsap.utils.random(-50, 50),
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

gsap.globalTimeline.timeScale(1.4);
