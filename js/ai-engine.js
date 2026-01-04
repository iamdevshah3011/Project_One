// /elevate-ai-project/js/ai-engine.js
async function analyzeResume(file, text) {
  const url = 'http://localhost:3000/upload';  // Backend endpoint
  const formData = new FormData();
  if (file) {
    formData.append('resumeFile', file);
  }
  if (text && !file) {
    formData.append('resumeText', text);
  }
  
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}
