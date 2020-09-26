//Code by Holly Adams hollyadams.net
//for Floating Graces performance by Linda Lauro-Lazin

//BLOOM shader by ADAM FERRISS
//https://github.com/aferriss/p5jsShaderExamples

var video;
var vScale = 8;
let particles=[];
var timer;
var counter=0;
var disW = 0;
var disH = 0;
let img;

let blurH, blurV, bloom;
let pass1, pass2, bloomPass;


function preload(){
  img=loadImage('particle.png');
  //BLOOM: load the shaders, we will use the same vertex shader and frag shaders for both passes
  blurH = loadShader('base.vert', 'blur.frag');
  blurV = loadShader('base.vert', 'blur.frag');
  bloom = loadShader('base.vert', 'bloom.frag');
  
}

function setup() {
  disW = windowWidth-20;
  disY = windowHeight-20;
  createCanvas(disW,disY);
  //BLOOM: initialize the createGraphics layers
  
  pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass2 = createGraphics(windowWidth, windowHeight, WEBGL);
  bloomPass = createGraphics(windowWidth, windowHeight, WEBGL);
  //BLOOM: turn off the cg layers stroke
  pass1.noStroke();
  pass2.noStroke();
  bloomPass.noStroke();

  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    } 
  }
  pixelDensity(1);
  video=createCapture(constraints);
  video.size((width)/vScale,(height)/vScale);
  video.hide();
  setInterval(timeIt,10);
}

function timeIt(){
  if(counter==0){
    for(let k = 0; k<10000; k++){
      if(k==9000){
       counter=1; 
      }
    }
  }else if(counter==1){
    counter=2;
  }else if(counter==2){
    counter=3;
  }else if(counter==3){
    counter=4;
  }else if(counter==4){
    counter=5;
  }else if(counter==5){
    counter=6;
  }else if(counter==6){
    counter=7;
  }else if(counter==7){
    counter=8;
  }else if(counter==8){
    counter=9;
  }else if(counter==9){
    counter=10;
  }else if(counter==10){
    counter=0;
  }
}


function draw() {
  
  image(video,0,0,width,height);
  //fill(25, 13, 31, 50);
 // rectMode(
  //rect(0,0,width,height);
  
  //BLOOM
  /*
  pass1.shader(blurH);
  blurH.setUniform('tex0', video);
  blurH.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurH.setUniform('direction', [1.0, 0.0]);
  pass1.rect(0,0,width, height);
  pass2.shader(blurV);
  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurV.setUniform('direction', [0.0, 1.0]);
  pass2.rect(0,0,width, height);
  bloomPass.shader(bloom);
  bloom.setUniform('tex0', video);
  bloom.setUniform('tex1', pass2);
  bloom.setUniform('mouseX', 0);
  bloomPass.rect(0,0,width, height);
  noTint();
  translate(width,0);
  scale(-1,1);
  //image(bloomPass, 0,0, width, height);*/
  
  
  //print(counter);
  
  for (let i=particles.length-1;i>=0;i--){
    particles[i].update();
    particles[i].show(); 
    if(particles[i].finished2()){
      particles.splice(i,1); 
    }
    //else if(particles[i].finished2()){
     // particles.splice(i,1); 
    //}
  }
  
  video.loadPixels();
  loadPixels();
  for(var y=0; y<video.height; y++){
   for(var x=0; x<video.width; x++){ 
    var index = (video.width-x+1+(y*video.width))*4;
     var r= video.pixels[index+0];
     var g= video.pixels[index+1];
     var b= video.pixels[index+2];
     var bright = (r+g+b)/3;
     var w = map(bright,0,255,0,vScale);
     
     noStroke();
     if(bright<200){
       fill(0,0);
  //rect(width-x*vScale,y*vScale,width/vScale,height/vScale);
     }
     
     else if(bright>=200){
       fill(0,0);
       if(counter==1){
         print(particles.length);
         if(particles.length<=30){
        let p = new Particle((width-x*vScale),(y*vScale),img);
        particles.push(p);
         }
       }
     }
     
     //rect(width-x*vScale,y*vScale,width/vScale,height/vScale);
     
     
   }  
  }
  
}


class Particle{
  
 constructor(valX, valY, img){
  this.x = valX;
  this.y = valY;
  this.img = img;
  this.xSize = 0;
  this.vSize = random(1,4);
  this.vx=random(-1,1);
  this.vy=random(-5,-0.5);
  this.alpha=random(0,255);
 }
  
finished1(){
 return this.alpha<0; 
}
finished2(){
 return this.alpha<150; 
}

 update(){
   this.x+=this.vx;
   this.y+=this.vy;
   this.xSize+=this.vSize;
   this.alpha-=5;
 }
  
 show(){
  //imageMode(CENTER);
  tint(255,this.alpha);
  image(this.img,this.x,this.y,this.xSize,this.xSize);
        
  //noStroke();
  //fill(235,random(149,210),52,this.alpha);
  //ellipse(this.x,this.y,this.xSize); 
 }
  
}
