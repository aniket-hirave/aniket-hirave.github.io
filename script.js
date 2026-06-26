// ===============================
// Smooth Scroll Navigation
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("Portfolio Loaded Successfully");

// ===============================
// Three.js Background
// ===============================
const container = document.getElementById("bg-animation");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

// ===============================
// Particle Sphere
// ===============================
const geometry = new THREE.BufferGeometry();

const vertices = [];

const radius = 5;
const particleCount = 3000;

for (let i = 0; i < particleCount; i++) {

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    vertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    );
}

geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
);

const material = new THREE.PointsMaterial({
    color: 0x00bfff,
    size: 0.05,
    transparent: true,
    opacity: 0.9
});

const particles = new THREE.Points(
    geometry,
    material
);

scene.add(particles);

// ===============================
// Mouse Interaction
// ===============================
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = (event.clientX - window.innerWidth / 2) * 0.002;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.002;

});

// ===============================
// Animation
// ===============================
function animate() {

    requestAnimationFrame(animate);

    // Auto rotation
    particles.rotation.y += 0.0015;
    particles.rotation.x += 0.0003;

    // Camera follows mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// ===============================
// Resize
// ===============================
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
