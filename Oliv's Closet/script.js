const startBtn=document.querySelector('.start-btn');
const popupInfo=document.querySelector('.popup-info');
const exitBtn=document.querySelector('.exit-btn');
const header=document.querySelector('.header');
const continueBtn=document.querySelector('.continue-btn');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () =>
{
    popupInfo.classList.add('active');
    header.classList.add('active');
}
exitBtn.onclick = () =>
{

    popupInfo.classList.remove('active');
    header.classList.remove('active');
}
continueBtn.onclick = () =>
{

    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    header.classList.remove('active');
    quizBox.classList.add('active');
   showQuestions(0);
   questionCounter(1);
   headerScore();
    
}

let questionCount = 0;
let questionNumb =1;
let userScore = 0;
const nextBtn =document.querySelector('.next-btn');
nextBtn.onclick = () => {
    if(questionCount < questions.length -1 )
    {
    questionCount++;
    showQuestions(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
    }
    else
      {
       
        showResultBox();
      }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent =`${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
optionList.innerHTML = optionTag;

const option = document.querySelectorAll('.option');
for(let i=0 ;i<option.length;i++)
{
    option[i].setAttribute('onclick', 'optionSelected(this)');
}

}

function optionSelected(answer)
{
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
   if(userAnswer == correctAnswer)
   {
        answer.classList.add('correct');
        userScore=userScore+1;
        headerScore();

   }
   else
   {
       answer.classList.add('incorrect');
   }
for( let i=0;i< allOptions; i++)
{
    optionList.children[i].classList.add('disabled');
}
nextBtn.classList.add('active');
}

function questionCounter(index)
{
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore()
{
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
}


function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
  
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    let progressStartValue = -1;
    // Calculăm procentul final
    let progressEndValue = Math.floor((userScore / questions.length) * 100);
    let speed = 20;
    
    let progress = setInterval(() => {
        progressStartValue++;
        
        // Verificăm dacă am ajuns la valoarea finală
        if (progressStartValue >= progressEndValue) {
            progressStartValue = progressEndValue; // Ne asigurăm că afișăm valoarea exactă
            clearInterval(progress);
        }
        
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c5abb8 ${progressStartValue * 3.6}deg, #b9c2cf 0deg)`;
        
    }, speed);
}


tryAgainBtn.onclick =() =>
{
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
 questionNumb =1;
 userScore = 0;
 showQuestions(questionCount);
 questionCounter(questionNumb);
 headerScore();
   
}
goHomeBtn.onclick =() =>
{
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
 questionNumb =1;
 userScore = 0;
 showQuestions(questionCount);
 questionCounter(questionNumb);

   
}
