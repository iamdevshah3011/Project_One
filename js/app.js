document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURATION ===
    const CONFIG = {
        powerWords: ['orchestrated', 'spearheaded', 'engineered', 'optimized', 'accelerated', 'developed', 'led', 'managed'],
        industryKeywords: ['Python', 'JavaScript', 'React', 'AWS', 'Project Management', 'Agile', 'scrum', 'revenue', 'growth', 'ROI'],
        cliches: ['hard worker', 'team player', 'synergy', 'go-getter', 'motivated', 'passionate']
    };

    // === DOM ELEMENTS ===
    const uploadStage = document.getElementById('upload-stage');
    const loadingStage = document.getElementById('loading-stage');
    const resultsStage = document.getElementById('results-stage');
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('manual-text');
    const progressBar = document.getElementById('ai-progress');
    const fileInput = document.getElementById('resume-upload');

    // === STATE MANAGEMENT ===
    let analysisState = {
        text: '',
        score: 0,
        missingKeywords: [],
        foundPowerWords: 0,
        foundCliches: 0
    };

    // === EVENT LISTENERS ===
    
    // Tab Switching Logic
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            // Logic to toggle inputs would go here in full version
        });
    });

    // File Upload Simulation
    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            textInput.value = `[File: ${e.target.files[0].name}] loaded... Simulating extraction... \n\nExperienced Software Engineer with 5 years in full-stack development. Led a team of 4 developers to build a scalable SaaS product. Hard worker and team player looking for new opportunities. Skilled in React and Node.js.`;
        }
    });

    // Main Analyze Trigger
    analyzeBtn.addEventListener('click', () => {
        const input = textInput.value;
        if (!input && !fileInput.files.length) {
            alert("Please upload a resume or paste text first.");
            return;
        }
        
        // Start the "AI" Process
        startSimulation(input || "Default test text for demo purposes.");
    });

    // === CORE LOGIC ===

    function startSimulation(text) {
        // 1. UI Transition
        uploadStage.classList.add('hidden');
        loadingStage.classList.remove('hidden');

        // 2. Simulate Steps (Timing)
        const steps = [
            { id: 'step-1', delay: 800 },
            { id: 'step-2', delay: 1800 },
            { id: 'step-3', delay: 2800 }
        ];

        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(interval);
        }, 30);

        // Highlight steps visually
        steps.forEach(step => {
            setTimeout(() => {
                document.getElementById(step.id).style.color = 'var(--primary)';
                document.getElementById(step.id).style.fontWeight = 'bold';
            }, step.delay);
        });

        // 3. Perform "Analysis" (The Magic)
        setTimeout(() => {
            performAnalysis(text);
            loadingStage.classList.add('hidden');
            resultsStage.classList.remove('hidden');
            animateResults();
        }, 3500);
    }

    function performAnalysis(text) {
        // Normalize text
        const lowerText = text.toLowerCase();
        
        // Count Metrics
        const wordCount = text.split(' ').length;
        
        // Check Power Words
        let powerCount = 0;
        CONFIG.powerWords.forEach(word => {
            if (lowerText.includes(word)) powerCount++;
        });

        // Check Cliches
        let clicheCount = 0;
        CONFIG.cliches.forEach(phrase => {
            if (lowerText.includes(phrase)) clicheCount++;
        });

        // Find Missing Keywords (Randomized selection from list for demo)
        const missing = CONFIG.industryKeywords.filter(() => Math.random() > 0.5).slice(0, 5);

        // Calculate Score (Algorithm)
        let baseScore = 60;
        baseScore += (powerCount * 5);
        baseScore -= (clicheCount * 4);
        baseScore += (wordCount > 50 ? 10 : 0);
        
        // Cap Score
        if (baseScore > 98) baseScore = 98;
        if (baseScore < 20) baseScore = 20;

        // Update State
        analysisState = {
            score: baseScore,
            missingKeywords: missing,
            foundPowerWords: powerCount,
            foundCliches: clicheCount,
            wordCount: wordCount
        };
    }

    function animateResults() {
        // 1. Animate Score Number
        const scoreEl = document.getElementById('final-score');
        const circle = document.getElementById('final-score-circle');
        let current = 0;
        
        const timer = setInterval(() => {
            current++;
            scoreEl.innerText = current;
            circle.style.setProperty('--percent', current); // CSS variable update
            
            if (current >= analysisState.score) clearInterval(timer);
        }, 20);

        // 2. Populate Stats
        document.getElementById('word-count').innerText = analysisState.wordCount;
        document.getElementById('impact-verbs').innerText = analysisState.foundPowerWords;
        document.getElementById('cliches-found').innerText = analysisState.foundCliches;

        // 3. Populate Missing Keywords
        const cloud = document.getElementById('missing-keywords');
        cloud.innerHTML = '';
        analysisState.missingKeywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerText = `+ ${kw}`;
            cloud.appendChild(span);
        });

        // 4. Typewriter Effect for Rewrite
        const rewriteEl = document.getElementById('ai-rewrite-text');
        const rewriteText = "Spearheaded the development of a scalable SaaS architecture, increasing system efficiency by 40%. Orchestrated cross-functional teams to deliver project milestones 2 weeks ahead of schedule.";
        let charIndex = 0;
        
        rewriteEl.innerHTML = ''; // Clear previous
        
        function typeWriter() {
            if (charIndex < rewriteText.length) {
                rewriteEl.innerHTML += rewriteText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            }
        }
        typeWriter();
    }
});
