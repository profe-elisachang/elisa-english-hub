// ==================== 
// LESSON DATABASE - 妳以後就在這新增課程
// ==================== 
const lessons = [
    {
        id: 'lesson-20260112',
        date: '2026-01-12',
        title: "The Bubble Palace",
        description: "Click to explore the futuristic house of Pierre Cardin.",
        filename: 'intermediate/bubble-palace.html' // 這裡要對齊妳電腦裡的路徑
    }
];

// ==================== 
// LESSON CONTENT STORAGE - 妳以後就在這貼內容
// ==================== 
const lessonContent = {
    'lesson-20260112': `
        <div class="lesson-detail">
            <h1>🏠 The Bubble Palace (Palais Bulles)</h1>
            
            <div class="card">
                <h2>💬 Useful Expressions</h2>
                <div style="margin: 15px 0;">
                    <span class="tag sage">all of a sudden</span>
                    <span class="tag olive">in a split second</span>
                    <span class="tag brown">hit the panic button</span>
                </div>
                <p><strong>all of a sudden</strong> - <em>de repente</em></p>
                <p><strong>hit the panic button</strong> - <em>entrar en pánico</em></p>
            </div>

            <div class="card">
                <h2>📖 Article: Architectural Wonders</h2>
                <p>Imagine a house with no straight lines. The <span class="vocab-highlight" data-translation="sobresaltante">startling</span> design of the Bubble Palace <span class="vocab-highlight" data-translation="golpea / afecta">strikes</span> everyone who sees it. It was built with an <span class="vocab-highlight" data-translation="involuntario">involuntary</span> feeling of organic flow.</p>
            </div>
        </div>
    `
};

// --- 以下是原本的功能代碼，請保留不要刪除 ---
document.addEventListener('DOMContentLoaded', function() {
    generateMonthNavigation();
    displayLatestLessons();
});

function displayLatestLessons() {
    const lessonCards = document.getElementById('lessonCards');
    const sortedLessons = [...lessons].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestLessons = sortedLessons.slice(0, 3);
    lessonCards.innerHTML = latestLessons.map(lesson => createLessonCard(lesson)).join('');
}

function createLessonCard(lesson) {
    const date = new Date(lesson.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `
        <article class="lesson-card" data-lesson="${lesson.id}">
            <div class="lesson-date">
                <span class="day">${dayName}</span>
                <span class="date">${monthDay}</span>
            </div>
            <div class="lesson-info">
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <button class="read-more-btn" onclick="loadLesson('${lesson.id}')">Read More →</button>
            </div>
        </article>`;
}

function generateMonthNavigation() {
    const monthNav = document.getElementById('monthNav');
    const lessonsByMonth = {};
    lessons.forEach(lesson => {
        const date = new Date(lesson.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!lessonsByMonth[monthKey]) {
            lessonsByMonth[monthKey] = { name: monthName, lessons: [] };
        }
        lessonsByMonth[monthKey].lessons.push(lesson);
    });
    const sortedMonths = Object.keys(lessonsByMonth).sort().reverse();
    monthNav.innerHTML = sortedMonths.map((monthKey, index) => {
        const month = lessonsByMonth[monthKey];
        const isFirst = index === 0;
        return `
            <div class="month-group">
                <button class="month-header ${isFirst ? 'active' : ''}" data-month="${monthKey}">
                    <span class="arrow">${isFirst ? '▼' : '▶'}</span> ${month.name}
                    <span class="lesson-count">${month.lessons.length}</span>
                </button>
                <ul class="lesson-list ${isFirst ? '' : 'hidden'}" data-month="${monthKey}">
                    ${month.lessons.map(lesson => {
                        const date = new Date(lesson.date);
                        const shortDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        return `<li><a href="#" onclick="loadLesson('${lesson.id}'); return false;">${shortDate} - ${lesson.title}</a></li>`;
                    }).join('')}
                </ul>
            </div>`;
    }).join('');
    document.querySelectorAll('.month-header').forEach(button => { button.addEventListener('click', toggleMonth); });
}

function toggleMonth(e) {
    const monthId = e.currentTarget.dataset.month;
    const lessonList = document.querySelector(`.lesson-list[data-month="${monthId}"]`);
    const arrow = e.currentTarget.querySelector('.arrow');
    lessonList.classList.toggle('hidden');
    arrow.textContent = lessonList.classList.contains('hidden') ? '▶' : '▼';
    e.currentTarget.classList.toggle('active');
}

async function loadLesson(lessonId) {
    // 1. 找到這堂課的資料
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || !lesson.filename) return;

    const mainContent = document.getElementById('mainContent');
    
    try {
        // 2. 去抓取妳放在資料夾裡的實體 HTML 檔案 (例如 intermediate/bubble-palace.html)
        const response = await fetch(lesson.filename);
        if (!response.ok) throw new Error('File not found');
        
        const htmlContent = await response.text();

        // 3. 把內容塞進妳要的容器裡
        mainContent.innerHTML = `
            <div class="lesson-content-wrapper">
                ${htmlContent}
            </div>
        `;

        // 4. 顯示回首頁按鈕
        document.getElementById('homeBtn').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Error loading lesson:', error);
        mainContent.innerHTML = `<p style="padding:20px;">抱歉，找不到教材檔案：${lesson.filename}</p>`;
    }
}

function goHome() { location.reload(); }