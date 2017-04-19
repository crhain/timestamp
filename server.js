const express = require('express');
const port = +process.argv[2] || 8080;
const app = express();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log('Starting server on port: ' + port);

app.get('/:time', (request, response) => {
    var timeString = request.params.time;
    var timeObject = {unix: null, natural: null };    
    var isUnixTime = (timeString) => { 
        let is = new RegExp('[0-9]{' + timeString.length + '}'); 
        if(timeString.search(is) === -1){
            return false;
        }

        if(isNaN(new Date(+timeString))){
            return false;
        }

        return true;

    };
    var isNaturalTime = (timeString) => {
        if(isNaN(Date.parse(timeString))){
            return false;
        }        
        return true;
    };
    var convertToNaturalTime = (timeString) => {
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
    };
    var convertToUnixTime = (timeString) => {
        let unixTime;
        if(typeof timeString === "number"){
          unixTime = "" + timeString;  
        } 
        else{
            unixTime = Date.parse(timeString);
        }

        return unixTime;
    };
    //need to test using regular expressions to see if time is in one of two formats:
    //1. #####
    if(isUnixTime(timeString)){
        //return null string if unix time is too long                            
        timeObject.unix = timeString;
        timeObject.natural = convertToNaturalTime(+timeString);
    } else if(isNaturalTime(timeString)){
        timeObject.natural = convertToNaturalTime(timeString);                
        timeObject.unix = convertToUnixTime(timeString);        
    }
        
    //convert unix format to regular date
    response.end(JSON.stringify(timeObject));
    
});

app.listen(port);
