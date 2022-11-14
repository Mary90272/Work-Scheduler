//wekday var
var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//header time
var headerTime =dayjs();
//work hour var
var nowHour =dayjs().format("H");
// localStorage massage class/var
var savedIntoLsSpan = $('.saved-into-ls');
//LocalStorage text
function savedIntoLsHandler() {
    if(!savedIntoLsSpan.hasClass('d-none')) return;

    savedIntoLsSpan.removeClass('d-none');
    setTimeout(function() {
        savedIntoLsSpan.addClass('d-none');
    }, 3000);
}
//header time
$("#currentDay").text(WEEKDAYS[headerTime.day()] + ' ' + headerTime.format('MMMM D  YYYY'));

//Standart working hour
var lengthHour =9;
// loop for whole section  
for (var i = 0; i < lengthHour; i++ ){
    var columnEvent = $("<div>");
    columnEvent.addClass("row  time-block");
        
    var hour = $("<div>")
    hour.addClass("hour col-1");
    hour.text((i+lengthHour) + ":00")
    //AM/PM formate
    hour.text(dayjs().hour(i +lengthHour).format('ha'));
    
    var userText = $("<textarea>");
    userText.addClass("textarea col-9 description");

    var saveBtn = $("<button>");
    saveBtn.addClass("saveBtn col-1");

    var iconSave =$("<i>");
    iconSave.addClass("fas fa-save");
//added btn and icon delete
    var deleteBtn = $("<button>");
    deleteBtn.addClass("deleteBtn col-1");
        
    var iconDelete = $("<i>");
    iconDelete.addClass("fas fa-trash");


    saveBtn.append(iconSave);
    deleteBtn.append(iconDelete)
    columnEvent.append(hour);
    columnEvent.append(userText);
    columnEvent.append(saveBtn);
    columnEvent.append(deleteBtn)
    //added whole section to html div container-fluid
    $(".container-fluid").append(columnEvent);
}

var hour = $(".hour");
var saveBtn = $(".saveBtn");
var columnEvent=$(".time-block")
var deleteBtn = $(".deleteBtn")
var userText = $(".textarea")

var hourStart =dayjs().hour(9);
    
//looping each hour if statement used for addClass past,present,future
for (var i = 0; i < hour.length; i++ ) {
    
    var hourBlock = hourStart.add( i,"hour")
    var hourText = hourBlock.format("H")
    // console.log("---------------")
    // console.log(hourText)
    //console.log(nowHour)
    //console.log(hourText)
    //console.log(hourStart)
    if (Number(hourText) < Number(nowHour)) {
            $(columnEvent[i]).addClass("past")
    } 
    else if (Number(hourText) == Number(nowHour)) {
            $(columnEvent[i]).addClass("present")
    }      
         else { 
            $(columnEvent[i]).addClass("future")
    }
}

//user textarea
var userText = $(".textarea")
    


// user text from local storage 
function saveInfo(n){
    $(saveBtn[n]).on("click", function(e){
        e.preventDefault();
            
        //user text to the local storage
        var message =$(userText[n]).val();
        if( message!== "" ) {
        localStorage.setItem("Do-" + (n+hour.length) +":00", message);
        savedIntoLsHandler();
    } 
})};

//delete user text from local storage 
function deleteInfo (n){
    $(deleteBtn[n]).on("click", function(event){
        event.preventDefault();
        localStorage.removeItem("Do-" + (n+hour.length) +":00");
        $(userText[n]).val(""); 
        savedIntoLsSpan.text('Deleted from local storage');
        savedIntoLsHandler();
    })
};

for (var i= 0;i<hour.length;i++){
    var userInput =localStorage.getItem("Do-" + (i+hour.length)+":00");
    $(userText[i]).text(userInput); 
    if(!userInput && $(userText[i]).closest('.row').hasClass('present')) {
        $(userText[i]).text('Current Time'); 
    }
    saveInfo(i);
    deleteInfo(i);
}




 

