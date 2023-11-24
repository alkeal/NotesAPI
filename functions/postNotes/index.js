const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event, contect ) => {


   const notes = JSON.parse(event.body);


   await db.put({


     TableName: 'notes-db',
     Item: notes



   }).promise()
    

  
   
   return sendResponse(200, { success: true });
   
   
   
   
   }