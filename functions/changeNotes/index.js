const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require('../../responses');




const changeNotes = async (event, context) => {
    if (event?.error && event?.error === "401") {
      return sendResponse(401, { success: false, message: "Invalid token" });
    }
  
    const requestBody = JSON.parse(event.body);
    const { id, title, text } = requestBody;
  

  
    const modifiedAt = new Date().toISOString();
  
    try {
      const updateResult = await db
        .update({
          TableName: "notes-db",
          Key: { id: id },
          ReturnValues: "ALL_NEW",
          UpdateExpression:
            "set #title = :title, #text = :text, #modifiedAt = :modifiedAt",
          ExpressionAttributeValues: {
            ":title": title,
            ":text": text,
            ":modifiedAt": modifiedAt,
          },
          ExpressionAttributeNames: {
            "#title": "title",
            "#text": "text",
            "#modifiedAt": "modifiedAt",
          },
        })
        .promise();
  
      return sendResponse(200, {
        success: true,
        updatedNote: updateResult.Attributes,
      });
    } catch (error) {
      return sendResponse(500, {
        success: false,
        message: "Could not update note",
      });
    }
  };
  
  const handler = middy(changeNotes).use(validateToken);
  
  module.exports = { handler };