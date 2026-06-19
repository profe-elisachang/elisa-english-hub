// ====================
// ELISA ENGLISH HUB - AUTOMATIC LESSON SCANNER
// No manual configuration needed!
// ====================

// Configuration
const CONFIG = {
    lessonFolder: 'intermediate/'
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
    // 📝 手動添加新文章或假日通知的位置
    // ========================================
    // 
    // 【文章格式】
    // { filename: '檔名.html', date: 'YYYY-MM-DD', title: '標題（含emoji）' }
    // 
    // 範例：
    // { filename: 'The Science of Memory.html', date: '2026-02-06', title: '🧠 The Science of Memory: Why We Remember and Why We Forget' }
    //
    // 【假日通知格式】
    // { date: 'YYYY-MM-DD', title: '假日名稱（含emoji）', isHoliday: true }
    //
    // 範例：
    // { date: '2026-12-25', title: '🎄 Christmas - No Class', isHoliday: true }
    // { date: '2026-01-01', title: '🎉 New Year\'s Day - No Class', isHoliday: true }
    //
    // 【注意事項】
    // - 如果檔案名稱或標題包含單引號（如 Don't），請使用反斜線轉義：Don\'t
    // - 每個項目後面加上逗號 ,
    // - 建議按日期順序排列，方便維護
    // - 檔案名稱必須與 intermediate/ 資料夾下的實際檔案名稱完全一致
    // - 標題會優先使用這裡提供的，如果沒有提供才會從 HTML 提取
    // - 假日通知不需要 filename，會顯示在月曆上但不可點擊
    //
    // Schedule: Intermediate class meets Mon/Wed/Fri. Teacher off 3/3–3/17; classes resume 3/18.
    //
    // ========================================
    const potentialFiles = [
        // 文章格式：{ filename: '檔名.html', date: 'YYYY-MM-DD', title: '標題（含emoji）' }
        // 假日通知格式：{ date: 'YYYY-MM-DD', title: '假日名稱（含emoji）', isHoliday: true }
        { filename: 'Don\'t Lose That Enthusiasm.html', date: '2026-01-12', title: 'Don\'t Lose That Enthusiasm!' },
        { filename: 'bubble-palace.html', date: '2026-01-14', title: '🏰 The Bubble Palace: One of the Most Unusual Homes on the Planet' },
        { filename: 'Yakult\'s-Secret-Ingredient.html', date: '2026-01-16', title: '🥛 Yakult\'s Secret Ingredient: The Yakult Ladies' },
        { filename: 'Exploring-a-Hidden-World-of-Color.html', date: '2026-01-19', title: '🎨 Exploring a Hidden World of Color' },
        { filename: 'AI-Risks.html', date: '2026-01-21', title: '🤖 Teen Suicide Case Raises Questions about AI Risks' },
        { filename: 'Power-Bank.html', date: '2026-01-23', title: '🔋 Could Your Power Bank Catch Fire or Explode?' },
        { filename: 'Cut Grass.html', date: '2026-01-26', title: '🌱 Cut Grass: A Scent of Survival, A Perfume of Pleasure' },
        { filename: 'Shades of Safety.html', date: '2026-01-28', title: '🕶️ Shades of Safety: Choosing the Right Sunglasses' },
        { filename: 'Friendly Service or Smart Machines.html', date: '2026-02-04', title: '🤖 Friendly Service or Smart Machines?' },
        { filename: 'The Uplifting Aroma of Scented Candles.html', date: '2026-02-09', title: '🕯️ The Uplifting Aroma of Scented Candles' },
        { filename: 'The Science of Memory.html', date: '2026-02-06', title: '🧠 The Science of Memory: Why We Remember and Why We Forget' },
        { filename: 'Mindfulness.html', date: '2026-02-11', title: '🧘 Mindfulness: Failing to Make the Grade in Schools' },
        { filename: 'McDonald.html', date: '2026-02-13', title: '🤡 The Disappearance of Ronald McDonald' },
        { date: '2026-02-02', title: 'Flexible Adjustment Holiday:Día de la Constitución Mexicana - No Class', isHoliday: true },
        { filename: 'Pen Caps.html', date: '2026-02-16', title: '🖊️ The Life-Saving Secret behind the Hole in Pen Caps' },
        { filename: 'Mindfulness.html', date: '2026-02-16', title: '🧘 Mindfulness: Failing to Make the Grade in Schools' },
        { filename: '-More Than a Meal.html', date: '2026-02-18', title: '🍽️ More Than a Meal: How You Eat Matters' },
        { filename: '2026-02Bricked-Up Windows in England.html', date: '2026-02-20', title: '🏛️ What\'s Up with All Those Bricked-Up Windows in England?' },
        { date: '2026-02-23', title: 'Classes suspended due to state safety measures. - No Class', isHoliday: true },
        { filename: 'Should You Always Do the Right Thing.html', date: '2026-02-25', title: '🤔 Should You Always Do the Right Thing?' },
        { filename: '- The Beauty of Broken Things.html', date: '2026-02-27', title: '🏺 The Beauty of Broken Things' },
            
        { filename: '-More Than a Meal.html', date: '2026-02-27', title: '🍽️ More Than a Meal: How You Eat Matters' },        { filename: 'Should You Always Do the Right Thing.html', date: '2026-03-02', title: '🤔 Should You Always Do the Right Thing?' },        { filename: '- The Beauty of Broken Things.html', date: '2026-03-02', title: '🏺 The Beauty of Broken Things' },
{ filename: '-More Than a Meal.html', date: '2026-03-02', title: '🍽️ More Than a Meal: How You Eat Matters' },
        // Teacher off 3/3–3/17, classes resume 3/18 (Intermediate Mon/Wed/Fri)
        { date: '2026-03-04', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-06', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-09', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-11', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-13', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-03-16', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'Should You Always Do the Right Thing.html', date: '2026-03-18', title: '🤔 Should You Always Do the Right Thing?' },
        { filename: '-More Than a Meal.html', date: '2026-03-18', title: '🍽️ More Than a Meal: How You Eat Matters' },
        { filename: 'Seeing Is Believing.html', date: '2026-03-20', title: '👓 Meta Ray-Ban Display: AI-Powered Smart Glasses for the Workplace' },
        { filename: 'Askers and Guessers.html', date: '2026-03-23', title: '🤝 Bridging the Gap Between Askers and Guessers' },
        { filename: 'Seeing Is Believing.html', date: '2026-03-25', title: '👓 Meta Ray-Ban Display: AI-Powered Smart Glasses for the Workplace' },
        { filename: 'Trains Have no Seatbelts.html', date: '2026-03-27', title: '🚆 Why Don\'t Trains Have Seatbelts?' },        { filename: 'Catch-Up Trap.html', date: '2026-04-01', title: '🤝 Caught in a Catch-Up Trap' },
        { date: '2026-04-03', title: '🏖️ Semana Santa - No Class', isHoliday: true },
        { filename: 'Robotaxis.html', date: '2026-04-06', title: '🚕 Robotaxis May Increase Traffic and Emissions' },
        { filename: 'Robotaxis -Excercise.html', date: '2026-04-06', title: '🚕 Robotaxis -Excercise' },
        { filename: 'Robotaxis.html', date: '2026-04-08', title: '🚕 Robotaxis May Increase Traffic and Emissions' },
        { filename: 'Robotaxis -Excercise.html', date: '2026-04-08', title: '🚕 Robotaxis -Excercise' },        { filename: 'Courtesy While Driving.html', date: '2026-04-10', title: '🚗 🛵 🚦 Common Courtesy While Driving' },
{ filename: 'Driving -Practice Activities.html', date: '2026-04-10', title: '🚦 Driving -Practice Activities' },
        { filename: 'Duolingo.html', date: '2026-04-13', title: '🦉 The Simple Formula That Made Duolingo a Daily Habit for Millions' },
        { filename: 'Self-Checkout Technology.html', date: '2026-04-15', title: '🛒 The Spectacular Failure of Self-Checkout Technolog' },        { filename: 'Oil from Venezuela.html', date: '2026-04-22', title: '🏭Oil from Venezuela' },
{ filename: 'Vampire Routing.html', date: '2026-04-20', title: '🧛 Vampire Routing— The Key to Cooler Urban Walking' },
        { filename: 'upskill your leaders.html', date: '2026-04-24', title: 'Article Takeaway' },
        { filename: 'upskill your comunication.html', date: '2026-04-24', title: 'No, you can\'t upskill your culture. But you can upskill your leaders ' },
        { filename: 'upskill your leaders.html', date: '2026-04-27', title: 'Article Takeaway' },
        { filename: 'upskill your comunication.html', date: '2026-04-27', title: 'No, you can\'t upskill your culture. But you can upskill your leaders ' },
        { date: '2026-05-01', title: 'Labor Day – No class', isHoliday: true },
        { filename: 'India\'s Cash Transfers.html', date: '2026-04-29', title: '💸 India\'s Cash Transfers Recognize Housewives\' Hidden Labor' },       
        { date: '2026-05-04', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'The Evolution of the Modern Workweek.html', date: '2026-05-08', title: '🏭 The Evolution of the Modern Workweek' },
        { filename: 'The Return of Retro Aesthetics.html', date: '2026-05-06', title: '🕶️ The Return of Retro Aesthetics' },
        { filename: 'Modern Workweek-Practice.html', date: '2026-05-08', title: '🏭  Modern Workweek-Practice' },
        { filename: 'The Evolution of the Modern Workweek.html', date: '2026-05-11', title: '🏭 The Evolution of the Modern Workweek' },
        { filename: 'Modern Workweek-Practice.html', date: '2026-05-11', title: '🏭  Modern Workweek-Practice' },
        { filename: 'The Return of Retro Aesthetics.html', date: '2026-05-13', title: '🕶️ The Return of Retro Aesthetics' },
       { filename: 'Era Explorer-Retro Aesthetics.html', date: '2026-05-13', title: 'Era Explorer-Retro Aesthetics' },
       { filename: 'Retro aesthetics-Discussion.html', date: '2026-05-13', title: 'Retro aesthetics through the lens of culture, generation, and identity ' },        
        { filename: 'Drones Are Changing the World.html', date: '2026-05-15', title: '' },
        { filename: 'Takeaways from the drone story.html', date: '2026-05-15', title: '💡 Economic Takeaways-Five big ideas from the drone story ' },
        { filename: 'Drones Are Changing the World.html', date: '2026-05-18', title: '' },
        { filename: 'Takeaways from the drone story.html', date: '2026-05-18', title: '💡 Economic Takeaways-Five big ideas from the drone story ' },
        { filename: 'Drones Are Changing the World.html', date: '2026-05-20', title: '' },
        { filename: 'Takeaways from the drone story.html', date: '2026-05-20', title: '💡 Economic Takeaways-Five big ideas from the drone story ' },
        { filename: 'Control the Climate.html', date: '2026-05-22', title: '🌍 Can We Control the Climate?' },
        { filename: 'Europe in Your Palm.html', date: '2026-05-25', title: '🪙 Europe in Your Palm' },
        { filename: 'Control the Climate.html', date: '2026-05-27', title: '🌍 Can We Control the Climate?' },
        { date: '2026-05-26', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'The Subscribed Life.html', date: '2026-06-01', title: '💳The Subscribed Life' },
        { filename: 'Riding the Trade Winds.html', date: '2026-06-03', title: '⛵ Riding the Trade Winds Again' },
        { filename: 'Secondhand Clothing.html', date: '2026-06-05', title: '👗 The Unseen Impact of Secondhand Clothing' },
        { filename: 'The Subscribed Life.html', date: '2026-06-08', title: '💳The Subscribed Life' },
        { filename: 'Riding the Trade Winds.html', date: '2026-06-10', title: '⛵ Riding the Trade Winds Again' },
        { filename: 'Secondhand Clothing.html', date: '2026-06-12', title: '👗 The Unseen Impact of Secondhand Clothing' },
        { date: '2026-06-24', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { date: '2026-06-26', title: '🏖️ Teacher Off - No Class', isHoliday: true },
        { filename: 'The Importance of Personal Boundaries.html', date: '2026-06-15', title: '🛡️ The Importance of Personal Boundaries' },
        { filename: 'Secondhand Clothing.html', date: '2026-06-17', title: '👗 The Unseen Impact of Secondhand Clothing' },
        { filename: 'Viral Foods.html', date: '2026-06-19', title: '🔥From Screens to Stores: The Power of Viral Foods' },
// 👆 在此上方添加新文章，記得加逗號！
        // 格式：{ filename: '檔名.html', date: 'YYYY-MM-DD', title: '標題（含emoji）' }
        // 假日通知範例：{ date: '2026-12-25', title: '🎄 Christmas - No Class', isHoliday: true }
    ];

    const lessons = [];
    
    // 先處理假日通知（不需要載入文件）
    const holidayItems = [];
    const fileItems = [];
    
    for (const fileInfo of potentialFiles) {
        // 跳過 undefined 或 null 的元素
        if (!fileInfo) {
            continue;
        }
        
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
                holidayItems.push(holidayData);
            }
            continue;
        }

        // 處理一般文章（需要載入 HTML 文件）
        // 確保有 filename 才繼續處理
        if (!filename) {
            console.warn('Skipping item without filename:', fileInfo);
            continue;
        }
        
        fileItems.push({ filename, specifiedDate, specifiedTitle, specifiedEmoji });
    }
    
    // 將假日項目加入 lessons
    lessons.push(...holidayItems);
    
    // 並行載入所有文件（優化 GitHub Pages 載入速度）
    const totalFiles = fileItems.length;
    let loadedCount = 0;
    
    const loadPromises = fileItems.map(async ({ filename, specifiedDate, specifiedTitle, specifiedEmoji }) => {
        try {
            const response = await fetch(`${CONFIG.lessonFolder}${filename}`);
            if (response.ok) {
                const htmlContent = await response.text();
                const lessonData = await extractLessonData(filename, htmlContent, specifiedDate, specifiedTitle, specifiedEmoji);
                loadedCount++;
                updateLoadingProgress(loadedCount, totalFiles);
                return lessonData;
            }
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error);
            loadedCount++;
            updateLoadingProgress(loadedCount, totalFiles);
            return null;
        }
        return null;
    });
    
    // 等待所有文件載入完成
    const loadedLessons = await Promise.all(loadPromises);
    
    // 過濾掉 null 值並加入 lessons
    loadedLessons.forEach(lesson => {
        if (lesson) {
            lessons.push(lesson);
        }
    });

    // Sort by date (newest first)
    allLessons = lessons.sort((a, b) => new Date(b.date) - new Date(a.date));
    
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
        isHoliday: true
    };
}

// ====================
// EXTRACT LESSON DATA FROM HTML
// ====================
async function extractLessonData(filename, htmlContent, specifiedDate = null, specifiedTitle = null, specifiedEmoji = null) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 優先使用 potentialFiles 中提供的標題，但如果沒有提供則自動從 HTML 提取
    let titleText, emoji, cleanTitle;
    
    if (specifiedTitle) {
        // 使用 potentialFiles 中提供的標題
        titleText = specifiedTitle;
        emoji = specifiedEmoji || '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
    } else {
        // 從 HTML 自動提取標題（多種選擇器策略）
        let h1 = null;
        
        // 策略 1: 優先尋找文章標題（最常見的結構）
        h1 = doc.querySelector('.article-title, .article-section h1, section.article-section h1');
        
        // 策略 2: 尋找容器內的 h1（排除 header）
        if (!h1) {
            h1 = doc.querySelector('.container h1:not(header h1), .main-content h1:not(header h1), main h1:not(header h1)');
        }
        
        // 策略 3: 尋找所有 h1，排除 header 中的
        if (!h1) {
            const allH1s = doc.querySelectorAll('h1');
            const headerH1 = doc.querySelector('header h1');
            
            if (allH1s.length > 1) {
                // 有多個 h1，找第一個不在 header 中的
                for (let i = 0; i < allH1s.length; i++) {
                    if (!headerH1 || allH1s[i] !== headerH1) {
                        h1 = allH1s[i];
                        break;
                    }
                }
                // 如果還是沒找到，使用第二個（通常是文章標題）
                if (!h1 && allH1s.length > 1) {
                    h1 = allH1s[1];
                }
            } else if (allH1s.length === 1) {
                // 只有一個 h1，檢查是否在 header 中
                if (!headerH1 || allH1s[0] !== headerH1) {
                    h1 = allH1s[0];
                } else {
                    // 在 header 中，嘗試找其他標題元素
                    h1 = doc.querySelector('h2.article-title, .article-section h2, section h2') || null;
                }
            }
        }
        
        // 策略 4: 如果還是找不到，嘗試找任何 section 中的 h1
        if (!h1) {
            h1 = doc.querySelector('section h1, article h1');
        }
        
        if (!h1) {
            console.warn(`無法從 ${filename} 中提取標題`);
            return null;
        }

        titleText = h1.textContent.trim();
        const emojiMatch = titleText.match(/[\p{Emoji}]/u);
        emoji = emojiMatch ? emojiMatch[0] : '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
        
        console.log(`✅ 自動提取標題: ${titleText} (來自 ${filename})`);
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
        searchableContent: searchableContent.toLowerCase()
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
// MONTH NAVIGATION (Removed - replaced by calendar view)
// ====================

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
        container.innerHTML = '<div class="loading">Loading lessons<span class="loading-dots"></span></div>';
    }
}

function updateLoadingProgress(loaded, total) {
    const container = document.getElementById('calendarView');
    if (container) {
        const percentage = Math.round((loaded / total) * 100);
        container.innerHTML = `<div class="loading">Loading lessons... ${loaded}/${total} (${percentage}%)<span class="loading-dots"></span></div>`;
    }
}

function hideLoading() {
    // Loading will be replaced by actual content
}

// ====================
// EXPORT FOR DEBUGGING
// ====================
// Make toggleMonthCalendar available globally
window.toggleMonthCalendar = toggleMonthCalendar;

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




