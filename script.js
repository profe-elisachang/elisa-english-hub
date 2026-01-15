// ====================
// ELISA ENGLISH HUB - AUTOMATIC LESSON SCANNER
// No manual configuration needed!
// ====================

// Configuration
const CONFIG = {
    lessonFolder: 'intermediate/',
    newLessonDays: 7 // Show "NEW" badge for lessons within X days
};

// Global state
let allLessons = [];
let filteredLessons = [];

// ====================
// INITIALIZATION
// ====================
document.addEventListener('DOMContentLoaded', async function() {
    showLoading();
    await scanLessons();
    initializeApp();
});

// ====================
// AUTOMATIC LESSON SCANNING
// ====================
async function scanLessons() {
    // List of HTML files to scan
    // UPDATE THIS LIST when you add new lessons!
    const potentialFiles = [
        'bubble-palace.html',
        'Yakult\'s-Secret-Ingredient.html',
        'Don\'t Lose That Enthusiasm.html'
    ];

    const lessons = [];

    for (const filename of potentialFiles) {
        try {
            const response = await fetch(`${CONFIG.lessonFolder}${filename}`);
            if (response.ok) {
                const htmlContent = await response.text();
                const lessonData = await extractLessonData(filename, htmlContent);
                if (lessonData) {
                    lessons.push(lessonData);
                }
            }
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error);
        }
    }

    // Sort by date (newest first)
    allLessons = lessons.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredLessons = [...allLessons];

    console.log(`✅ Loaded ${allLessons.length} lessons`);
}

// ====================
// EXTRACT LESSON DATA FROM HTML
// ====================
async function extractLessonData(filename, htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract title from <h1>
    const h1 = doc.querySelector('h1');
    if (!h1) return null;

    const titleText = h1.textContent.trim();

    // Extract emoji from title (if exists)
    const emojiMatch = titleText.match(/[\p{Emoji}]/u);
    const emoji = emojiMatch ? emojiMatch[0] : '';

    // Remove emoji from title for clean display
    const cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();

    // Try to extract date from filename (format: YYYY-MM-DD-slug.html)
    const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
    let lessonDate;

    if (dateMatch) {
        lessonDate = new Date(dateMatch[1], dateMatch[2] - 1, dateMatch[3]);
    } else {
        // Fallback: use current date
        lessonDate = new Date();
    }

    // Extract first paragraph for preview (optional, for future use)
    const firstParagraph = doc.querySelector('p');
    const preview = firstParagraph ? firstParagraph.textContent.trim().substring(0, 150) : '';

    // Extract searchable content (first 500 characters of text)
    const bodyText = doc.body.textContent || '';
    const searchableContent = bodyText.replace(/\s+/g, ' ').trim().substring(0, 500);

    return {
        id: filename.replace('.html', ''),
        filename: filename,
        title: cleanTitle,
        emoji: emoji,
        displayTitle: titleText, // Full title with emoji
        date: lessonDate,
        dateString: formatDate(lessonDate),
        preview: preview,
        searchableContent: searchableContent.toLowerCase(),
        isNew: isNewLesson(lessonDate)
    };
}

// ====================
// INITIALIZE APP
// ====================
function initializeApp() {
    hideLoading();
    generateMonthNavigation();
    displayAllLessons();
    setupSearch();
    setupBackToTop();
}

// ====================
// DISPLAY LESSONS
// ====================
function displayAllLessons() {
    const container = document.getElementById('lessonCards');
    if (!container) return;

    if (filteredLessons.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>😔 No lessons found</p>
                <p style="font-size: 0.9rem;">Try a different search term</p>
            </div>
        `;
        return;
    }

    // Update section title with count
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.innerHTML = `All Articles <span class="total-count">(${filteredLessons.length})</span>`;
    }

    container.innerHTML = filteredLessons.map(lesson => createLessonItem(lesson)).join('');
}

function createLessonItem(lesson) {
    const dateClass = lesson.isNew ? 'lesson-date new' : 'lesson-date';
    const dateDisplay = lesson.isNew ? 'NEW' : lesson.dateString;

    return `
        <a href="${CONFIG.lessonFolder}${lesson.filename}" class="lesson-item" style="text-decoration: none; color: inherit;">
            <div class="lesson-title-wrapper">
                <h3 class="lesson-title">${lesson.emoji} ${lesson.title}</h3>
            </div>
            <div class="${dateClass}">${dateDisplay}</div>
        </a>
    `;
}

// ====================
// MONTH NAVIGATION
// ====================
function generateMonthNavigation() {
    const monthNav = document.getElementById('monthNav');
    if (!monthNav) return;

    const lessonsByMonth = {};

    allLessons.forEach(lesson => {
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
                <button class="month-header ${isFirst ? 'active' : ''}" onclick="toggleMonth('${monthKey}', event)">
                    <span class="arrow">${isFirst ? '▼' : '▶'}</span>
                    ${month.name}
                    <span class="lesson-count">${month.lessons.length}</span>
                </button>
                <ul class="lesson-list ${isFirst ? '' : 'hidden'}" id="month-${monthKey}">
                    ${month.lessons.map(lesson => `
                        <li>
                            <a href="${CONFIG.lessonFolder}${lesson.filename}">
                                ${lesson.emoji} ${lesson.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

function toggleMonth(monthKey, event) {
    const lessonList = document.getElementById(`month-${monthKey}`);
    const monthHeader = event.target.closest('.month-header');
    const arrow = monthHeader.querySelector('.arrow');

    lessonList.classList.toggle('hidden');
    arrow.textContent = lessonList.classList.contains('hidden') ? '▶' : '▼';
    monthHeader.classList.toggle('active');
}

// ====================
// SEARCH FUNCTIONALITY
// ====================
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            // Show all lessons
            filteredLessons = [...allLessons];
        } else {
            // Search in title, emoji, and content
            filteredLessons = allLessons.filter(lesson => {
                return lesson.title.toLowerCase().includes(searchTerm) ||
                       lesson.emoji.includes(searchTerm) ||
                       lesson.searchableContent.includes(searchTerm);
            });
        }

        displayAllLessons();
    });
}

// ====================
// NAVIGATION (Not needed anymore - using direct links)
// ====================
// Lessons now open in the same window via direct href links
// Each lesson page is a complete, independent HTML file

// ====================
// BACK TO TOP BUTTON
// ====================
function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

// ====================
// UTILITY FUNCTIONS
// ====================
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function isNewLesson(lessonDate) {
    const now = new Date();
    const diffTime = Math.abs(now - lessonDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= CONFIG.newLessonDays;
}

function showLoading() {
    const container = document.getElementById('lessonCards');
    if (container) {
        container.innerHTML = '<div class="loading">Loading lessons</div>';
    }
}

function hideLoading() {
    // Loading will be replaced by actual content
}

// ====================
// EXPORT FOR DEBUGGING
// ====================
window.debugLessons = () => {
    console.table(allLessons.map(l => ({
        title: l.title,
        emoji: l.emoji,
        date: l.dateString,
        isNew: l.isNew,
        filename: l.filename
    })));
};
