function preload(){
    song=loadSound("music.mp3");
    }
function setup(){
Canvas=createCanvas(600,500);
Canvas.center();
webCam=createCapture(VIDEO);
webCam.hide();
poseNet=ml5.poseNet(webCam,modelLoded);
poseNet.on('pose',gotposes);
}
function draw(){
    image(webCam,0,0,600,500);
    fill("#FF0000");
    stroke("blue");
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100){
       document.getElementById("speed").innerHTML="speed=0.5 x";
       song.rate(0.5);
       
    }
    else if(rightwristy>100 && rightwristy<=200){
        document.getElementById("speed").innerHTML="speed=1 x";
        song.rate(1);
    }
    else if(rightwristy>200 && rightwristy<=300){
        document.getElementById("speed").innerHTML="speed=1.5 x";
        song.rate(1.5);
    }
    else if(rightwristy>300 && rightwristy<=400){
        document.getElementById("speed").innerHTML="speed=2 x";
        song.rate(2);
    }
    else if(rightwristy>400 && rightwristy<=500){
        document.getElementById("speed").innerHTML="speed=2.5 x";
        song.rate(2.5);
    }
    if(scoreLeftWrist > 0.2){

    circle(leftwristx,leftwristy,20);
    InNumberleftWristY = Number(leftwristy);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " +volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
var song="";
function modelLoded(){
    console.log("model is loded");

}
function gotposes(results){
if(results.length>0){
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
}
}
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreLeftWrist=0;

