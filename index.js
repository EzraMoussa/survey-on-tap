existingQuestions =[];
var topText ='';

window.onload = windowChecker;

window.addEventListener("scroll",function(){
    window.scrollTo(0,0)
},false);

function windowChecker(){
	
    if(document.body.clientWidth < 575){
    	topText='';
    	topText += '<div id="logo">';
		topText += '<h1 id="surveysOnTap" style="font-family: Roboto; margin: 0px; font-size: 3em; font-weight: 600 !important";><span>SURVEY ON TAP<mat-icon style=" ';
    	topText += 'height:70px !important;';
    	topText += 'width:70px !important;';
    	topText += 'padding-left: 0.3em;';											
    	topText += 'font-size:70px !important;></a></span></h1>';
		topText += '</div>';
		document.getElementById("logo").innerHTML = topText;
    }else{
    	topText='';
	   	topText += '<div id="logo">';
		topText += '<h1 id="surveysOnTap" style="font-family: Roboto; margin: 0px; font-size: 3em; font-weight: 600 !important";><span>SURVEY ON TAP<mat-icon style=" ';
	    topText += 'height:70px !important;';
	    topText += 'width:70px !important;';
	    topText += 'padding-left: 0.3em;';													
	    topText += 'font-size:70px !important; "class="material-icons">touch_app</mat-icon></a></span></h1>';
		topText += '</div>';
		document.getElementById("logo").innerHTML = topText;
    }
}

window.addEventListener("resize", function(event) {
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
    if(document.body.clientWidth < 575){
    	topText='';
    	
    	topText += '<div id="logo">';
		topText += '<h1 id="surveysOnTap" style="font-family: Roboto; margin: 0px; font-size: 3em; font-weight: 600 !important";><span>SURVEY ON TAP<mat-icon style=" ';
    	topText += 'height:70px !important;';
    	topText += 'width:70px !important;';
    	topText += 'padding-left: 0.3em;';
    	topText += 'font-size:70px !important;></a></span></h1>';
		topText += '</div>';
		document.getElementById("logo").innerHTML = topText;
    }else{
    	topText='';
	    topText += '<div id="logo">';
		topText += '<h1 id="surveysOnTap" style="font-family: Roboto; margin: 0px; font-size: 3em; font-weight: 600 !important";><span>SURVEY ON TAP<mat-icon style=" ';
	    topText += 'height:70px !important;';
	    topText += 'width:70px !important;';
	    topText += 'padding-left: 0.3em;';
	    topText += 'font-size:70px !important; "class="material-icons">touch_app</mat-icon></a></span></h1>';
		topText += '</div>';
		document.getElementById("logo").innerHTML = topText;
    }
})


var pages = [];

var counter = 0;

values = [[]];

var questionPageIndicator;


var radioButtons;
var returnedCheckedValue = "1";
var checkerButtons;
var returnedCheckeredValue;

var currentspreadSheetId;
var currentSheetId;
var currentURL;

var inputtedspreadSheetId;

var inputtedSheetId;
var inputtedURL;

var timeStamp = new Date();

var styles = [];
var firstStart = false;

function start(){
		
		const waitForCall = async ()=> {
			console.log(await readQuestions())
			console.log("done");

			document.getElementById("altHeading").style.display = "none";
			pages = [];
			// document.getElementById("nxt").style.display="";
			createAllQuestions();

			if(firstStart == true){
				console.log("firstStart is True");
				document.getElementById("question").style.display="block";
				document.getElementById("question").innerHTML = '<div id="question"><h2>Take our Survey!</h2><div id="stButton" class="stButton" style="display: block" align="center"><a class="stButton"  target="_blank" onclick="start()">START</a></div></div>'
				document.getElementById("stButton").innerHTML = '<a class="stButton"  target="_blank" onclick="cycle()">START</a>'
				firstStart = false;
			}else{
				cycle();

			}
			
		}

		waitForCall()		
}
var globali = 0;
//creates all the questions
function createAllQuestions(){
	console.log("createAllQuestions");
	console.log(existingQuestions.length);

	for(let i =0; i<existingQuestions.length; i++){
		console.log(existingQuestions.length);
		globali = i;

		if(existingQuestions[i].type === 'multi'){
			console.log(existingQuestions.length);
			var p = i;
			createMultiQuestionHTML(p);
		}
		if(existingQuestions[i].type === 'checkBox'){
			var p = i;
			createCheckboxQuestionHTML(p);
		}
		if(existingQuestions[i].type === 'time'){
			var p=i;
			createTimeQuestionHTML(p);

		}
		if(existingQuestions[i].type === 'range'){
			var p=i;
			createRangeQuestionHTML(p);
		}
		if(existingQuestions[i].type === 'text'){
			var p=i;
			createTextBoxQuestionHTML(p);
		}
	}
}
var checkBoxArr=[];

//cycles through the pages array and displays the value of each cell into the html
//Also restarts questions when finished
function cycle(){
	
	if(document.body.contains(document.getElementById("1"))){
		for (var i = 0, length = radioButtons.length; i < length; i++) {
			if(radioButtons[i].checked){
				returnedCheckedValue = radioButtons[i].value;
				console.log(returnedCheckedValue);
				values[0].push(returnedCheckedValue);
				//returnedCheckedValue = "";
				console.log(values[0]);

			}

		}
		if(returnedCheckedValue === "1"){
			values[0].push("");
			returnedCheckedValue = "1";
		}
		returnedCheckedValue = "1";
	}

	//length = checkerButtons.length

	if(document.body.contains(document.getElementById("2"))){
		checkBoxArr =[];
		for (var i = 0; i < checkerButtons.length; i++) {
			if(checkerButtons[i].checked){
				
				returnedCheckeredValue = checkerButtons[i].value;
				console.log(returnedCheckeredValue);
				checkBoxArr.push(returnedCheckeredValue);
				returnedCheckeredValue ="";
				
			}
			if(!(i + 1 < checkerButtons.length)){
				var joined = "";
				joined = checkBoxArr.join();
				values[0].push(joined);
				console.log(values[0]);			
			}
		}
	}
	
	if(document.body.contains(document.getElementById("textField"))){
		var inputtedText = document.getElementById("textField").value;
		values[0].push(inputtedText);
		console.log(values[0]);
		
	}	
	

	document.getElementById("question").innerHTML = pages[counter];
	
	if(pages[counter + 1]=== undefined){
		//document.getElementById("nxt").innerHTML = '<div class="stButtonOnes"><a class="stButton"  target="_blank" onclick="cycle()">SUMBIT SURVEY</a></div>';
	}
	
	if (pages[counter] === undefined ){
		// document.getElementById("nxt").style.display="none";
		values[0].push(timeStamp.toLocaleString());
		pushAnswers();

		//clear the values array
		checkBoxArr = [];
		values = [[]];
		existingQuestions = [];
		document.getElementById("question").innerHTML= '<div id="thankYouText"><h2>Thank You!</h2></div>';
		window.setTimeout(clearAndReset, 3000);

		return;
	}

	counter++;
}

function clearAndReset(){
	counter = 0;
	document.getElementById("question").style.display="block";
	document.getElementById("question").innerHTML = '<div id="question"><h2>Take our Survey!</h2><div id="stButton" class="stButton" style="display: block" align="center"><a class="stButton"  target="_blank" onclick="start()">START</a></div></div>'				
}

//Creates a multiple choice question from assigned data and adds to the pages array
function createMultiQuestionHTML(p) {
	console.log(existingQuestions.length);
	var myChoice = 1;
	console.log("myChoice = 1");
	var inputtedQuestion = '';
	inputtedQuestion += '<div class="form-block2">';

	//Assigning the title/question name
	inputtedQuestion += '<h4 id="blank">';
	inputtedQuestion += existingQuestions[p].question;
	inputtedQuestion += '</h4>';
	
	inputtedQuestion += '<br><br>';
	inputtedQuestion += '<div id="multi" style="text-align: center; position: center; justify-content: center; float:center">';
	//Looping through and assigning the options
	for (let i =0; i < existingQuestions[p].choices.length; i++) {
		inputtedQuestion += '<label style="text-align: center; position: center; justify-content: center; float:center" for="myChoices">' + 
								existingQuestions[p].choices[i] + 
								'<br />' +
  								'<input type="radio" id="'+myChoice+'" name="myChoices" value="'+existingQuestions[p].choices[i]+'" />' +
							'</label>';

		myChoice ++;
	}
	if(existingQuestions.length == globali+1){
		inputtedQuestion += '<br><br><br><br>' 
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' ><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">SUMBIT SURVEY</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';
	}
	else{
		inputtedQuestion += '<br><br><br><br>'
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' "><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">NEXT</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';	
	}

	
	radioButtons = document.getElementsByName("myChoices");

	

	pages.push(inputtedQuestion);

}

//Creates a checkbox question from assigned data and adds to the pages array
function createCheckboxQuestionHTML(p) {
	var myCheckerChoice=2;
	var inputtedQuestion = '';
	inputtedQuestion += '<div class="form-block2">';

	//Assigning the title/question name
	inputtedQuestion += '<h4 id="blank">';
	inputtedQuestion += existingQuestions[p].question;
	inputtedQuestion += '</h4>';
	inputtedQuestion += '<br><br><br>';
	inputtedQuestion += '<div style="text-align: center; position: center; justify-content: center; float:center">';
	//Looping through and assigning the options
	for (let i =0; i < existingQuestions[p].choices.length; i++) {
		inputtedQuestion += '<label style="text-align: center; position: center; justify-content: center; float:center" for="myCheckerChoices">' + 
								existingQuestions[p].choices[i] + 
								'<br />' +
  								'<input type="checkbox" id="'+myCheckerChoice+'" name="myCheckerChoices" value="'+existingQuestions[p].choices[i]+'" />' +
							'</label>';
		myCheckerChoice++;
	}

	if(existingQuestions.length == globali+1){
		inputtedQuestion += '<br><br><br><br>'
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' "><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">SUMBIT SURVEY</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';
	}
	else{
		inputtedQuestion += '<br><br><br><br>'
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' "><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">NEXT</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';	
	}

	checkerButtons = document.getElementsByName("myCheckerChoices");
	pages.push(inputtedQuestion);

}

function createTimeQuestionHTML(p){
	var inputtedQuestion = '';
	inputtedQuestion += '<div class="form-block2">';

	//Assigning the title/question name
	inputtedQuestion += '<h1 id="blank">';
	inputtedQuestion += existingQuestions[p].question;
	inputtedQuestion += '</h1>';

	inputtedQuestion += '<input type="time" id="appt" name="appt" min="9:00" max="18:00" required>';

	pages.push(inputtedQuestion);
}

function createRangeQuestionHTML(p){
	var inputtedQuestion = '';
	inputtedQuestion += '<div class="form-block2">';

	//Assigning the title/question name
	inputtedQuestion += '<h1 id="blank">';
	inputtedQuestion += existingQuestions[p].question;
	inputtedQuestion += '</h1>';

	inputtedQuestion += '<div>' +
  						'<input type="range" id="start" name="volume"'+
         				'min="0" max="11">'+ 
         				'</div>' +
         				'<label for="volume">Volume</label>';

	pages.push(inputtedQuestion);
}

function createTextBoxQuestionHTML(p){
	var inputtedQuestion = '';
	inputtedQuestion += '<div class="form-block2">';
	//questionPageIndicator = "text";
	//Assigning the title/question name
	inputtedQuestion += '<h4 id="blank">';
	inputtedQuestion += existingQuestions[p].question;
	inputtedQuestion += '</h4>';
	inputtedQuestion += '<br><br>';

	inputtedQuestion+=  '<form>';
	inputtedQuestion+= 	'<input action="/none" id="textField" type="text" placeholder="">'
	//inputtedQuestion+= 		'<button type="button" onclick="send()">SEND</button>';
	if(existingQuestions.length == globali+1){
		inputtedQuestion += '<br><br><br><br>'
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' "><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">SUBMIT SURVEY</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';
	}
	else{
		inputtedQuestion += '<br><br><br><br>'
		inputtedQuestion += '<div id="nxt" style="display: inline-block; color: '+styles[0][3]+'; border-color: '+ styles[0][3] + ' "><form><div class="stButton" align="center"><a target="_blank" onclick="cycle()">NEXT</a></div></form></div>';
		inputtedQuestion += '</div>';
		inputtedQuestion += '</div>';	
	}
	
	pages.push(inputtedQuestion);
}


function pushAnswers(){
	executeToExisting();
}

var noStyles = false;

function setStyles(){
		
	console.log("settingStylesdfsgresdgewsfds");
	console.log("styles[0][0] is" + styles[0][0]);
	document.getElementById("content").style.background = styles[0][1];
	document.getElementById("content").style.color = styles[0][3];
	document.getElementById("content").style.fontFamily = styles[0][2];
	

	if(styles[0][0] == ""){
		console.log("nothing in image box");
		document.getElementById("surveysOnTap").style.display = "none";
		document.getElementById("logo").style.display = "none";
		document.getElementById("top").style.display = "none";
	}

	if(styles[0][0] !== ""){


		console.log("something in image box");
		document.getElementById("surveysOnTap").style.display = "none";
		document.getElementById("logo").style.display = "none";

	
		imgElement = '<img src=' + styles[0][0] + ' alt=>';
	
		document.getElementById("top").innerHTML +=  imgElement;
		//head.appendChild(imgElement);
	}
}
