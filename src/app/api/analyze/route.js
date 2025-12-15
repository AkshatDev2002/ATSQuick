import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumePrompt } from "@/utils/prompts";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.GCP_GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    // Convert PDF to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Pdf = buffer.toString("base64");

    // Initialize Gemini with API key
    const genAI = new GoogleGenerativeAI(process.env.GCP_GEMINI_API_KEY);
    
    // Use gemini-1.5-pro instead (more reliable for document analysis)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      resumePrompt(),
    ]);

    const response = await result.response;
    const raw = response.text();

    let parsed;
    try {
      // Remove markdown code blocks if present
      const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      // Try to extract JSON from the response
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error("Gemini returned non-JSON output:", raw);
        throw new Error("Failed to parse Gemini response");
      }
      parsed = JSON.parse(match[0]);
    }

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    // Handle specific Gemini API errors
    let errorMessage = "Resume analysis failed";
    let statusCode = 500;

    if (error.message?.includes("API key") || error.status === 400) {
      errorMessage = "Invalid API key. Please check your Gemini API key.";
      statusCode = 401;
    } else if (error.status === 404 || error.message?.includes("not found")) {
      errorMessage = "Model not available. Trying alternative...";
      statusCode = 503;
    } else if (error.message?.includes("quota") || error.status === 429) {
      errorMessage = "API quota exceeded. Please try again later.";
      statusCode = 429;
    } else if (error.status === 403) {
      errorMessage = "API key doesn't have permission. Enable the Generative Language API.";
      statusCode = 403;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: statusCode }
    );
  }
}