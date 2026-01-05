gsap.registerPlugin(MotionPathPlugin);

const sparkle = document.querySelector(".sparkle");

// Show SVG
gsap.set("svg", { visibility: "visible" });

// Timeline
const tl = gsap.timeline();

// Move sparkle along tree
tl.to(".sparkle", {
  duration: 5,
  motionPath: {
    path: ".treePath",
    align: ".treePath",
    autoRotate: false
  },
  ease: "power1.inOut"
})

// Move along bottom
.to(".sparkle", {
  duration: 2,
  motionPath: {
    path: ".treeBottomPath",
    align: ".treeBottomPath",
    autoRotate: false
  },
  ease: "power1.inOut"
});

// Speed
gsap.globalTimeline.timeScale(1.2);
