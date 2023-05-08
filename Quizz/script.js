const radioButtons = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let questions = [];
let score = 0;
let indexQuestion = 0;

document.addEventListener('DOMContentLoaded', ()=>{

    initQuestions();
    submitBtn.addEventListener('click', sendAnswer)

});


function initQuestions(){
    const url = 'http://localhost:3000/quizz';

    fetch(url)
    .then( res => res.json())
    .then( data => {
        questions = data;
        showQuestions()
    });
}

function showQuestions(){
    

    deselectRadioButtons();

    const currentQuestion = questions[indexQuestion];

    const {question, a, b, c ,d}  = currentQuestion;

    questionEl.innerText = question;
    a_text.innerText = a;
    b_text.innerText = b;
    c_text.innerText = c;
    d_text.innerHTML = d;
}

function deselectRadioButtons(){
    radioButtons.forEach(radioButton =>{
        radioButton.checked = false;
    })
}

function selectAnswer(){
    let answer = '';
    radioButtons.forEach(radioButton =>{
        if(radioButton.checked){
            answer = radioButton.id
        } 
    })

    return answer;
}

function sendAnswer(){
    const answer = selectAnswer();

    if(answer === ''){
        alert('Select one answer');
        return;
    }
    
    const question = questions[indexQuestion];

    const { correct } = question;


    if(answer == correct ){
        score += 10;
    }

    indexQuestion++;

    if(questions.length > indexQuestion){
        showQuestions();
    }else{
        quiz.innerHTML = '';
        quiz.innerHTML = `
            <div class="quiz-header">
                <h1> Your score is ${score} </h1>
                <button onclick="location.reload();"> Restart Quizz </button>
            </div>
        `;
    }
}