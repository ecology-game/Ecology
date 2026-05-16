let playerName="";
let currentQuestions=[];
let currentIndex=0;
let score=0;
let xp=0;
let selectedAnswer=null;
let selectedType="all";

let timer;
let timeLeft=30;

/* البداية */

function startIntro(){

document.getElementById("intro-screen").style.display="none";

document.getElementById("name-screen").style.display="block";

}

/* الاسم */

function saveName(){

let name=document.getElementById("user-name").value;

if(name.trim()===""){

alert("اكتب اسمك");

return;

}

playerName=name;

document.getElementById("name-screen").style.display="none";

document.getElementById("type-screen").style.display="block";

}

/* النوع */

function chooseType(type){

selectedType=type;

document.getElementById("type-screen").style.display="none";

document.getElementById("setup-screen").style.display="block";

document.getElementById("welcome-msg").innerText=
"أهلاً "+playerName;

}

/* الأسئلة */
const questionsData={

easy:[
{type:"mcq",q:" نطلق على مجموعة من المخلوقات الحية من النوع نفسه تعيش و تتكاثر في المكان و الوقت ذاته",options:["الجماعةالحيوية","النظام البيئي","المجتمع الحيوي"],correct:0},
{type:"mcq",q:"    اي من الخيارات التالية يمثل عاملا لا حيويا في البيئة الصحراوية",options:["البكتيريا","النباتات الشوكية "," درجة الحرارة"],correct:2},
{type:"mcq",q:"تسمى العلاقة التي يستفيد منها كلاهما الاخر بعلاقة",options:["التقايض"," تبادل النفعة","الافتراس "],correct:1},
{type:"mcq",q:"ما المصطلح الذي يصف المساحة التي يعيش فيها المخلوق الحي",options:["الموطن","  الاطار البيئي","المنطقة الحيوية "],correct:0},
{type:"mcq",q:"ما المصطلح العلمي الذي يصف فرع العلم الذي يدرس العلاقات المتبادلة بين المخلوقات الحية وتفاعلاتها مع بيئاتها",options:["علم الفلك"," علم الارض ","علم البيئة "],correct:2},
{type:"tf",q:"البيئة هي الوسط الذي يعيش فيه المخلوق الحي مؤثرا و متاثرا  بما يحيط به من مكونات حية وغير حية.",correct:true},
{type:"tf",q:"تعتبر التربة و الحرارة و الضوء امثلة على العوامل الحيوية في البيئة.",correct:false},
{type:"tf",q:"الغلاف الحيوي جزء من الكرة الارضية يدعم الحياة.",correct:true},
{type:"tf",q:"يعتبر المخلوق الحي ابسط مستويات التنظيم في الغلاف الحيوي",correct:true},
{type:"tf",q:"المخلوقات ذاتية التغذية هي التي تحصل على طاقتها من ضوء الشمس او المواد غير العضوية لتنتج غذائها.",correct:true},
{type:"fill",q:"كم نسبة الماء العذب على الكرة الارضية",correct:"2.5%"},
{type:"fill",q:"من انواع التنوع الحيوي ويعتمد على الجينات",correct:"التنوع الوراثي"},
{type:"fill",q:"جزءمن الارض يدعم الحياة تعريف ل",correct:"الغلاف الحيوي"},
{type:"fill",q:"فرع متخصص من العلوم يدر العلاقات المتبادلة بين الخلوقات الحية وتفاعلاتها مع بيئتها",correct:"علم البيئة"},
{type:"fill",q:"دور المخلوق الحي او موضعه في بيئته",correct:"الاطار البيئي"}
],

medium:[
{type:"mcq",q:"ما  المقصود بالعامل المحدد",options:["عامل حيوي","عامل لا حيوي ","جميع ما سبق"],correct:2},
{type:"mcq",q:"مثال على عامل لا حيوي قد يحدد بقاء الكائنات في الصحراء",options:["التركيب الكيميائي للتربة "," البكتريا الموجودة في الجذور","  انواع النباتات المتنافسة"],correct:0},
{type:"mcq",q:"    كم عدد انواع التنوع الحيوي",options:[" 2"," 5  "," 3 "],correct:2},
{type:"mcq",q:"    في اي مكان يحتمل وجود الاشنات كانواع رائدة",options:[" شعاب مرجانية"," بركان حديث التكون  ","  مجتمع ذروة لغابة"],correct:1},
{type:"tf",q:"في علاقة التقايض يستفيد احد المخلوقين بينما يتضرر الاخر بشكل مباشر.",correct:false},
{type:"tf",q:"يعيش نبات فينيوس صائد الحشرات في بيئات تفتقر الى عنصر النيتروجين لذا تحورت اوراقه لتكون مصائد.",correct:true},
{type:"tf",q:"تبلغ نسب الماء العذب المتوفرة في الكرة الارضية حوالي 31.4% فقط",correct:false},
{type:"tf",q:"يحدث التعاقب البيئي الأولي في المناطق التي توجد فيها تربة مسبقاً بعد حدوث خلل في المجتمع الحيوي.",correct:false},
{type:"tf",q:"تتميز منطقة التندرا بوجود طبقة تربة متجمدة دائماً تحت السطح، مما يمنع الأشجار من تكوين جذور عميقة.",correct:true},
{type:"fill",q:"يعتبر توزيع الإبل  توزيع",correct:"تكتلي"},
{type:"fill",q:"    مخلوقات حية تطفو بحرية ذاتية التغذية تعيش في المياه العذبة أو البحيرة المالحة",correct:"العوالق"},
{type:"fill",q:"    الموارد التي تستبدل بالعمليات الطبيعية اسرع مما تستهلك",correct:"الموارد المتجددة"},
{type:"fill",q:"   احدى طرق الاستفادة من الموارد الطبيعية يسمى  ",correct:"الاستخدام المستدام"}
],

hard:[
{type:"mcq",q:"تعتبر الحرائق في بعض الغابات من العوامل المحددة تحت اي تصنيف",options:["عوامل تكافلية","عوامل لا حيوية","عوامل حيوية"],correct:1},
{type:"mcq",q:"    في تجربة الكشف عن النترات في مصادر المياه، ما النتيجة المتوقعة لارتفاع مستوى النترات بشكل كبير ",options:[" تحول الماء إلى ماء مقطر نقي تلقائياً"," زيادة معدل نمو الطحالب في مجاري المياه  "," نقصان معدل نمو الطحالب في مجاري المياه "],correct:1},
{type:"mcq",q:"أي من الدورات التالية تعتمد بشكل كبير على العمليات 'الجيوكيميائية الحيوية",options:["دورة النيتروجين والفسفور والكربون","دورة الألوان في ضفدع الأشجار","دورة حياة المخلوق الحي فقط"],correct:0},
{type:"mcq",q:"أي مما يلي يعد مثالاً على 'عامل حيوي' في بيئة صحراوية",options:[" شدة ضوء الشمس الساقط على الكثبان"," التركيب الكيميائي للتربة الرملية "," أنواع النباتات التي تتغذى عليها الجمال"],correct:2},
{type:"mcq",q:"    يُعرف 'الغلاف الحيوي' بأنه",options:[" قلب الأرض الملتهب المكون من معادن منصهرة"," جزء من الأرض يدعم الحياة  "," المناطق التي يعيش فيها الإنسان حصراً "],correct:1},
{type:"tf",q:"تعتبر الظواهر الطبيعية مثل الجفاف والفيضانات من العوامل المحددة التي تعتمد على كثافة الجماعة الحيوية .",correct:false},
{type:"tf",q:"تتم عملية تثبيت النيتروجين (النترتة) حصراً عن طريق البكتيريا التي تعيش في التربة أو الماء.",correct:false},
{type:"tf",q:"المخلوقات التي تتبع استراتيجية المعدل (r) تمتاز عادة بكبر حجمها، وطول دورة حياتها، واهتمامها الكبير بتربية الصغار.",correct:false},
{type:"tf",q:"تتميز المنطقة العميقة في البحيرات والبرك بأنها منطقة ضحلة وتصلها كمية وفيرة من الأكسجين والأشعة الشمسية.",correct:false},
{type:"tf",q:"نمط الأداء الثابت هو سلوك مكتسب ينتج عن التفاعل بين السلوكات الغريزية والخبرات السابقة ضمن بيئة محددة.",correct:false},
{type:"fill",q:"...... يتدفق الماء في الأنهار والجداول  في اتجاه واحد فقط ابتداء من ",correct:"منبع الماء"},
{type:"fill",q: "يصنف الوشق من الكائنات الحية بحسب تغذيته أنه ",correct:"اكل لحوم"},
{type:"fill",q:" يسمى علم السكان الاحصائي ب",correct:"الديموغرافيا"},
{type:"fill",q:" اي عامل حيوي أو لا حيوي يحدد عدد المخلوقات وتكاثرها و توزيعها يسمى  ",correct:"العامل المحدد"},
{type:"fill",q:"مادة كيميائية يجب أن يحصل عليها المخلوق الحي من بيئته للقيام بعملياته الحيوية واستمرار حياته",correct:"المادة المغذية"}
]

};


/* بدء الاختبار */

function startTest(level){

let all=questionsData[level];

currentQuestions=
(selectedType==="all")
? all
: all.filter(q=>q.type===selectedType);

currentIndex=0;

score=0;

xp=0;

document.getElementById("setup-screen").style.display="none";

document.getElementById("question-screen").style.display="block";

showQuestion();

}

/* عرض السؤال */

function showQuestion(){

let q=currentQuestions[currentIndex];

document.getElementById("question-text").innerText=q.q;

document.getElementById("feedback").innerText="";

document.getElementById("xp").innerText=
"⭐ النقاط: "+xp;

let box=document.getElementById("answers");

box.innerHTML="";

/* اختياري */

if(q.type==="mcq"){

q.options.forEach((o,i)=>{

box.innerHTML+=
`<div class="option"
onclick="selectOption(${i},this)">
${o}
</div>`;

});

}

/* صح وخطأ */

if(q.type==="tf"){

box.innerHTML=`

<div class="option"
onclick="selectOption(true,this)">
✅ صح
</div>

<div class="option"
onclick="selectOption(false,this)">
❌ خطأ
</div>

`;

}

/* إكمال */

if(q.type==="fill"){

box.innerHTML=`

<input id="fill-input"
placeholder="اكتب الإجابة">

<button onclick="checkFill()">
تحقق
</button>

`;

}

selectedAnswer=null;

startTimer();

}

/* المؤقت */

function startTimer(){

clearInterval(timer);

timeLeft=30;

document.getElementById("timer").innerText=
"⏱ "+timeLeft;

timer=setInterval(()=>{

timeLeft--;

document.getElementById("timer").innerText=
"⏱ "+timeLeft;

if(timeLeft<=0){

clearInterval(timer);

currentIndex++;

goNext();

}

},1000);

}

/* اختيار الإجابة */

function selectOption(v,e){

selectedAnswer=v;

document.querySelectorAll(".option").forEach(o=>{

o.style.border="none";

});

e.style.border="3px solid black";

}

/* التالي */

function nextQuestion(){

clearInterval(timer);

let q=currentQuestions[currentIndex];

let fb=document.getElementById("feedback");

let options=document.querySelectorAll(".option");

if(selectedAnswer===null){

alert("اختر إجابة");

return;

}

/* الألوان */

options.forEach((opt,i)=>{

if(q.type==="mcq"){

if(i===q.correct){

opt.classList.add("correct");

}

if(i===selectedAnswer && i!==q.correct){

opt.classList.add("wrong");

}

}

if(q.type==="tf"){

if((q.correct===true && i===0) ||
(q.correct===false && i===1)){

opt.classList.add("correct");

}

if((selectedAnswer===true && i===0 && !q.correct) ||

(selectedAnswer===false && i===1 && q.correct)){

opt.classList.add("wrong");

}

}

});

/* النتيجة */

if(selectedAnswer===q.correct){

score++;

xp+=10;

fb.innerText="✅ إجابة صحيحة";

fb.style.color="green";

}else{

fb.innerText="❌ إجابة خاطئة";

fb.style.color="red";

}

document.getElementById("xp").innerText=
"⭐ النقاط: "+xp;

setTimeout(()=>{

currentIndex++;

goNext();

},1200);

}

/* الإكمال */

function checkFill(){

clearInterval(timer);

let input=
document.getElementById("fill-input")
.value
.trim();

let q=currentQuestions[currentIndex];

let fb=document.getElementById("feedback");

if(input===""){

alert("اكتب الإجابة");

return;

}

if(input===q.correct){

score++;

xp+=10;

fb.innerText="✅ صحيح";

fb.style.color="green";

}else{

fb.innerText=
"❌ خطأ: "+q.correct;

fb.style.color="red";

}

document.getElementById("xp").innerText=
"⭐ النقاط: "+xp;

setTimeout(()=>{

currentIndex++;

goNext();

},1200);

}

/* الانتقال */

function goNext(){

if(currentIndex<currentQuestions.length){

showQuestion();

}else{

document.getElementById("quiz-box").innerHTML=`

<h2>
🎉 انتهت اللعبة
</h2>

<p>
👤 ${playerName}
</p>

<p>
⭐ النقاط: ${xp}
</p>

<p>
📚 النتيجة:
${score}/${currentQuestions.length}
</p>

<br><br>

<button onclick="goHome()">
🏠 الرجوع للرئيسية
</button>

`;

}

}

/* الرجوع للرئيسية */

function goHome(){

window.location.href="index.html";

}
