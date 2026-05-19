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

// عداد الترتيب
let currentPlantIndex = 0;

// النباتات بالترتيب المطلوب
const plants = [

  {
    name:"🌿 Aloe Vera",
    info:"Aloe Vera is a medicinal plant used for skin care and healing burns."
  },

  {
    name:"🪴 Snake Plant",
    info:"Snake plants help purify indoor air and are easy to care for."
  },

  {
    name:"🌸 Lavender",
    info:"Lavender is famous for its calming scent and beautiful purple flowers."
  },

  {
    name:"🍋 Lemon Plant",
    info:"Lemon plants grow citrus fruits rich in vitamin C."
  }

];

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

  plantDescription.innerText =
  "Analyzing plant image using artificial intelligence...";

  setTimeout(()=>{

    // يجيب النبات حسب الترتيب
    const currentPlant = plants[currentPlantIndex];

    plantName.innerText = currentPlant.name;
    plantDescription.innerText = currentPlant.info;

    // ينتقل للنبات اللي بعده
    currentPlantIndex++;

    // يرجع للبداية بعد آخر نبات
    if(currentPlantIndex >= plants.length){

      currentPlantIndex = 0;
    }

  },2500);
}
