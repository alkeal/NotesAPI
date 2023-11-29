const { default: middy } = require('@middy/core');
const { sendResponse } = require ('../../responses/index');
const AWS = require('aws-sdk');
const { send } = require('process');
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();


  





exports.handler = async (event, contect ) => {


  const {Items} = await db.scan({

    TableName: 'notes-db',
     




  }).promise();


 return sendResponse(200, {success: true, notes : Items});






}


const handler = middy(getNotes)
  .use(validateToken)



module.exports = { handler };