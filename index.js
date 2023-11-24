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








exports.handler = async (event, context) => {


    const { method, path } = event.requestContext.http;

    if (method === 'GET' && path === '/notes'){

      return {
        statusCode: 200,
        headers: {
            "Content-Type":"application/json",

        },
        body : JSON.stringify({notes})
      };



    }
    else if (method === 'POST' && path === '/notes'){
        const body = JSON.parse(event.body);

        notes.push(body);

        return {
            
                statusCode: 200,
                headers: {
                    "Content-Type":"application/json",
        
                },
                body : JSON.stringify({success : true})
              
        
        }
    }
   

      return 'Hej';
   
   }