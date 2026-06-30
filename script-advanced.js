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
    // 📝 手動添加新文章的位置
    // ========================================
    // 當您在 advanced/ 資料夾下新增 HTML 文章時，
    // 請在此陣列中添加檔案資訊。
    //
    // 【格式說明 - 兩種方式任選一種】
    //
    // 方式 1：簡單字串（檔名包含日期時使用）
    //   格式：'YYYY-MM-DD-topic-name.html'
    //   範例：'2025-01-15-topic-name.html'
    //   說明：系統會自動從檔名解析日期
    //
    // 方式 2：物件格式（檔名不包含日期時使用）
    //   格式：{ filename: '檔名.html', date: 'YYYY-MM-DD' }
    //   範例：{ filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' }
    //   說明：手動指定發佈日期，確保正確排序
    //
    // 【注意事項】
    // - 如果檔案名稱包含單引號（如 Don't），請使用反斜線轉義：Don\'t
    // - 每個項目後面加上逗號 ,
    // - 建議按字母順序排列，方便維護
    // - 檔案名稱必須與 advanced/ 資料夾下的實際檔案名稱完全一致
    //
    // 【範例】
    //    '2025-01-15-topic-name.html',              ← 方式 1：檔名包含日期
    //    { filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' },  ← 方式 2：手動指定日期
    //
    // Schedule: Advanced class meets Tue/Thu. Teacher off 3/3–3/17; classes resume 3/18.
    //
    // ========================================
    const potentialFiles = [
        // 文章格式：{ filename: '檔名.html', date: 'YYYY-MM-DD', title: '標題（含emoji）' }
        // 假日通知格式：{ date: 'YYYY-MM-DD', title: '假日名稱（含emoji）', isHoliday: true }
        { filename: 'The Fight Against Fake Job Applications.html', date: '2026-01-15', title: 'The Fight Against Fake Job Applications' },
        { filename: 'The New Primetime.html', date: '2026-01-20', title: '📺 The New Primetime: Gen Z and Social Media Creators' },
        { filename: 'Treasure of the Sea.html', date: '2026-01-22', title: 'Treasure of the Sea: The Seaweed Industry' },
        { filename: 'Hollywood Means Business.html', date: '2026-01-27', title: 'Hollywood Means Business' },
        { filename: 'The Power of Asking for Help.html', date: '2026-01-29', title: '🤝 The Power of Asking for Help' },
        { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: '🧠 The Philosophy of Empathy' },
        { filename: 'The Right Way to Motivate.html', date: '2026-02-03', title: '🤝 The Right Way to Motivate' },
        { filename: 'Child Privacy Suffers in the Age of Sharenting.html', date: '2026-02-10', title: '📱 Child Privacy Suffers in the Age of Sharenting' },
        { filename: 'Political-Correctness.html', date: '2026-02-12', title: '🗣️ Political Correctness: Social Progress' },
        { filename: 'Seeing Is Believing.html', date: '2026-02-17', title: '👓 Meta Ray-Ban Display: AI-Powered Smart Glasses for the Workplace' },
        { filename: 'Feb. Looting the Louvre.html', date: '2026-02-19', title: '🖼️ Feb. Looting the Louvre' },          
        { date: '2026-02-24', title: 'Classes suspended due to state safety measures. - No Class', isHoliday: true },
        { date: '2026-02-26', title: 'Classes suspended due to state safety measures. - No Class', isHoliday: true },
        { filename: 'Why You Can’t Remember Being a Toddler.html', date: '2026-02-24', title: '🧸 Why You Can’t Remember Being a Toddler' },
        { filename: 'Bad Bunny Super Bowl Halftime Show.html', date: '2026-02-26', title: '🏈 GOP Lawmaker Calls for Probe Into NFL and NBC Over \'Indecent\' Bad Bunny Super Bowl Halftime Show' },
        // Teacher off 3/3–3/17, classes resume 3/18 (Advanced Tue/Thu)
        { date: '2026-03-03', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-05', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-10', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-12', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-17', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'Why You Can’t Remember Being a Toddler.html', date: '2026-03-19', title: '🧸 Why You Can’t Remember Being a Toddler' },
        { filename: 'Bad Bunny Super Bowl Halftime Show.html', date: '2026-03-24', title: '🏈 GOP Lawmaker Calls for Probe Into NFL and NBC Over \'Indecent\' Bad Bunny Super Bowl Halftime Show' },
        { filename: 'Growing Muscles.html', date: '2026-03-26', title: '💪 Growing Muscles, Growing Markets' },        { filename: 'Hero Tax.html', date: '2026-03-31', title: '🦸 The Hero Tax: Why \'Selfless\' Workers Are Professionally Exploited' },
        { filename: 'Persian Gulf Crisis.html', date: '2026-04-02', title: 'Persian Gulf Crisis Impacting Food Security' },
        { filename: 'Crisis en el Golfo Pérsico.html', date: '2026-04-02', title: 'Crisis en el Golfo Pérsico' },
        { filename: 'Developing Countries Are Being Priced Out.html', date: '2026-04-07', title: 'Developing Countries Are Being Priced Out, in Struggle for Affordable Finance' },
        { filename: 'Golden State.html', date: '2026-04-09', title: 'Goodbye, Golden State' },        
        { filename: 'Venezuelan Oil.html', date: '2026-04-14', title: 'The US Refinery Now Processing Venezuelan Oil' },        { filename: 'Self-Checkout Technology.html', date: '2026-04-16', title: '🛒 The Spectacular Failure of Self-Checkout Technolog' },
{ filename: 'The US Refinery Now Processing Venezuelan Oil.html', date: '2026-04-14', title: '⛽ The US Refinery  Processing Venezuelan Oil -  Why This Matters to You' },
        { filename: 'The Carpool Detectives.html', date: '2026-04-21', title: '🔍 The Carpool Detectives' },
        { filename: 'Workplace Anxiety.html', date: '2026-04-23', title: '😰 Easing Workplace Anxiety' },    
         { filename: 'upskill your leaders.html', date: '2026-04-28', title: 'No, you cannot upskill your culture. But you can upskill your leaders' },    
       
        { filename: 'India-Experiment in Paying Women.html', date: '2026-04-30', title: '💰 A Wage for Housework?' },
        { filename: 'A Dream Team Gamble.html', date: '2026-05-05', title: '🎲 A Dream Team Gamble?' },        { filename: 'The K-Beauty Craze.html', date: '2026-05-07', title: '🧴 The K-Beauty Craze' },
        { filename: 'K-Beauty Business Deep Dive.html', date: '2026-05-07', title: '💡 K-Beauty Business Deep Dive' },
        { filename: 'The Low-Altitude Economy.html', date: '2026-05-12', title: '🚁 The Low-Altitude Economy' },
        { filename: 'The Low-Altitude Economy.html', date: '2026-05-14', title: '🚁 The Low-Altitude Economy' },
        { filename: 'The Low-Altitude Economy.html', date: '2026-05-19', title: '🚁 The Low-Altitude Economy' },        
        { filename: 'Engineering the Environment.html', date: '2026-05-26', title: '🌍 Engineering the Environment' },
        { filename: 'Robotaxis.html', date: '2026-05-28', title: '🚕 Robotaxis May Increase Traffic and Emissions, Analysts Warn' },
        { filename: 'Riding the Trade Winds Again.html', date: '2026-06-02', title: '⛵ Riding the Trade Winds Again' },
        { filename: 'Four-Day Workweek.html', date: '2026-06-04', title: '⏰ Is a Four-Day Workweek in Your Future?' },
        { filename: 'Four-Day Workweek.html', date: '2026-06-09', title: '⏰ Is a Four-Day Workweek in Your Future?' },
        { date: '2026-06-25', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'From Despair to HOPE in Haiti.html', date: '2026-06-11', title: '🌱 From Despair to HOPE in Haiti' },
        { filename: 'LA School Cellphone.html', date: '2026-06-16', title: '📱 LA School Cellphone Ban: Year One' },
        { filename: 'The Benefits of Boundaries.html', date: '2026-06-18', title: '⚖️ The Benefits of Boundaries' },
        { date: '2026-06-23', title: 'No Class – IATF Audit', isHoliday: true },
        { filename: 'Work With Your Biology.html', date: '2026-06-30', title: '⚖️ Work With Your Biology, Not Against It' },
// 👆 在此上方添加新文章，記得加逗號！
        // 格式：{ filename: '檔名.html', date: 'YYYY-MM-DD', title: '標題（含emoji）' }
        // 假日通知範例：{ date: '2026-12-25', title: '🎄 Christmas - No Class', isHoliday: true }
    ];

    const lessons = [];

    for (const fileInfo of potentialFiles) {
        // 支援兩種格式：字串或物件
        let filename, specifiedDate = null, specifiedTitle = null, specifiedEmoji = null, isHoliday = false;
        
        if (typeof fileInfo === 'string') {
            filename = fileInfo;
        } else {
            filename = fileInfo.filename;
            specifiedDate = fileInfo.date;
            specifiedTitle = fileInfo.title;
            isHoliday = fileInfo.isHoliday || false;
            
            // 從標題中提取 emoji
            if (specifiedTitle) {
                const emojiMatch = specifiedTitle.match(/[\p{Emoji}]/u);
                specifiedEmoji = emojiMatch ? emojiMatch[0] : '';
            }
        }

        // 處理假日通知（不需要載入 HTML 文件）
        if (isHoliday) {
            const holidayData = createHolidayData(specifiedDate, specifiedTitle, specifiedEmoji);
            if (holidayData) {
                lessons.push(holidayData);
            }
            continue;
        }

        // 處理一般文章（需要載入 HTML 文件）
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
    
    // 只標記最新的一篇文章為 NEW
    if (allLessons.length > 0) {
        // 重置所有文章的 isNew 標記
        allLessons.forEach(lesson => {
            lesson.isNew = false;
        });
        // 只標記最新的一篇（第一篇）為 NEW
        allLessons[0].isNew = true;
    }
    
    filteredLessons = [...allLessons];

    console.log(`✅ Loaded ${allLessons.length} lessons`);
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
        emoji: emoji || '📅',
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

    // 優先使用 potentialFiles 中提供的標題
    let titleText, emoji, cleanTitle;
    
    if (specifiedTitle) {
        // 使用 potentialFiles 中提供的標題
        titleText = specifiedTitle;
        emoji = specifiedEmoji || '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
    } else {
        // 從 HTML 提取標題（fallback）
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

    // 日期提取優先順序：
    // 1. 手動指定的日期（specifiedDate）
    // 2. 從檔名解析日期（格式：YYYY-MM-DD-slug.html）
    // 3. 從 HTML meta 標籤提取（如果有的話）
    // 4. 使用檔案修改時間（如果可用）
    // 5. Fallback: 使用當前日期
    let lessonDate;

    if (specifiedDate) {
        // 優先使用手動指定的日期
        const dateParts = specifiedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateParts) {
            lessonDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
        } else {
            lessonDate = new Date(specifiedDate);
        }
    } else {
        // 嘗試從檔名解析日期（格式：YYYY-MM-DD-slug.html）
        const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
            lessonDate = new Date(dateMatch[1], dateMatch[2] - 1, dateMatch[3]);
        } else {
            // 嘗試從 HTML meta 標籤提取日期
            const metaDate = doc.querySelector('meta[name="date"], meta[property="article:published_time"]');
            if (metaDate) {
                const dateValue = metaDate.getAttribute('content');
                lessonDate = new Date(dateValue);
                if (isNaN(lessonDate.getTime())) {
                    lessonDate = new Date(); // 如果解析失敗，使用當前日期
                }
            } else {
                // Fallback: 使用當前日期
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
                <p>😔 No lessons found</p>
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
                    <span class="month-header-arrow">${isCollapsed ? '▶' : '▼'}</span>
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
                    // 一般文章只在週一到週五顯示，假日通知可以顯示在任何日期
                    if (!lesson.isHoliday && dayOfWeek >= 5) {
                        return; // 跳過週末的一般文章
                    }
                    
                    const lessonClass = lesson.isHoliday ? 'day-lesson holiday' : 'day-lesson';
                    const fullTitle = lesson.emoji ? `${lesson.emoji} ${lesson.title}` : lesson.title;
                    // Full title will be displayed with multi-line truncation via CSS
                    
                    // 假日通知不需要連結
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
    arrow.textContent = monthCalendar.classList.contains('collapsed') ? '▶' : '▼';
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


