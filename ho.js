const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const resultImage = document.getElementById("resultImage");
const plantName = document.getElementById("plantName");
const plantDescription = document.getElementById("plantDescription");
const uploadImage = document.getElementById("uploadImage");
// START CAMERA
async function startCamera(){

  try{

    const stream = await navigator.mediaDevices.getUserMedia({
      video:true
    });

    video.srcObject = stream;

  }

  catch(error){

    alert("Camera access denied ❌");
  }
}

startCamera();

// CAPTURE PHOTO
function capturePhoto(){

  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video,0,0);

  const imageData = canvas.toDataURL("image/png");

  resultImage.src = imageData;

  fakeAIAnalysis();
}

// UPLOAD IMAGE
uploadImage.addEventListener("change", function(){

  const file = this.files[0];

  if(file){

    const reader = new FileReader();

    reader.onload = function(e){

      resultImage.src = e.target.result;

      fakeAIAnalysis();
    }

    reader.readAsDataURL(file);
  }
});

// FAKE AI ANALYSIS
function fakeAIAnalysis(){

  plantName.innerText = "🤖 AI Scanning...";

  plantDescription.innerText = "Analyzing plant image using artificial intelligence...";

  setTimeout(()=>{

    const plants = [
      {
        name:"🌿 Aloe Vera",
        info:"Aloe Vera is a medicinal plant used for skin care and healing burns."
      },

      {
        name:"🌸 Lavender",
        info:"Lavender is famous for its calming scent and beautiful purple flowers."
      },

      {
        name:"🪴 Snake Plant",
        info:"Snake plants help purify indoor air and are easy to care for."
      },

      {
        name:"🍋 Lemon Plant",
        info:"Lemon plants grow citrus fruits rich in vitamin C."
      }
    ];

    const randomPlant = plants[Math.floor(Math.random()*plants.length)];

    plantName.innerText = randomPlant.name;
    plantDescription.innerText = randomPlant.info;

  },2500);
}
