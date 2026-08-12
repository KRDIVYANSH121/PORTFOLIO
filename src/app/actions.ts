"use server";

import { kv } from "@vercel/kv";

const STATE_KEY = "portfolio_state_main";

export async function getPortfolioStateAction() {
  const hasKV = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
  if (!hasKV) {
    return { success: false, message: "Vercel KV keys missing" };
  }

  try {
    const data = await kv.get(STATE_KEY);
    if (data) {
      return { success: true, data };
    } else {
      return { success: false, message: "No state found in KV" };
    }
  } catch (error: any) {
    console.error("KV Get Error:", error);
    return { success: false, message: error.message };
  }
}

export async function updatePortfolioStateAction(stateData: any) {
  const hasKV = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
  if (!hasKV) {
    return { success: false, message: "Vercel KV keys missing" };
  }

  try {
    await kv.set(STATE_KEY, stateData);
    return { success: true };
  } catch (error: any) {
    console.error("KV Set Error:", error);
    return { success: false, message: error.message };
  }
}
