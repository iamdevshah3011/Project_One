// /elevate-ai-project/backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { analyzeText } = require('./logic');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Invalid file type. Only PDF is allowed.'), false);
    }
    cb(null, true);
  }
});

app.post('/upload', upload.single('resumeFile'), (req, res) => {
  let textData = '';
  if (req.file) {
    // Simulated extraction of PDF text
    textData = 'Sample resume content with JavaScript, Node.js, AWS, leadership, and Agile methodologies.';
  } else if (req.body.resumeText) {
    textData = req.body.resumeText;
  } else {
    return res.status(400).json({ error: 'No resume provided.' });
  }

  // Perform analysis (simulated)
  const result = analyzeText(textData);
  res.json({ success: true, keywords: result.keywords, score: result.score });
});

// Error handling middleware for Multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ElevateAI backend running on http://localhost:${PORT}`);
});
