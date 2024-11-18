const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cargar el archivo .glb
const loader = new THREE.GLTFLoader();
loader.load('models/one.glb', (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(0.5, 0.5, 0.5);  // Escalar el modelo si es necesario
});

camera.position.z = 5;

// Animación de renderizado
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();