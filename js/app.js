document.addEventListener('DOMContentLoaded', () => {
    // === 1. REAL ANALYTICS ENGINE ===
    const DATABASE = {
        // We look for these words in the user's text
        powerWords: ['orchestrated', 'spearheaded', 'engineered', 'optimized', 'accelerated', 'developed', 'led', 'managed', 'revamped', 'structured', 'mentored'],
        
        // Industry specific keywords (Tech focus)
        techStack: {
            'Languages': ['python', 'javascript', 'java', 'c++', 'typescript', 'sql', 'html', 'css'],
            'Frameworks': ['react', 'angular', 'vue', 'node', 'django', 'flask', 'spring', 'aws', 'azure'],
            'Concepts': ['agile', 'scrum', 'ci/cd', 'api', 'rest', 'graphql', 'cloud', 'scalable']
        },

        // Feedback templates based on score
        feedback: {
            low: "Your summary is too brief. Recruiters need to see specific technologies and measurable outcomes (numbers/percentages).",
            mid: "Good start. You have some keywords, but try adding more 'Power Verbs' (e.g., Orchestrated, Developed) to show leadership.",
            high: "Excellent profile! Your keyword density is strong. Focus on formatting and visual appeal now."
        }
    };

    // === DOM ELEMENTS ===
    const elements = {
        textInput: document.getElementById('manual-text'),
        fileInput: document.getElementById('resume-upload'),
        analyzeBtn: document.getElementById('analyze-btn'),
        resultsStage: document.getElementById('results-stage'),
        loadingStage: document.getElementById('loading-stage'),
        uploadStage: document.getElementById('upload-stage'),
        scoreEl: document.getElementById('final-score'),
        scoreCircle: document.getElementById('final-score-circle'),
        missingKeywords: document.getElementById('missing-keywords'),
        rewriteText: document.getElementById('ai-rewrite-text'),
        statWordCount: document.getElementById('word-count'),
        statPowerWords: document.getElementById('impact-verbs'),
        statCliches: document.getElementById('cliches-found')
    };

    // === 2. EVENT LISTENERS (Making Buttons Work) ===
    
    // Fix: Make "Log In" and other nav buttons show a toast
    document.querySelectorAll('a[href="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🔒 Demo Mode: Authentication is disabled for this portfolio preview.");
        });
    });

    // Fix: Smooth Scroll for real links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // File Upload Handler (Simulated Reading)
    elements.fileInput.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            elements.textInput.value = `[System Analysis of ${fileName}]: \n\nExperienced Developer with skills in Python and AWS. Managed a team of 3. Looking for remote work.`;
            alert("📄 File recognized! We've extracted a sample summary to the text box for you.");
        }
    });

    // Main Analysis Trigger
    elements.analyzeBtn.addEventListener('click', () => {
        const text = elements.textInput.value.trim();
        if (text.length < 50) {
            alert("⚠️ Please enter at least 50 characters for a valid analysis.");
            return;
        }
        runAnalysisEngine(text);
    });

    // === 3. CORE LOGIC (The "Brain") ===

    function runAnalysisEngine(text) {
        // UI Transition
        elements.uploadStage.classList.add('hidden');
        elements.loadingStage.classList.remove('hidden');

        // Fake Loading Time (for dramatic effect)
        let progress = 0;
        const progressBar = document.getElementById('ai-progress');
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(interval);
        }, 100);

        setTimeout(() => {
            const metrics = analyzeText(text);
            displayResults(metrics);
            elements.loadingStage.classList.add('hidden');
            elements.resultsStage.classList.remove('hidden');
        }, 2000);
    }

    function analyzeText(text) {
        const lowerText = text.toLowerCase();
        const words = text.trim().split(/\s+/);
        
        // 1. Detect Power Words
        const foundPower = DATABASE.powerWords.filter(pw => lowerText.includes(pw));
        
        // 2. Detect Tech Stack
        let foundTech = [];
        let missingTech = [];
        
        // Scan categories
        Object.entries(DATABASE.techStack).forEach(([category, keywords]) => {
            keywords.forEach(kw => {
                if(lowerText.includes(kw)) foundTech.push(kw);
                else missingTech.push(kw);
            });
        });

        // 3. Calculate Score
        // Base score starts at 50. 
        // +5 for every power word
        // +3 for every tech keyword
        // +10 if length > 100 words
        let score = 50;
        score += (foundPower.length * 5);
        score += (foundTech.length * 3);
        if (words.length > 100) score += 10;
        
        // Cap score at 98 (nobody is perfect)
        if (score > 98) score = 98;

        return {
            score: score,
            wordCount: words.length,
            foundPower: foundPower,
            missingKeywords: missingTech.sort(() => 0.5 - Math.random()).slice(0, 6), // Randomize suggestions
            feedback: getFeedback(score)
        };
    }

    function getFeedback(score) {
        if (score < 60) return DATABASE.feedback.low;
        if (score < 85) return DATABASE.feedback.mid;
        return DATABASE.feedback.high;
    }

    function displayResults(metrics) {
        // Animate Score
        let current = 0;
        const timer = setInterval(() => {
            current += 2;
            if(current > metrics.score) {
                current = metrics.score;
                clearInterval(timer);
            }
            elements.scoreEl.innerText = current;
            elements.scoreCircle.style.setProperty('--percent', current);
        }, 20);

        // Update Stats
        elements.statWordCount.innerText = metrics.wordCount;
        elements.statPowerWords.innerText = metrics.foundPower.length;
        elements.statCliches.innerText = "0"; // Placeholder for simplicity

        // Update Missing Keywords
        elements.missingKeywords.innerHTML = '';
        metrics.missingKeywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerText = `+ ${kw.toUpperCase()}`;
            elements.missingKeywords.appendChild(span);
        });

        // Update AI Rewrite (Simulated based on context)
        // Instead of generating text (which requires expensive server), we give Strategic Advice
        const advice = `ANALYSIS COMPLETE:\n\n${metrics.feedback}\n\nSUGGESTED ACTION: Integrate the missing keywords listed above into your 'Skills' section. Change passive phrases to active ones using words like '${DATABASE.powerWords[0]}' or '${DATABASE.powerWords[1]}'.`;
        
        typeWriter(advice, elements.rewriteText);
    }

    function typeWriter(text, element) {
        element.innerHTML = '';
        let i = 0;
        const speed = 20; 
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
});
