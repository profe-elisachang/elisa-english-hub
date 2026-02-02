// ====================
// ELISA ENGLISH HUB - ADVANCED LEVEL
// AUTOMATIC LESSON SCANNER
// ====================

// Configuration
const CONFIG = {
    lessonFolder: 'advanced/'
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
    // ========================================
    // ð æåæ·»å æ°æç« çä½ç½®
    // ========================================
    // ç¶æ¨å¨ advanced/ è³æå¤¾ä¸æ°å¢ HTML æç« æï¼
    // è«å¨æ­¤é£åä¸­æ·»å æªæ¡è³è¨ã
    //
    // ãæ ¼å¼èªªæ - å©ç¨®æ¹å¼ä»»é¸ä¸ç¨®ã
    //
    // æ¹å¼ 1ï¼ç°¡å®å­ä¸²ï¼æªååå«æ¥ææä½¿ç¨ï¼
    //   æ ¼å¼ï¼'YYYY-MM-DD-topic-name.html'
    //   ç¯ä¾ï¼'2025-01-15-topic-name.html'
    //   èªªæï¼ç³»çµ±æèªåå¾æªåè§£ææ¥æ
    //
    // æ¹å¼ 2ï¼ç©ä»¶æ ¼å¼ï¼æªåä¸åå«æ¥ææä½¿ç¨ï¼
    //   æ ¼å¼ï¼{ filename: 'æªå.html', date: 'YYYY-MM-DD' }
    //   ç¯ä¾ï¼{ filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' }
    //   èªªæï¼æåæå®ç¼ä½æ¥æï¼ç¢ºä¿æ­£ç¢ºæåº
    //
    // ãæ³¨æäºé ã
    // - å¦ææªæ¡åç¨±åå«å®å¼èï¼å¦ Don'tï¼ï¼è«ä½¿ç¨åæç·è½ç¾©ï¼Don\'t
    // - æ¯åé ç®å¾é¢å ä¸éè ,
    // - å»ºè­°æå­æ¯é åºæåï¼æ¹ä¾¿ç¶­è­·
    // - æªæ¡åç¨±å¿é è advanced/ è³æå¤¾ä¸çå¯¦éæªæ¡åç¨±å®å¨ä¸è´
    //
    // ãç¯ä¾ã
    //    '2025-01-15-topic-name.html',              â æ¹å¼ 1ï¼æªååå«æ¥æ
    //    { filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' },  â æ¹å¼ 2ï¼æåæå®æ¥æ
    //
    // ========================================
    const potentialFiles = [
        // æç« æ ¼å¼ï¼{ filename: 'æªå.html', date: 'YYYY-MM-DD', title: 'æ¨é¡ï¼å«emojiï¼' }
        // åæ¥éç¥æ ¼å¼ï¼{ date: 'YYYY-MM-DD', title: 'åæ¥åç¨±ï¼å«emojiï¼', isHoliday: true }
        { filename: 'The Fight Against Fake Job Applications.html', date: '2026-01-15', title: 'The Fight Against Fake Job Applications' },
        { filename: 'The New Primetime.html', date: '2026-01-20', title: 'ðº The New Primetime: Gen Z and Social Media Creators' },
        { filename: 'Treasure of the Sea.html', date: '2026-01-22', title: 'Treasure of the Sea: The Seaweed Industry' },
        { filename: 'Hollywood Means Business.html', date: '2026-01-27', title: 'Hollywood Means Business' },
        { filename: 'The Power of Asking for Help.html', date: '2026-01-29', title: 'ð¤ The Power of Asking for Help' },
        { filename: 'The Right Way to Motivate.html', date: '2026-02-03', title: 'ð¤ The Right Way to Motivate' },
        // ð å¨æ­¤ä¸æ¹æ·»å æ°æç« ï¼è¨å¾å éèï¼
        // æ ¼å¼ï¼{ filename: 'æªå.html', date: 'YYYY-MM-DD', title: 'æ¨é¡ï¼å«emojiï¼' }
        // åæ¥éç¥ç¯ä¾ï¼{ date: '2026-12-25', title: 'ð Christmas - No Class', isHoliday: true }
            { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: '🧠 The Philosophy of Empathy' },
        // 👆 在此上方添加新文章，記得加逗號！
];

    const lessons = [];

    for (const fileInfo of potentialFiles) {
        // æ¯æ´å©ç¨®æ ¼å¼ï¼å­ä¸²æç©ä»¶
        let filename, specifiedDate = null, specifiedTitle = null, specifiedEmoji = null, isHoliday = false;
        
        if (typeof fileInfo === 'string') {
            filename = fileInfo;
        } else {
            filename = fileInfo.filename;
            specifiedDate = fileInfo.date;
            specifiedTitle = fileInfo.title;
            isHoliday = fileInfo.isHoliday || false;
            
            // å¾æ¨é¡ä¸­æå emoji
            if (specifiedTitle) {
                const emojiMatch = specifiedTitle.match(/[\p{Emoji}]/u);
                specifiedEmoji = emojiMatch ? emojiMatch[0] : '';
            }
        }

        // èçåæ¥éç¥ï¼ä¸éè¦è¼å¥ HTML æä»¶ï¼
        if (isHoliday) {
            const holidayData = createHolidayData(specifiedDate, specifiedTitle, specifiedEmoji);
            if (holidayData) {
                lessons.push(holidayData);
            }
            continue;
        }

        // èçä¸è¬æç« ï¼éè¦è¼å¥ HTML æä»¶ï¼
        try {
            const response = await fetch(`${CONFIG.lessonFolder}${filename}`);
            if (response.ok) {
                const htmlContent = await response.text();
                const lessonData = await extractLessonData(filename, htmlContent, specifiedDate, specifiedTitle, specifiedEmoji);
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
    
    // åªæ¨è¨ææ°çä¸ç¯æç« çº NEW
    if (allLessons.length > 0) {
        // éç½®æææç« ç isNew æ¨è¨
        allLessons.forEach(lesson => {
            lesson.isNew = false;
        });
        // åªæ¨è¨ææ°çä¸ç¯ï¼ç¬¬ä¸ç¯ï¼çº NEW
        allLessons[0].isNew = true;
    }
    
    filteredLessons = [...allLessons];

    console.log(`â Loaded ${allLessons.length} lessons`);
}

// ====================
// CREATE HOLIDAY DATA
// ====================
function createHolidayData(specifiedDate, title, emoji) {
    if (!specifiedDate || !title) return null;
    
    const dateParts = specifiedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!dateParts) return null;
    
    const holidayDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
    const cleanTitle = title.replace(/[\p{Emoji}]/gu, '').trim();
    
    return {
        id: `holiday-${specifiedDate}`,
        filename: null,
        title: cleanTitle,
        emoji: emoji || 'ð',
        displayTitle: title,
        date: holidayDate,
        dateString: formatDate(holidayDate),
        preview: '',
        searchableContent: cleanTitle.toLowerCase(),
        isNew: false,
        isHoliday: true
    };
}

// ====================
// EXTRACT LESSON DATA FROM HTML
// ====================
async function extractLessonData(filename, htmlContent, specifiedDate = null, specifiedTitle = null, specifiedEmoji = null) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // åªåä½¿ç¨ potentialFiles ä¸­æä¾çæ¨é¡
    let titleText, emoji, cleanTitle;
    
    if (specifiedTitle) {
        // ä½¿ç¨ potentialFiles ä¸­æä¾çæ¨é¡
        titleText = specifiedTitle;
        emoji = specifiedEmoji || '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
    } else {
        // å¾ HTML æåæ¨é¡ï¼fallbackï¼
        let h1 = doc.querySelector('.container h1, .main-content h1, main h1, [class*="container"] h1');
        if (!h1) {
            const allH1s = doc.querySelectorAll('h1');
            if (allH1s.length > 1) {
                h1 = allH1s[1]; // Get the second h1 (article title)
            } else if (allH1s.length === 1) {
                const headerH1 = doc.querySelector('header h1');
                if (headerH1 && headerH1 === allH1s[0]) {
                    h1 = doc.querySelector('h1:not(header h1)') || doc.querySelector('.section h1') || null;
                } else {
                    h1 = allH1s[0];
                }
            }
        }
        if (!h1) return null;

        titleText = h1.textContent.trim();
        const emojiMatch = titleText.match(/[\p{Emoji}]/u);
        emoji = emojiMatch ? emojiMatch[0] : '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
    }

    // æ¥ææååªåé åºï¼
    // 1. æåæå®çæ¥æï¼specifiedDateï¼
    // 2. å¾æªåè§£ææ¥æï¼æ ¼å¼ï¼YYYY-MM-DD-slug.htmlï¼
    // 3. å¾ HTML meta æ¨ç±¤æåï¼å¦ææçè©±ï¼
    // 4. ä½¿ç¨æªæ¡ä¿®æ¹æéï¼å¦æå¯ç¨ï¼
    // 5. Fallback: ä½¿ç¨ç¶åæ¥æ
    let lessonDate;

    if (specifiedDate) {
        // åªåä½¿ç¨æåæå®çæ¥æ
        const dateParts = specifiedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateParts) {
            lessonDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
        } else {
            lessonDate = new Date(specifiedDate);
        }
    } else {
        // åè©¦å¾æªåè§£ææ¥æï¼æ ¼å¼ï¼YYYY-MM-DD-slug.htmlï¼
        const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
            lessonDate = new Date(dateMatch[1], dateMatch[2] - 1, dateMatch[3]);
        } else {
            // åè©¦å¾ HTML meta æ¨ç±¤æåæ¥æ
            const metaDate = doc.querySelector('meta[name="date"], meta[property="article:published_time"]');
            if (metaDate) {
                const dateValue = metaDate.getAttribute('content');
                lessonDate = new Date(dateValue);
                if (isNaN(lessonDate.getTime())) {
                    lessonDate = new Date(); // å¦æè§£æå¤±æï¼ä½¿ç¨ç¶åæ¥æ
                }
            } else {
                // Fallback: ä½¿ç¨ç¶åæ¥æ
                lessonDate = new Date();
            }
        }
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
        isNew: false,
        isHoliday: false
    };
}

// ====================
// INITIALIZE APP
// ====================
function initializeApp() {
    hideLoading();
    generateCalendar();
    setupSearch();
    setupBackToTop();
}

// ====================
// CALENDAR GENERATION
// ====================
function generateCalendar() {
    const container = document.getElementById('calendarView');
    if (!container) return;

    if (filteredLessons.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>ð No lessons found</p>
                <p style="font-size: 0.9rem;">Try a different search term</p>
            </div>
        `;
        return;
    }

    // Group lessons by month
    const lessonsByMonth = groupLessonsByMonth(filteredLessons);
    
    // Generate calendar HTML for each month (all expanded by default)
    const sortedMonths = Object.keys(lessonsByMonth).sort().reverse();
    
    container.innerHTML = sortedMonths.map(monthKey => {
        const monthData = lessonsByMonth[monthKey];
        const isCollapsed = false; // All months expanded by default
        
        return generateMonthCalendar(monthKey, monthData.lessons, monthData.name, isCollapsed);
    }).join('');
}

function groupLessonsByMonth(lessons) {
    const grouped = {};
    
    lessons.forEach(lesson => {
        const date = new Date(lesson.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        if (!grouped[monthKey]) {
            grouped[monthKey] = {
                name: monthName,
                lessons: []
            };
        }
        
        grouped[monthKey].lessons.push(lesson);
    });
    
    return grouped;
}

function generateMonthCalendar(monthKey, lessons, monthName, isCollapsed = false) {
    // Parse year and month from monthKey (format: "YYYY-MM")
    const [year, month] = monthKey.split('-').map(Number);
    const monthIndex = month - 1; // JavaScript months are 0-indexed
    
    // Get first day of month and number of days
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday = 0 format
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday = 0
    
    // Get previous month's last days to fill first week
    const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
    const daysToShowFromPrevMonth = firstDayOfWeek;
    
    // Create lessons map by date
    const lessonsByDate = {};
    lessons.forEach(lesson => {
        const lessonDate = new Date(lesson.date);
        const day = lessonDate.getDate();
        if (!lessonsByDate[day]) {
            lessonsByDate[day] = [];
        }
        lessonsByDate[day].push(lesson);
    });
    
    // Generate calendar grid
    let calendarHTML = `
        <div class="month-calendar ${isCollapsed ? 'collapsed' : ''}" data-month="${monthKey}">
            <div class="month-header" onclick="toggleMonthCalendar('${monthKey}', event)">
                <div class="month-header-title">
                    <span class="month-header-arrow">${isCollapsed ? 'â¶' : 'â¼'}</span>
                    <span>${monthName}</span>
                </div>
                <span class="month-header-count">(${lessons.length})</span>
            </div>
            <table class="calendar-grid">
                <thead>
                    <tr>
                        <th class="weekday">Mon</th>
                        <th class="weekday">Tue</th>
                        <th class="weekday">Wed</th>
                        <th class="weekday">Thu</th>
                        <th class="weekday">Fri</th>
                        <th class="weekend">Sat</th>
                        <th class="weekend">Sun</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Generate calendar days
    let currentDate = 1;
    let nextMonthDate = 1;
    
    // Calculate total cells needed (6 weeks * 7 days = 42)
    const totalCells = 42;
    let cellCount = 0;
    
    while (cellCount < totalCells) {
        calendarHTML += '<tr>';
        
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            let dayHTML = '';
            let cellClass = '';
            let dayNumber = '';
            let dayLessons = [];
            
            if (cellCount < firstDayOfWeek) {
                // Previous month
                const prevMonthDay = prevMonthLastDay - (firstDayOfWeek - cellCount - 1);
                dayNumber = prevMonthDay;
                cellClass = 'other-month';
            } else if (currentDate <= daysInMonth) {
                // Current month
                dayNumber = currentDate;
                dayLessons = lessonsByDate[currentDate] || [];
                cellClass = dayOfWeek >= 5 ? 'weekend' : 'weekday';
                currentDate++;
            } else {
                // Next month
                dayNumber = nextMonthDate;
                cellClass = 'other-month';
                nextMonthDate++;
            }
            
            // Build day cell
            dayHTML = `<td class="${cellClass}">`;
            dayHTML += `<div class="day-number">${dayNumber}</div>`;
            
            // Add lessons for this day
            if (dayLessons.length > 0 && !cellClass.includes('other-month')) {
                dayLessons.forEach(lesson => {
                    // ä¸è¬æç« åªå¨é±ä¸å°é±äºé¡¯ç¤ºï¼åæ¥éç¥å¯ä»¥é¡¯ç¤ºå¨ä»»ä½æ¥æ
                    if (!lesson.isHoliday && dayOfWeek >= 5) {
                        return; // è·³éé±æ«çä¸è¬æç« 
                    }
                    
                    const lessonClass = lesson.isHoliday ? 'day-lesson holiday' : 'day-lesson';
                    const fullTitle = lesson.emoji ? `${lesson.emoji} ${lesson.title}` : lesson.title;
                    // Full title will be displayed with multi-line truncation via CSS
                    
                    // åæ¥éç¥ä¸éè¦é£çµ
                    if (lesson.isHoliday) {
                        dayHTML += `<span class="${lessonClass}" title="${fullTitle}">${fullTitle}</span>`;
                    } else {
                        dayHTML += `<a href="${CONFIG.lessonFolder}${lesson.filename}" class="${lessonClass}" title="${fullTitle}">${fullTitle}</a>`;
                    }
                });
            }
            
            dayHTML += '</td>';
            calendarHTML += dayHTML;
            cellCount++;
        }
        
        calendarHTML += '</tr>';
        
        // Break if we've filled all days and next month days
        if (currentDate > daysInMonth && cellCount >= (firstDayOfWeek + daysInMonth)) {
            break;
        }
    }
    
    calendarHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    return calendarHTML;
}

function toggleMonthCalendar(monthKey, event) {
    const monthCalendar = document.querySelector(`.month-calendar[data-month="${monthKey}"]`);
    if (!monthCalendar) return;
    
    const monthHeader = event.currentTarget;
    const arrow = monthHeader.querySelector('.month-header-arrow');
    
    monthCalendar.classList.toggle('collapsed');
    arrow.textContent = monthCalendar.classList.contains('collapsed') ? 'â¶' : 'â¼';
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

        generateCalendar();
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
    backToTopBtn.innerHTML = 'â';
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


function showLoading() {
    const container = document.getElementById('calendarView');
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
        filename: l.filename
    })));
};

