import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GCP_GEMINI_API_KEY) {
  throw new Error("Missing GCP_GEMINI_API_KEY");
}

export const gemini = new GoogleGenerativeAI(
  process.env.GCP_GEMINI_API_KEY
);
