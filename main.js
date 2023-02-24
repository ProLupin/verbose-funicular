https://teachablemachine.withgoogle.com/models/6cvIvkTTB/
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

var camera= document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src="+data_uri+">";
    });
}
console.log("ml5 version: ", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6cvIvkTTB/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
var gesture="";
function speak(){
    var synth=window.speechSynthesis;
    var speak_data_1= "The first gesture is "+gesture;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("gesture_name1").innerHTML=results[0].label;
        gesture=results[0].label;
        speak();

        if(results[0].label=="amazing"){
            document.getElementById("gesturee").innerHTML="&#128076;";
        }
        if(results[0].label=="best"){
            document.getElementById("gesturee").innerHTML="&#128077;";
        }
        if(results[0].label=="victory"){
            document.getElementById("gesturee").innerHTML="&#9996;";
        }
    }
}

