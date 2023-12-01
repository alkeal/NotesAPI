const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const { send } = require('process');
const { nanoid } = require('nanoid');
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();
import middy from '@middy/core'

exports.handler = async (event, contect ) => {


   const notes = JSON.parse(event.body);

   const timestamp = new Date().getTime();

   //notes.id = `${timestamp}`;

   const MaxTitleLength = 50;
   const MaxTextLength = 300;
   
   if (notes.title.length > MaxTitleLength) {
     return `Title is too long. It should be ${MaxTitleLength} characters or less.`;
   }
   
   if (notes.text.length > MaxTextLength) {
     return `Text is too long. It should be ${MaxTextLength} characters or less.`;
   }



   try {
   await db.put({


     TableName: 'notes-db',
     Item: {
      
      username: notes.username,
      id: nanoid(),
      title: notes.title,
      text: notes.text,
      createdAt: new Date().getTime(),
      modifiedAt: new Date().getTime()
     }
     


   }).promise()
    

  
   
   return sendResponse(200, { success: true });
   
   
} catch (error) {
    return sendResponse(500, { success: false});

}
   
};

const handler = middy(handler).use(validateToken);

module.exports = { handler };