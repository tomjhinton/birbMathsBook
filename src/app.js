import './style.scss'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'
import p5 from 'p5';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import fragmentBoardShader from './shaders/fragmentBoard.glsl'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'




const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()


const containerElement = document.getElementById('p5-container');
const containerElement2 = document.getElementById('p5-container1');


let first = 1
let second = 2
let arraySelect = 0
let array = ['+', '-', '*']



let height = 1000
let width = 2000

let p5C, p5CTex
const sketch = (p) => {



  p.preload = function(){
  // customFont = p.loadFont('./static/BasementGrotesque-Black_v1.202.otf.'); //use  preload to load the custom font
}


  p.setup = function() {
     // p.frameRate(1.1)
    p.createCanvas(800, 400);
    // p.textFont(customFont); //use the custom font for text display
  p.textAlign(p.TOP, p.TOP); //adjust the anchor point of text alignment to the horizontal and vertical centers
  p.textSize(238); //make the text 20 pixels in size
    p5C  = document.getElementById("defaultCanvas0");
    p5CTex = new THREE.CanvasTexture(p5C)
    boardMaterial.uniforms.uTexture ={
      value: p5CTex
    }


    // console.log(material)

  };

  p.draw = function() {

    p.noStroke();
      p.fill('rgba(0,0,0,1)')
      p.background('rgba(255,255,255,1)')
      p.textFont('broken')




    p.textSize(100);


          p.fill(`rgba(0,0,${50 }, 1)`)
        p.text(`${first} ${array[arraySelect]}  ${second} =`.toUpperCase()
     ,   200 ,  150, 450, height )


   //display text
  p5CTex.needsUpdate = true


  boardMaterial.needsUpdate = true
  p5C.style.display = 'none'
  };

};

let sketcHT = new p5(sketch, containerElement);


//Second p5

let p5C2, p5CTex2
let sportsArr = ['🏄','🏂🏾', '⛷', '🧗' ]
let sportsArrSelected = 1
const sketch2 = (p) => {



  p.preload = function(){
  // customFont = p.loadFont('./static/BasementGrotesque-Black_v1.202.otf.'); //use  preload to load the custom font
}


  p.setup = function() {
     // p.frameRate(1.1)
    p.createCanvas(800, 400);
    // p.textFont(customFont); //use the custom font for text display
  p.textAlign(p.TOP, p.TOP); //adjust the anchor point of text alignment to the horizontal and vertical centers
  p.textSize(238); //make the text 20 pixels in size
    p5C2  = document.getElementById("defaultCanvas1");
    p5CTex2 = new THREE.CanvasTexture(p5C2)
    shaderMaterial.uniforms.uTexture ={
      value: p5CTex2
    }


    // console.log(material)

  };

  p.draw = function() {





      p.fill('rgba(255,255,255,1)')





    p.textSize(250);

    p.clear();
    // let angle1 = p.radians(45);
    //  p.rotate(angle1);
        p.text(sportsArr[sportsArrSelected]
     ,   50 ,  50 )

     p.text('%'
  ,   450 ,  130 )

    p.textSize(50);

  p.text('√'
,   35 ,  43 )

p.text('π'
,   235 ,  243 )








   //display text
  p5CTex2.needsUpdate = true


  shaderMaterial.needsUpdate = true
    p5C2.style.display = 'none'
  };


};

let sketcHT2 = new p5(sketch2, containerElement2);


const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 5, value: 0, delay: 2 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const textureLoader = new THREE.TextureLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

console.log(overlay)


//Models

const schoolTexture = textureLoader.load('bake2.jpg')

schoolTexture.flipY = false
schoolTexture.encoding = THREE.sRGBEncoding

const schoolTexture1 = textureLoader.load('bake3.jpg')

schoolTexture1.flipY = false
schoolTexture1.encoding = THREE.sRGBEncoding

const schoolTexture2 = textureLoader.load('bake4.jpg')

schoolTexture2.flipY = false
schoolTexture2.encoding = THREE.sRGBEncoding



let selected = 0

const schoolTextArray = [schoolTexture, schoolTexture1, schoolTexture2]
const schoolMaterial = new THREE.MeshBasicMaterial({ map: schoolTextArray[selected],
  side: THREE.FrontSide})




  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: Math.random()
      },
      uValueB: {
        value: Math.random()
      },
      uValueC: {
        value: Math.random()
      },
      uValueD: {
        value: Math.floor((Math.random() * 20))
      }
    }
  })


let boardMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentBoardShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {



  }
})


let sceneGroup, school, cover1, cover2, cover3, cover4, windowM, board

let coverArr = []
gtlfLoader.load(
  'school2.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5,0.5,0.5)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y -= 1
    sceneGroup.position.z -= .5
    scene.add(sceneGroup)
    console.log(sceneGroup)


    school = gltf.scene.children.find((child) => {
      return child.name === 'school'
    })

    board = gltf.scene.children.find((child) => {
      return child.name === 'board'
    })


    cover1 = gltf.scene.children.find((child) => {
      return child.name === 'cover1'
    })

    cover2 = gltf.scene.children.find((child) => {
      return child.name === 'cover2'
    })

    cover3 = gltf.scene.children.find((child) => {
      return child.name === 'cover3'
    })

    cover4 = gltf.scene.children.find((child) => {
      return child.name === 'cover4'
    })

    windowM = gltf.scene.children.find((child) => {
      return child.name === 'window'
    })


    coverArr = [cover1, cover2, cover3, cover4, windowM]
    console.log(coverArr)
    coverArr.map(x=> {
      x.material = shaderMaterial
    })


    school.material = schoolMaterial

    board.material = boardMaterial



  }
)


  let push = document.getElementById('push')


push.addEventListener('click', function (e) {
  onClick()
});


function onClick(event) {

  // event.preventDefault()
  let cuts = document.getElementById('inputP').value

if(cuts == eval(first  + array[arraySelect] +  second)){

  first = Math.floor((Math.random() * 9))
  second = Math.floor((Math.random() * 9))
  arraySelect = Math.floor((Math.random() * 3))

  shaderMaterial.uniforms.uValueA.value = Math.random()
  shaderMaterial.uniforms.uValueB.value = Math.random()
  shaderMaterial.uniforms.uValueC.value = Math.random()
  shaderMaterial.uniforms.uValueD.value = Math.floor((Math.random() * 10))
  shaderMaterial.needsUpdate = true

  sportsArrSelected = Math.floor(Math.random() * sportsArr.length)
if(selected < schoolTextArray.length-1 ){
  selected++
}
else{
  selected = 0
}

schoolMaterial.map =
schoolTextArray[selected]
}

}



//Lights
const directionalLight = new THREE.DirectionalLight('#ffffff')
directionalLight.position.set(1,1,0)
scene.add(directionalLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

 // group

 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Cursor

const cursor = {}

cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
  cursor.x =event.clientX / sizes.width -.5
  cursor.y =event.clientY / sizes.height -.5



})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime  = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    shaderMaterial.uniforms.uTime.value = elapsedTime
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
