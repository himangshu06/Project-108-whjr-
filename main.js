predtion_1 = "";
predtion_2 = '';


Webcam.set({

    width:350,
    height:300,
    image_format:"png",
    png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="Smily" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/8JCoCI087/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded!");
}

function speak(){
     var synth = window.speechSynthesis;
     speak_data1 = "The first hand Gesture is"+predtion_1;
     speak_data2 = "The second hand gesture is"+predtion_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
     synth.speak(utterThis);
}

function check(){
   img  = document.getElementById("Smily");
   classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
        predtion_1 = results[0].label;
        predtion_2 = results[1].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[1].label == "Amazing"){
            document.getElementById("update_emoji_2").innerHTML="&#128076;";
        }
        if(results[1].label == "Best"){
            document.getElementById("update_emoji_2").innerHTML="&#128077;";
        }
        if(results[1].label == "Victory"){
            document.getElementById("update_emoji_2").innerHTML="&#9996;";
        }
    }
}


