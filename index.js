const express = require('express');
const app = express();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.set('port', (process.env.PORT || 5000));

app.get('/:time', (request, response) => {
    var timeString = request.params.time;
    var timeObject = {unix: null, natural: null };    
    
    if(isUnixTime(timeString)){
        timeObject.unix = timeString;
        timeObject.natural = convertToNaturalTime(+timeString);
    } else if(isNaturalTime(timeString)){
        timeObject.natural = convertToNaturalTime(timeString);                
        timeObject.unix = convertToUnixTime(timeString);        
    }        
    response.end(JSON.stringify(timeObject));    
});


function isUnixTime(timeString){
  let is = new RegExp('[0-9]{' + timeString.length + '}'); 
    if(timeString.search(is) === -1){
        return false;
    }
    if(isNaN(new Date(+timeString))){
        return false;
    }
    return true;
}

function isNaturalTime(timeString){
    if(isNaN(Date.parse(timeString))){
        return false;
    }        
    return true;
}

function convertToUnixTime(timeString){
    let unixTime;
    if(typeof timeString === "number"){
        unixTime = "" + timeString;  
    } 
    else{
        unixTime = Date.parse(timeString);
    }
    return unixTime;
}

function convertToNaturalTime(timeString){
    let naturalTime = "";
    let time;
    if(typeof timeString === "number"){
        time = new Date(timeString);
    }
    else{
        time = new Date(Date.parse(timeString));
    }                
    naturalTime += months[time.getMonth()] + " ";
    naturalTime += time.getDate() + ", ";
    naturalTime += time.getFullYear(time);
    return naturalTime;
}

app.listen(app.get('port'), () => {
    console.log('Node is running on port:' + app.get('port'));
});