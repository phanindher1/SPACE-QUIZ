
var startButton = document.querySelector("#startQuiz");
var timer = document.querySelector("#timer");
var mainContent = document.querySelector("#mainContent");
var questionEl = document.querySelector("#title");
var quizContent = document.querySelector("#quizContent");
var resultDiv = document.querySelector("#answer"); 
var scoreDiv = document.querySelector("#score");
var highscoresDiv = document.querySelector("#highscores");
var navhighscorelink = document.querySelector("#navhighscorelink");
var navlink = document.getElementById("navhighscorelink");

var secondsLeft = 50, questionIndex = 0,correct = 0 ;
var totalQuestions = questions.length;
var question , option1, option2, option3 ,option4 ,ans, previousScores;
var choiceArray = [], divArray = [];
for(var i = 0 ; i < 4 ; i++){
    var dv = document.createElement("div");
    var ch = document.createElement("button");
    ch.setAttribute("data-index",i);
    ch.setAttribute("class","btn btn-primary rounded-pill mb-2");
    choiceArray.push(ch);
    divArray.push(dv);
}
var result = document.createElement("p");
result.setAttribute("class","text-muted font-italic");
resultDiv.appendChild(result);
function startQuiz(){
    
    startTimer();  
    buildQuestion();  

}
function startTimer(){
    
    var timeInterval = setInterval(function(){

        secondsLeft--;

        timer.textContent = "Time : "+secondsLeft+ " sec";
        
        if(secondsLeft <= 0 || (questionIndex > totalQuestions-1)){
            
            resultDiv.style.display = "none";
            quizContent.style.display = "none";
            viewResult();
            clearInterval(timeInterval);
            timer.textContent = "";
        }

    },1000);
}


function buildQuestion(){
    questionEl.style.display= "none";
    mainContent.style.display = "none";
    quizContent.style.display= "none";
  
    if(questionIndex > totalQuestions - 1){
        return;
    }
    else{
        ans =  questions[questionIndex].answer;
        questionEl.innerHTML = questions[questionIndex].title;
        questionEl.setAttribute("class","text-left");
        questionEl.style.display= "block";

        for(var j = 0 ; j < 4 ; j++){
            var index = choiceArray[j].getAttribute("data-index");
            choiceArray[j].textContent = (+index+1) +". "+questions[questionIndex].choices[index];
            divArray[j].appendChild(choiceArray[j]);
            quizContent.appendChild(divArray[j]);
        }
         
    }
    quizContent.style.display= "block";
}
quizContent.addEventListener("click",function(event){
    
    var element = event.target;
    var userAnswer = element.textContent;
    var userOption   = userAnswer.substring(3, userAnswer.length);
      
        if(userOption === ans){
            correct++; 
             
            resultDiv.style.display = "block"; 
            
            result.textContent = "Correct!"
            
            setTimeout(function(){
                result.textContent = "";
            },500);
        }
        else {
            secondsLeft -= 10;
            
            result.textContent = "Wrong!"
            
            setTimeout(function(){
                result.textContent = "";
            },500);       
        }
        
        questionIndex++;
        buildQuestion();       
});
function viewResult(){  

    questionEl.innerHTML = "Test Completed!";
    questionEl.style.display= "block";
    
    var s = document.createElement("p");
    s.textContent = "Your final Score : "+correct;
    scoreDiv.appendChild(s);

    var form = document.createElement("form");

    var label = document.createElement("label");
    label.textContent = "Enter Name : ";

    var text = document.createElement("input");
    text.setAttribute("id","nameInput");
    text.setAttribute("class","ml-3");

    var scoreButton = document.createElement("button"); 
    scoreButton.setAttribute("class","btn btn-primary rounded-pill mb-2 ml-3 mt-2");
    scoreButton.textContent = "Submit";
    
    form.appendChild(label);
    form.appendChild(text);
    form.appendChild(scoreButton);
    
    scoreDiv.appendChild(form);

    scoreButton.addEventListener("click",storeScores); 
}
function storeScores(event){
    
    event.preventDefault();
    var userName = document.querySelector("#nameInput").value.trim();

    if(userName === null || userName === '') {
        alert("Please enter user name");
        return;
     }
        var user = {
            name : userName,
            score : correct
        }

        console.log(user);

        previousScores = JSON.parse(localStorage.getItem("previousScores"));
        
        if(previousScores){
            previousScores.push(user);
        }
        else{
            previousScores = [user];
        }
        localStorage.setItem("previousScores",JSON.stringify(previousScores));

        showHighScores();

}
function showHighScores(){
   
    questionEl.innerHTML = "Highscores";
    questionEl.setAttribute("class","text-center text-info");
    questionEl.style.display = "block";
    
    quizContent.style.display = "none";
    scoreDiv.style.display = "none";
        var tbl = document.createElement("table");
        tbl.setAttribute("id","table");
        tbl.style.textAlign = "center";

        var tblBody = document.createElement("tbody");

        var row = document.createElement("tr");
        
        var heading1 = document.createElement("th"); 
        var headingText1 = document.createTextNode("Name");
        heading1.setAttribute("class","bg-info");
        heading1.appendChild(headingText1);
        row.appendChild(heading1);

        var heading2 = document.createElement("th");
        var headingText2 = document.createTextNode("Score");
        heading2.appendChild(headingText2);
        heading2.setAttribute("class","bg-info");
        row.appendChild(heading2);

        tblBody.appendChild(row);

        var userLength = 0;
        if(previousScores) {
            userLength = previousScores.length;
        }
        
        // creating all cells
        for (var i = 0; i < userLength ; i++) {
             var row = document.createElement("tr");
        
            var uname = previousScores[i].name;
            var uscore = previousScores[i].score;
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(uname);
            cell1.appendChild(cellText1);
            row.appendChild(cell1);

            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(uscore);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);
            tblBody.appendChild(row);
        }
        if(userLength > 0){
            tbl.appendChild(tblBody);
        }
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width","100%");
        
        highscoresDiv.appendChild(tbl);

        var btnDiv = document.createElement("div");
        btnDiv.style.textAlign = "center";
        highscoresDiv.appendChild(btnDiv);
 
    navlink.style.display = "none";
    var goback = document.createElement("button");
    goback.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    goback.textContent = "Go Back";
    btnDiv.appendChild(goback);
    goback.addEventListener("click",function(){
        window.location= "index.html";
    });
    var clearscores = document.createElement("button");
    clearscores.setAttribute("class","btn btn-primary rounded-pill mb-2 mt-4 ml-2");
    clearscores.textContent = "Clear Highscores";
    btnDiv.appendChild(clearscores);
    clearscores.addEventListener("click",function(){
        localStorage.clear();
        var table = document.querySelector("#table");
        table.style.display = "none";
    });
   
}
navhighscorelink.addEventListener("click",function(){
    
    mainContent.style.display = "none";  
    navlink.style.display = "none";
    
    previousScores = JSON.parse(localStorage.getItem("previousScores"));
    
    showHighScores();

});
startButton.addEventListener("click",startQuiz);


