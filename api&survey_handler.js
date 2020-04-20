const Auth = async ()=> {
      console.log(await assignId())
      console.log("done");
      // loadClient();
      authenticate();
    }

function assignId(){
  //inputtedspreadSheetId = document.getElementById("inputId").value;
  console.log("ID Asssinged");

}

function loadClient() {
    gapi.client.setApiKey("API KEY HERE");
    gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
    //return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest")
    .then(function() { console.log("GAPI client loaded for API");},
          function(err) { console.error("Error loading GAPI client for API", err); });
}


function authenticate() {
  console.log("authenticate");
  return gapi.auth2.getAuthInstance().signIn({scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.metadata.readonly"})
      .then(function() { console.log("Sign-in successful");
                          //document.getElementById("stButton").style.display="block";
                          document.getElementById('footer').style.display="none";
                          document.getElementById("authenticate").style.display="none";
                          document.getElementById("altHeading").style.display = "none";
                          document.getElementById("loadingtext").style.display = "block";
                          document.getElementById("alttexty").style.display = "none";
                         
                          //readStyles();
                          findFolder();
                        
                        },
            function(err) { console.error("Error signing in", err); });
}

//call after client is loaded/signed in
  function createSheet(){
    return gapi.client.sheets.spreadsheets.create({
      "resource": {
        "properties": {
          "title": "NEW Field Survey2"
        }
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                console.log(response.result.spreadsheetId);
                currentspreadSheetId = response.result.spreadsheetId;
                currentURL = response.result.spreadsheetURL;

              },
              function(err) { console.error("Execute error", err); });
  }


function readQuestions() {
    return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": inputtedspreadSheetId,
      "range": "Questions!A2:C",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "DIMENSION_UNSPECIFIED",
      "valueRenderOption": "FORMATTED_VALUE"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var range = response.result;
                if(range.values.length > 0){
                  for (i=0; i<range.values.length; i++){
                    var row = range.values[i];

                      if(range.values[i][2] == undefined){
                        
                        var object={question: range.values[i][0], type: range.values[i][1]};
                        existingQuestions.push(object);

                      }else{

                        console.log(range.values[i[2]]);
                        var object={question: range.values[i][0], type: range.values[i][1], choices: (range.values[i][2]).split(", ")};
                        existingQuestions.push(object);

                      }
                    }
                  }
                
                console.log("Response", response);
                a=1;
              },
              function(err) { console.error("Execute error", err); });
        
}

function readStyles(){
  console.log("readingstyles");
  return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": inputtedspreadSheetId,
      "range": "Styles!A2:D",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "DIMENSION_UNSPECIFIED",
      "valueRenderOption": "FORMATTED_VALUE"
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
             var range = response.result;
             console.log(styles[0]);
             console.log(response);
             if(response.result.values == undefined){
              console.log("no results");
              document.getElementById("top").style.display = "none";
               styles[0] = [];
               styles[0][0] = "";
               styles[0][1] = "White";
               styles[0][2] = "Arial";
               styles[0][3] = "black";
               noStyles = true;
              console.log(styles);
              firstStart = true;
              setStyles();
              console.log(firstStart);
              start();
             }else{
             console.log("else");
             styles[0] = response.result.values[0];
             console.log(styles);
             firstStart = true;
             setStyles();
             console.log(firstStart);
             start();
           }
        },
        function(err) {
             document.getElementById("top").style.display = "none";
             styles[0] = [];
             styles[0][0] = "";
             styles[0][1] = "White";
             styles[0][2] = "Arial";
             styles[0][3] = "black";
             noStyles = true;
             console.log(styles);
             firstStart = true;
             setStyles();
             console.log(firstStart);
             start();
        console.error("Execute error", err); });
}

  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    console.log(currentspreadSheetId);
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": currentspreadSheetId,
      "range": "Sheet1!A1",
      "includeValuesInResponse": true,
      "insertDataOption": "OVERWRITE",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "RAW",
      "resource": {
        "values": values,
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

  function executeToExisting(){
    console.log(inputtedspreadSheetId);
    return gapi.client.sheets.spreadsheets.values.append({
      "spreadsheetId": inputtedspreadSheetId,
      "range": "Results!A2",
      "includeValuesInResponse": true,
      "insertDataOption": "OVERWRITE",
      "responseDateTimeRenderOption": "FORMATTED_STRING",
      "responseValueRenderOption": "FORMATTED_VALUE",
      "valueInputOption": "RAW",
      "resource": {
      "values": values,
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "CLIENT ID HERE"});
  });


var folderId = "";

function findFolder() {
    return gapi.client.drive.files.list({
         // q: "name='Survey On Tap'",
         // fields: 'nextPageToken, files(id, name)',
         // spaces: 'drive',
         // pageToken: pageToken
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                var files = response.result.items;
                console.log(files);
                
                for (i=0; i<files.length; i++){
                  if(files[i].title === "Survey On Tap"){
                    console.log(files[i].id);
                    folderId = files[i].id;
                    
                  };
                };
                getFilesinFolder();



              },
              function(err) { console.error("Execute error", err); });

  }




var counterForGet=0;
var children;
var loopingId;

function getFilesinFolder(){
  return gapi.client.drive.children.list({
      "folderId": folderId
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                //console.log("Response", response);
                children = response.result.items;

                //counterForGet = children.length;
                getName();

        
              },
              function(err) { 
                console.error("Execute error", err);
                document.getElementById("loadingtext").innerHTML = '<div id = "loadingtext"><p>We could not find a folder named "Survey on Tap" within your Google Drive. See the documentation <a href="https://docs.google.com/document/d/1VmGvnwDJJqyBaF4oZvDk-zh34cCgzzuVLmEPE1yfehk/edit?usp=sharing" target="_blank">HERE</a> for help<p></div>';

                existingSurveyText += '<div id="restart" class="button_cont" align="center"><a class="example_e" onclick ="location.reload()"><span>'+ '<i class="material-icons">keyboard_backspace</i>' + '</a></span></div><br/>';
                document.getElementById("question").innerHTML = existingSurveyText;
               });
}

existingSurveys =[];

var emptyFolder = false;

function getName(){
  console.log("getName");
  if(children.length == 0){
    console.log("Length 0, looping through");
    emptyFolder = true;
    existingSurveys.length =0;
    displaySheets();
  }else{
    loopingId = children[counterForGet].id;
    return gapi.client.sheets.spreadsheets.get({
      "spreadsheetId": loopingId
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                existingSurveys.push({
                  name: response.result.properties.title,
                  id: response.result.spreadsheetId,
                  url: response.result.spreadsheetUrl,
                });
                counterForGet++;
                if (counterForGet != children.length){
                  console.log("working");
                  getName();
                }
                if(counterForGet == children.length){
                  console.log("go");
                  displaySheets();
                }
                
              },
              function(err) { console.error("Execute error", err); });

  }

  
}

var existingSurveyText = " ";

function displaySheets(){
    if (emptyFolder == true){
    console.log("folder is empty");
    existingSurveys.length =0;
    document.getElementById("loadingtext").innerHTML = '<div id = "loadingtext"><p>No Surveys Found! Click <a href="https://docs.google.com/document/d/1VmGvnwDJJqyBaF4oZvDk-zh34cCgzzuVLmEPE1yfehk/edit?usp=sharing" target="_blank">HERE</a> to view the documentation and create a survey<p></div>';

    existingSurveyText += '<div id="restart" class="button_cont" align="center"><a class="example_e" onclick ="location.reload()"><span>'+ '<i class="material-icons">keyboard_backspace</i>' + '</a></span></div><br/>';
    //document.getElementById("start-over").innerHTML = existingSurveyText;
    }
    else if(existingSurveys.length == 1){
          console.log("folder has one item");
          document.getElementById("loadingtext").innerHTML = '<div id = "loadingtext"><p>'+ existingSurveys.length + ' Survey Found<p></div>'


      

          console.log("displaySheets is running for length 1");
          console.log(existingSurveys);
          console.log(existingSurveys.length);

          for(var i = 0; i < existingSurveys.length; i++){
          // console.log("Why wont you log???");

          existingSurveyText += '<h3 id="blank">';
          existingSurveyText += existingSurveys[i].name;
      
          existingSurveyText += '</h3>';

          existingSurveyText += '<div id="editButtons" class="button_cont" align="center"><a class="example_e"  target="_blank" href='+existingSurveys[i].url+' target="_blank" rel="nofollow"><span>'+ '<i class="material-icons">edit</i>' + '</a></span></div>'; 
          existingSurveyText += '<div id="editButtons" data-spreadsheetId= ' + existingSurveys[i].id + ' data-buttonCount = '+ "i" + 'class="button_cont" style="padding-left: 0.5em" align="center"><a class="example_e" onclick="preStart(\'' + existingSurveys[i].id + '\')"><span>'+ '<i class="material-icons">play_arrow</i>' + '</a></span></div><br/>';

          }

          existingSurveyText += '<div id="restart" class="button_cont" align="center"><a class="example_e" onclick ="location.reload()"><span>'+ '<i class="material-icons">keyboard_backspace</i>' + '</a></span></div><br/>';
          //document.getElementById("start-over").innerHTML = existingSurveyText;

    }else{
        console.log("folder has more than one item");
        document.getElementById("loadingtext").innerHTML = '<div id = "loadingtext"><p>'+ existingSurveys.length + ' Surveys Found<p></div>'

        // existingSurveyText += '<div id="restart" class="button_cont" align="center"><a class="example_e" href="https://d65ogzdvy0u47.cloudfront.net/onsite-surveys/ver_007/index.html" rel="nofollow"><span>Start Over</a></div><br/>';
        //document.getElementById("start-over").innerHTML = existingSurveyText;

        console.log("displaySheets is running for more than 1");
        console.log(existingSurveys);
        console.log(existingSurveys.length);
        //console.log(existingSurveys[0].name);

        for(var i = 0; i < existingSurveys.length; i++){
        // console.log("Why wont you log???");

        existingSurveyText += '<h3 id="blank">';
        existingSurveyText += existingSurveys[i].name;
      
        existingSurveyText += '</h3>';

        existingSurveyText += '<div id="editButtons" class="button_cont" align="center"><a class="example_e"  target="_blank" href='+existingSurveys[i].url+' target="_blank" rel="nofollow"><span>'+ '<i class="material-icons">edit</i>' + '</a></span></div>'; 
        existingSurveyText += '<div id="editButtons" data-spreadsheetId= ' + existingSurveys[i].id + ' data-buttonCount = '+ "i" + 'class="button_cont" style="padding-left: 0.5em" align="center"><a class="example_e" onclick="preStart(\'' + existingSurveys[i].id + '\')"><span>'+ '<i class="material-icons">play_arrow</i>' + '</a></span></div><br/>';
         

       }
       existingSurveyText += '<div id="restart" class="button_cont" align="center"><a class="example_e"onclick ="location.reload()"><span>'+ '<i class="material-icons">keyboard_backspace</i>' + '</a></span></div><br/>';
    }

     document.getElementById("question").innerHTML = existingSurveyText;
}


var stylesSet = false;

function preStart(id){
  console.log("about to check firstStart");
  
  inputtedspreadSheetId = id;
  console.log(id);
  console.log(inputtedspreadSheetId);
  readStyles();
  document.getElementById("loadingtext").style.display = "none";
  
}