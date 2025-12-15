export async function analyzeResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
}
