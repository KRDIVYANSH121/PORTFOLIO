"use server";

import { docClient, hasKeys } from "@/lib/aws";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "PortfolioState";
const STATE_ID = "main";

export async function getPortfolioStateAction() {
  if (!hasKeys || !docClient) {
    return { success: false, message: "AWS keys missing" };
  }

  try {
    const response = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: STATE_ID },
      })
    );

    if (response.Item) {
      return { success: true, data: response.Item.state };
    } else {
      return { success: false, message: "No state found" };
    }
  } catch (error: any) {
    console.error("AWS Get Error:", error);
    return { success: false, message: error.message };
  }
}

export async function updatePortfolioStateAction(stateData: any) {
  if (!hasKeys || !docClient) {
    return { success: false, message: "AWS keys missing" };
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id: STATE_ID,
          state: stateData,
          updatedAt: new Date().toISOString()
        },
      })
    );
    return { success: true };
  } catch (error: any) {
    console.error("AWS Put Error:", error);
    return { success: false, message: error.message };
  }
}
