import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//scene camera renderer 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //fov, aspect ratio, near clipping plane, far clipping plane (VIEW FRUSTRUM)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //move camera back 30 units on z axis
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100); //torus geometry (radius, tube, radial segments, tubular segments)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 }); //mesh material (color)
const torus = new THREE.Mesh(geometry, material); //mesh (geometry, material)
scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff); //point light (color)
pointLight.position.set(5,5,5); //position light
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff); //ambient light (color)
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); //light helper (light)
scene.add(lightHelper);
const gridHelper = new THREE.GridHelper(200, 50); //grid helper (size, divisions)
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); //orbit controls (camera, dom element)


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update(); //update controls

  renderer.render(scene, camera);
}

animate();