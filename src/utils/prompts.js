export const resumePrompt = () => `
You are an ATS resume analysis AI.

Analyze the attached resume PDF and return ONLY valid JSON.

{
  "score": number (0-100),
  "skills": { "React": number, "JavaScript": number },
  "jobMatches": [string],
  "suggestions": [string]
}
`;
