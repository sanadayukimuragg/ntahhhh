var scene = new THREE.Scene( );
var cam = new THREE.PerspectiveCamera( 45, innerWidth/innerHeight,1,100 );
const renderer = new THREE.WebGLRenderer( );

const bg = new THREE.TextureLoader().load('bg.jpg');
scene.background = bg;

const sphTexture = new THREE.TextureLoader().load('sun.png');
var sph = new THREE.SphereGeometry(1,30,30);
const sphMat = new THREE.MeshStandardMaterial( {map:sphTexture} );
var sphMesh = new THREE.Mesh(sph, sphMat);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.SphereGeometry(1,24,24);
const moonMat = new THREE.MeshLambertMaterial({map:moonTexture});
const moonMesh = new THREE.Mesh(moon,moonMat);

const clock = new THREE.Clock();

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 5);

scene.add(sphMesh, moonMesh, pointLight);
cam.position.z = 7;

renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function(){
    renderer.setSize(this.window.innerWidth,this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});

function rotate(){
    requestAnimationFrame(rotate);

    const elaspsedTime = clock.getElapsedTime();

    sphMesh.rotation.y += 0.01;
    //boxMesh.rotation.z += 0.005;

    moonMesh.rotation.y +=0.005
    moonMesh.position.x = 3*Math.cos(elaspsedTime);
    moonMesh.position.y = 3*Math.sin(elaspsedTime);
    renderer.render( scene, cam );
}

rotate();