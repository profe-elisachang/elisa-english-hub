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
    // ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ·ÃÂÃÂ»ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂÃÂÃÂ§ÃÂÃÂ½ÃÂÃÂ®
    // ========================================
    // ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¶ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ advanced/ ÃÂÃÂ¨ÃÂÃÂ³ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¥ÃÂÃÂ¢ÃÂÃÂ HTML ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // ÃÂÃÂ¨ÃÂÃÂ«ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂ­ÃÂÃÂ¤ÃÂÃÂ©ÃÂÃÂÃÂÃÂ£ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ­ÃÂÃÂ¦ÃÂÃÂ·ÃÂÃÂ»ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ³ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ£ÃÂÃÂÃÂÃÂ
    //
    // ÃÂÃÂ£ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¨ÃÂÃÂªÃÂÃÂªÃÂÃÂ¦ÃÂÃÂÃÂÃÂ - ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ©ÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ®ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ»ÃÂÃÂ©ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ®ÃÂÃÂ£ÃÂÃÂÃÂÃÂ
    //
    // ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂ 1ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂ°ÃÂÃÂ¡ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ®ÃÂÃÂ¥ÃÂÃÂ­ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ²ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    //   ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ'YYYY-MM-DD-topic-name.html'
    //   ÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ'2025-01-15-topic-name.html'
    //   ÃÂÃÂ¨ÃÂÃÂªÃÂÃÂªÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂ³ÃÂÃÂ»ÃÂÃÂ§ÃÂÃÂµÃÂÃÂ±ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂªÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂ£ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
    //
    // ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂ 2ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ¶ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    //   ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ filename: 'ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ.html', date: 'YYYY-MM-DD' }
    //   ÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' }
    //   ÃÂÃÂ¨ÃÂÃÂªÃÂÃÂªÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ®ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¼ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¢ÃÂÃÂºÃÂÃÂ¤ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ¦ÃÂÃÂ­ÃÂÃÂ£ÃÂÃÂ§ÃÂÃÂ¢ÃÂÃÂºÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂºÃÂÃÂ
    //
    // ÃÂÃÂ£ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ³ÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂºÃÂÃÂÃÂÃÂ©ÃÂÃÂ ÃÂÃÂÃÂÃÂ£ÃÂÃÂÃÂÃÂ
    // - ÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ±ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ®ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂ Don'tÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ«ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ·ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ½ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¾ÃÂÃÂ©ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂDon\'t
    // - ÃÂÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ©ÃÂÃÂ ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ®ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂ¢ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ ,
    // - ÃÂÃÂ¥ÃÂÃÂ»ÃÂÃÂºÃÂÃÂ¨ÃÂÃÂ­ÃÂÃÂ°ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ­ÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ©ÃÂÃÂ ÃÂÃÂÃÂÃÂ¥ÃÂÃÂºÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂ¶ÃÂÃÂ­ÃÂÃÂ¨ÃÂÃÂ­ÃÂÃÂ·
    // - ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ±ÃÂÃÂ¥ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ©ÃÂÃÂ ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ advanced/ ÃÂÃÂ¨ÃÂÃÂ³ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¯ÃÂÃÂ¦ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ±ÃÂÃÂ¥ÃÂÃÂ®ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ´
    //
    // ÃÂÃÂ£ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ£ÃÂÃÂÃÂÃÂ
    //    '2025-01-15-topic-name.html',              ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂ 1ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
    //    { filename: 'The Fight Against Fake Job Applications.html', date: '2025-01-20' },  ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂ 2ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ®ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
    //
    // ========================================
    const potentialFiles = [
        // ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ filename: 'ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ.html', date: 'YYYY-MM-DD', title: 'ÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«emojiÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ' }
        // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ date: 'YYYY-MM-DD', title: 'ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ±ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«emojiÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ', isHoliday: true }
        { filename: 'The Fight Against Fake Job Applications.html', date: '2026-01-15', title: 'The Fight Against Fake Job Applications' },
        { filename: 'The New Primetime.html', date: '2026-01-20', title: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂº The New Primetime: Gen Z and Social Media Creators' },
        { filename: 'Treasure of the Sea.html', date: '2026-01-22', title: 'Treasure of the Sea: The Seaweed Industry' },
        { filename: 'Hollywood Means Business.html', date: '2026-01-27', title: 'Hollywood Means Business' },
        { filename: 'The Power of Asking for Help.html', date: '2026-01-29', title: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ The Power of Asking for Help' },
        { filename: 'The Right Way to Motivate.html', date: '2026-02-03', title: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ The Right Way to Motivate' },
        // ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂ­ÃÂÃÂ¤ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¦ÃÂÃÂ·ÃÂÃÂ»ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
        // ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ filename: 'ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ.html', date: 'YYYY-MM-DD', title: 'ÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ«emojiÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ' }
        // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ{ date: '2026-12-25', title: 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ Christmas - No Class', isHoliday: true }
            { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: 'ÃÂ°ÃÂÃÂ§ÃÂ  The Philosophy of Empathy' },
        // ÃÂ°ÃÂÃÂÃÂ ÃÂ¥ÃÂÃÂ¨ÃÂ¦ÃÂ­ÃÂ¤ÃÂ¤ÃÂ¸ÃÂÃÂ¦ÃÂÃÂ¹ÃÂ¦ÃÂ·ÃÂ»ÃÂ¥ÃÂÃÂ ÃÂ¦ÃÂÃÂ°ÃÂ¦ÃÂÃÂÃÂ§ÃÂ«ÃÂ ÃÂ¯ÃÂ¼ÃÂÃÂ¨ÃÂ¨ÃÂÃÂ¥ÃÂ¾ÃÂÃÂ¥ÃÂÃÂ ÃÂ©ÃÂÃÂÃÂ¨ÃÂÃÂÃÂ¯ÃÂ¼ÃÂ
        { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: 'Ã°ÂÂ§Â  The Philosophy of Empathy' },
        // Ã°ÂÂÂ Ã¥ÂÂ¨Ã¦Â­Â¤Ã¤Â¸ÂÃ¦ÂÂ¹Ã¦Â·Â»Ã¥ÂÂ Ã¦ÂÂ°Ã¦ÂÂÃ§Â«Â Ã¯Â¼ÂÃ¨Â¨ÂÃ¥Â¾ÂÃ¥ÂÂ Ã©ÂÂÃ¨ÂÂÃ¯Â¼Â
        { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: 'ð§  The Philosophy of Empathy' },
        // ð å¨æ­¤ä¸æ¹æ·»å æ°æç« ï¼è¨å¾å éèï¼
        { filename: 'The Philosophy of Empathy.html', date: '2026-02-05', title: '🧠 The Philosophy of Empathy' },
        // 👆 在此上方添加新文章，記得加逗號！
];

    const lessons = [];

    for (const fileInfo of potentialFiles) {
        // ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ´ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ©ÃÂÃÂ§ÃÂÃÂ¨ÃÂÃÂ®ÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ­ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ²ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ¶
        let filename, specifiedDate = null, specifiedTitle = null, specifiedEmoji = null, isHoliday = false;
        
        if (typeof fileInfo === 'string') {
            filename = fileInfo;
        } else {
            filename = fileInfo.filename;
            specifiedDate = fileInfo.date;
            specifiedTitle = fileInfo.title;
            isHoliday = fileInfo.isHoliday || false;
            
            // ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ­ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ emoji
            if (specifiedTitle) {
                const emojiMatch = specifiedTitle.match(/[\p{Emoji}]/u);
                specifiedEmoji = emojiMatch ? emojiMatch[0] : '';
            }
        }

        // ÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¥ HTML ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ¶ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
        if (isHoliday) {
            const holidayData = createHolidayData(specifiedDate, specifiedTitle, specifiedEmoji);
            if (holidayData) {
                lessons.push(holidayData);
            }
            continue;
        }

        // ÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¬ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¥ HTML ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ¶ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
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
    
    // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ°ÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ§ÃÂÃÂÃÂÃÂº NEW
    if (allLessons.length > 0) {
        // ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ½ÃÂÃÂ®ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ§ÃÂÃÂÃÂÃÂ isNew ÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¨ÃÂÃÂ
        allLessons.forEach(lesson => {
            lesson.isNew = false;
        });
        // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ°ÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¬ÃÂÃÂ¬ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ§ÃÂÃÂ¯ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂº NEW
        allLessons[0].isNew = true;
    }
    
    filteredLessons = [...allLessons];

    console.log(`ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ Loaded ${allLessons.length} lessons`);
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
        emoji: emoji || 'ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ',
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

    // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ potentialFiles ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ­ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂ
    let titleText, emoji, cleanTitle;
    
    if (specifiedTitle) {
        // ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ potentialFiles ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂ­ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂ
        titleText = specifiedTitle;
        emoji = specifiedEmoji || '';
        cleanTitle = titleText.replace(/[\p{Emoji}]/gu, '').trim();
    } else {
        // ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂ HTML ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂfallbackÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
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

    // ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ©ÃÂÃÂ ÃÂÃÂÃÂÃÂ¥ÃÂÃÂºÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // 1. ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ®ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂspecifiedDateÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // 2. ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂ£ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂYYYY-MM-DD-slug.htmlÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // 3. ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂ HTML meta ÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ§ÃÂÃÂ±ÃÂÃÂ¤ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ©ÃÂÃÂ±ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // 4. ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¦ÃÂÃÂ¡ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¿ÃÂÃÂ®ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¹ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
    // 5. Fallback: ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¶ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
    let lessonDate;

    if (specifiedDate) {
        // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ®ÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
        const dateParts = specifiedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateParts) {
            lessonDate = new Date(dateParts[1], dateParts[2] - 1, dateParts[3]);
        } else {
            lessonDate = new Date(specifiedDate);
        }
    } else {
        // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ©ÃÂÃÂ¦ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ¦ÃÂÃÂªÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂ£ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¦ÃÂÃÂ ÃÂÃÂ¼ÃÂÃÂ¥ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂYYYY-MM-DD-slug.htmlÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂ
        const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (dateMatch) {
            lessonDate = new Date(dateMatch[1], dateMatch[2] - 1, dateMatch[3]);
        } else {
            // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ©ÃÂÃÂ¦ÃÂÃÂ¥ÃÂÃÂ¾ÃÂÃÂ HTML meta ÃÂÃÂ¦ÃÂÃÂ¨ÃÂÃÂÃÂÃÂ§ÃÂÃÂ±ÃÂÃÂ¤ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
            const metaDate = doc.querySelector('meta[name="date"], meta[property="article:published_time"]');
            if (metaDate) {
                const dateValue = metaDate.getAttribute('content');
                lessonDate = new Date(dateValue);
                if (isNaN(lessonDate.getTime())) {
                    lessonDate = new Date(); // ÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂ£ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¤ÃÂÃÂ±ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¶ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
                }
            } else {
                // Fallback: ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂ¿ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ§ÃÂÃÂÃÂÃÂ¶ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
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
                <p>ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ No lessons found</p>
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
                    <span class="month-header-arrow">${isCollapsed ? 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¶' : 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¼'}</span>
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
                    // ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¬ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ ÃÂÃÂ¥ÃÂÃÂÃÂÃÂªÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ©ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂ°ÃÂÃÂ©ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¤ÃÂÃÂºÃÂÃÂÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂ¯ÃÂÃÂ§ÃÂÃÂ¤ÃÂÃÂºÃÂÃÂ¯ÃÂÃÂ¼ÃÂÃÂÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¯ÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂ¡ÃÂÃÂ¯ÃÂÃÂ§ÃÂÃÂ¤ÃÂÃÂºÃÂÃÂ¥ÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¤ÃÂÃÂ»ÃÂÃÂ»ÃÂÃÂ¤ÃÂÃÂ½ÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ
                    if (!lesson.isHoliday && dayOfWeek >= 5) {
                        return; // ÃÂÃÂ¨ÃÂÃÂ·ÃÂÃÂ³ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ«ÃÂÃÂ§ÃÂÃÂÃÂÃÂÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂ¬ÃÂÃÂ¦ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂ«ÃÂÃÂ 
                    }
                    
                    const lessonClass = lesson.isHoliday ? 'day-lesson holiday' : 'day-lesson';
                    const fullTitle = lesson.emoji ? `${lesson.emoji} ${lesson.title}` : lesson.title;
                    // Full title will be displayed with multi-line truncation via CSS
                    
                    // ÃÂÃÂ¥ÃÂÃÂÃÂÃÂÃÂÃÂ¦ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ§ÃÂÃÂÃÂÃÂ¥ÃÂÃÂ¤ÃÂÃÂ¸ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂ¦ÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂ£ÃÂÃÂ§ÃÂÃÂµÃÂÃÂ
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
    arrow.textContent = monthCalendar.classList.contains('collapsed') ? 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¶' : 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ¼';
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
    backToTopBtn.innerHTML = 'ÃÂÃÂ¢ÃÂÃÂÃÂÃÂ';
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

