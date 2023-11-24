const { sendResponse } = require ('../../responses/index');


var notes = [

    {
     
      note: "dncwwwiefnciefneinc"
  
  
    },
  
    {
     
      note: "dnciefnciefneinc"
  
  
    },
    {
     
      note: "dnciefnciefccrccrneinc"
  
  
    }
  
  ]; 
  





exports.handler = async (event, contect ) => {





 return sendResponse(200, {notes});






}