const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const { send } = require('process');
const db = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event, contect ) => {


   const notes = JSON.parse(event.body);

   const timestamp = new Date().getTime();

   notes.id = '${timestamp}';





   try {
   await db.put({


     TableName: 'notes-db',
     Item: notes



   }).promise()
    

  
   
   return sendResponse(200, { success: true });
   
   
} catch (error) {
    return sendResponse(500, { success: false});

}
   
}