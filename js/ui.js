// /elevate-ai-project/js/ui.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resumeForm');
  const loader = document.getElementById('loader');
  const modal = document.getElementById('resultModal');
  const closeBtn = document.querySelector('.close-button');
  const scoreBar = document.getElementById('scoreBar');
  const scoreValue = document.getElementById('scoreValue');
  const keywordsList = document.getElementById('keywordsList');

  // Open modal with results
  function showModal(data) {
    scoreValue.textContent = data.score;
    scoreBar.value = data.score;
    // Populate keywords list
    keywordsList.innerHTML = '';
    data.keywords.forEach(kw => {
      const li = document.createElement('li');
      li.textContent = kw;
      keywordsList.appendChild(li);
    });
    modal.classList.remove('hidden');
  }

  // Close modal handler
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Form submit handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loader.classList.remove('hidden');
    const fileInput = document.getElementById('resumeFile');
    const textInput = document.getElementById('resumeText');

    // Call backend AI engine
    try {
      const result = await analyzeResume(fileInput.files[0], textInput.value);
      loader.classList.add('hidden');
      showModal(result);
    } catch (err) {
      loader.classList.add('hidden');
      alert('Error analyzing resume: ' + err.message);
    }
  });
});
