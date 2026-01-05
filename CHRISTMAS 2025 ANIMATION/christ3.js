gsap.registerPlugin(
  MotionPathPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin,
  Physics2DPlugin
);

MorphSVGPlugin.convertToPath("polygon");

const select = s => document.querySelector(s);
const selectAll = s => document.querySelectorAll(s);

const mainSVG = select(".mainSVG");
const pContainer = select(".pContainer");
const sparkle = select(".sparkle");

const particleColorArray = [
  "#E8F6F8", "#ACE8F8", "#F6FBFE",
  "#A2CBDC", "#B74551", "#5DBA72",
  "#910B28", "#910B28", "#446D39"
];

const particleTypeArray = ["#star", "#circ", "#cross", "#heart"];
const particlePool = [];
let particleCount = 0;
const numParticles = 200;
let showParticle = true;

gsap.set("svg", { visibility: "visible" });
gsap.set(sparkle, { transformOrigin: "50% 50%", y: -100 });

function getSVGPoints(path) {
  const rawPath = MotionPathPlugin.getRawPath(path)[0];
  const points = [];
  for (let i = 0; i < rawPath.length; i += 2) {
    points.push({ x: rawPath[i], y: rawPath[i + 1] });
  }
  return points;
}

const treePath = getSVGPoints(".treePath");
const treeBottomPath = getSVGPoints(".treeBottomPath");

function flicker(p) {
  gsap.killTweensOf(p);
  gsap.fromTo(p, { opacity: 1 }, {
    opacity: Math.random(),
    duration: 0.07,
    repeat: -1
  });
}

function createParticles() {
  for (let i = 0; i < numParticles; i++) {
    const p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
    mainSVG.appendChild(p);
    p.setAttribute("fill", particleColorArray[i % particleColorArray.length]);
    p.setAttribute("class", "particle");
    gsap.set(p, { x: -100, y: -100, transformOrigin: "50% 50%" });
    particlePool.push(p);
  }
}

const getScale = gsap.utils.random(0.5, 3, 0.001, true);

function playParticle() {
  if (!showParticle) return;

  const p = particlePool[particleCount];
  gsap.set(p, {
    x: gsap.getProperty(pContainer, "x"),
    y: gsap.getProperty(pContainer, "y"),
    scale: getScale()
  });

  gsap.to(p, {
    duration: gsap.utils.random(1, 5),
    physics2D: {
      velocity: gsap.utils.random(-30, 30),
      angle: gsap.utils.random(-180, 180),
      gravity: gsap.utils.random(-5, 40)
    },
    rotation: gsap.utils.random(-180, 360),
    scale: 0,
    onStart: () => flicker(p)
  });

  particleCount = (particleCount + 1) % numParticles;
}

function drawStar() {
  gsap.timeline({ onUpdate: playParticle })
    .to(".pContainer, .sparkle", {
      duration: 6,
      motionPath: { path: ".treePath" },
      ease: "none"
    })
    .to(".pContainer, .sparkle", {
      duration: 1,
      onStart: () => showParticle = false,
      x: treeBottomPath[0].x,
      y: treeBottomPath[0].y
    })
    .to(".pContainer, .sparkle", {
      duration: 2,
      onStart: () => showParticle = true,
      motionPath: { path: ".treeBottomPath" },
      ease: "none"
    });
}

createParticles();
drawStar();

gsap.globalTimeline.timeScale(1.4);
