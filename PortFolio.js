document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("/api/submit-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (response.ok) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            throw new Error("Failed to send message.");
        }
    } catch (error) {
        alert("Error: Could not send message. Please try again later.");
        console.error(error);
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Variables to control cube rotation
let autoRotate = true;
let mouseX = 0;
let mouseY = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Add mouse interaction
    cube.rotation.x += mouseY * 0.01;
    cube.rotation.y += mouseX * 0.01;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Remove loading animation once the page is loaded
window.addEventListener('load', () => {
    document.body.removeChild(document.getElementById('loading'));
});

// Button interaction
document.getElementById('exploreBtn').addEventListener('click', () => {
    alert('Explore my work!');
});

// Make cube interactive
document.addEventListener('mousemove', (e) => {
    // Calculate mouse position
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Start the animation
animate();