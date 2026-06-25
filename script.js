// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href'))
            .scrollIntoView({
                behavior: 'smooth'
            });
    });
});

console.log("Portfolio Loaded Successfully");

// Three.js Background Animation
const container = document.getElementById("bg-animation");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create Particle Sphere
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 2500; i++) {

    const radius = 5;

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
    size: 0.06
});

const particles = new THREE.Points(
    geometry,
    material
);

scene.add(particles);

camera.position.z = 10;

// Mouse Tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

});

// Animation Loop
function animate() {

    requestAnimationFrame(animate);

    // Auto Rotation
    particles.rotation.y += 0.001;

    // Cursor Follow Effect
    particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05;

    // Slight Movement
    particles.position.x += (mouseX * 0.5 - particles.position.x) * 0.03;
    particles.position.y += (mouseY * 0.5 - particles.position.y) * 0.03;

    renderer.render(scene, camera);
}

animate();

// Responsive Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
