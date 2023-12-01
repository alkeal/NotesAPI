const { sendResponse } = require ('../../responses/index');
const AWS = require('aws-sdk');
const { send } = require('process');
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();
const middy = require('@middy/core');
  





const getNotes = async (event, contect ) => {

 
  if (event?.error && event.error === '401') {

    return sendResponse(401, { success: false, message: 'Invalid token!'});


  }

  const username = event.username

  try{
  
  const result = await db.scan({

    TableName: 'notes-db',
    FilterExpression: '#username = :username',
    ExpressionAttributeNames: {
      '#username': 'username',
    },
    ExpressionAttributeValues: {
      ':username': username,
    },




  }).promise();


 return sendResponse(200, {success: true, notes : result.Items});
} catch (error) {
  console.log(error);
  return sendResponse(400,{
    success: false, message: 'Could not get notes',
  });
}






}



const handler = middy(getNotes)
  .use(validateToken)



module.exports = { handler };