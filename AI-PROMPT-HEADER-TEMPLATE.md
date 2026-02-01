# AI Prompt: Header Template Requirement (完整版)

> 💡 **提示**：日常使用請參考 `AI-PROMPT-HEADER-SIMPLE.md`（精簡版）

## 重要：所有生成的 HTML 文章必須包含此 Header 模板

當你為 Elisa English Hub 生成新的英語課程 HTML 文章時，**必須**在 HTML 的 `<body>` 標籤開頭包含以下 Header 模板。

---

## Header 模板代碼（必須包含）

### 對於 Intermediate 等級文章：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[文章標題] - English Conversation with Elisa</title>
    <!-- 必須引用主站 CSS -->
    <link rel="stylesheet" href="../style-intermediate.css">
    <!-- 以下是你的文章內容樣式（可以自由發揮） -->
    <style>
        /* 你的自定義樣式 */
    </style>
</head>
<body>
    <!-- ==================== -->
    <!-- HEADER 模板（必須包含） -->
    <!-- ==================== -->
    <header class="header">
        <div class="header-content">
            <h1>📚 English Conversation with Elisa</h1>
            <span class="level-badge">Intermediate Level</span>
            <div class="search-box">
                <a href="../index.html" class="back-to-calendar-btn" style="
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.25);
                    color: white;
                    text-decoration: none;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                ">Home</a>
            </div>
        </div>
    </header>

    <!-- ==================== -->
    <!-- 你的文章內容從這裡開始 -->
    <!-- ==================== -->
    <div class="container">
        <main class="main-content">
            <!-- 你的文章內容 -->
        </main>
    </div>
</body>
</html>
```

### 對於 Advanced 等級文章：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[文章標題] - English Conversation with Elisa</title>
    <!-- 必須引用主站 CSS -->
    <link rel="stylesheet" href="../style-advanced.css">
    <!-- 以下是你的文章內容樣式（可以自由發揮） -->
    <style>
        /* 你的自定義樣式 */
    </style>
</head>
<body>
    <!-- ==================== -->
    <!-- HEADER 模板（必須包含） -->
    <!-- ==================== -->
    <header class="header">
        <div class="header-content">
            <h1>📚 English Conversation with Elisa</h1>
            <span class="level-badge">Advanced Level</span>
            <div class="search-box">
                <a href="../index-advanced.html" class="back-to-calendar-btn" style="
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(255, 255, 255, 0.25);
                    color: white;
                    text-decoration: none;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                ">Home</a>
            </div>
        </div>
    </header>

    <!-- ==================== -->
    <!-- 你的文章內容從這裡開始 -->
    <!-- ==================== -->
    <div class="container">
        <main class="main-content">
            <!-- 你的文章內容 -->
        </main>
    </div>
</body>
</html>
```

---

## 重要說明

### ✅ 必須遵守的規則：

1. **Header 必須完全按照模板**：不要修改 header 的 HTML 結構和 class 名稱
2. **必須引用主站 CSS**：
   - Intermediate 文章：`<link rel="stylesheet" href="../style-intermediate.css">`
   - Advanced 文章：`<link rel="stylesheet" href="../style-advanced.css">`
3. **路徑正確性**：
   - 文章在 `intermediate/` 或 `advanced/` 資料夾下
   - CSS 路徑使用 `../` 回到上一層
   - Home 連結：Intermediate 用 `../index.html`，Advanced 用 `../index-advanced.html`
4. **等級徽章**：
   - Intermediate 文章顯示 "Intermediate Level"
   - Advanced 文章顯示 "Advanced Level"

### 🎨 可以自由發揮的部分：

1. **文章內容區域的樣式**：顏色、佈局、設計都可以自由發揮
2. **表達框設計**：可以有不同的顏色和樣式
3. **詞彙高亮樣式**：可以使用不同的顏色和效果
4. **整體配色方案**：每篇文章可以有不同主題色
5. **視覺元素**：圖標、邊框、陰影等都可以變化

### 📝 生成流程：

1. 首先包含完整的 Header 模板（如上所示）
2. 然後引用主站 CSS（`../style-intermediate.css` 或 `../style-advanced.css`）
3. 在 `<style>` 標籤中添加你的自定義樣式（用於文章內容區域）
4. 在 `<main class="main-content">` 內放置你的文章內容

---

## 範例：完整的 HTML 結構

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Article Title - English Conversation with Elisa</title>
    
    <!-- 必須：引用主站 CSS -->
    <link rel="stylesheet" href="../style-intermediate.css">
    
    <!-- 可選：你的自定義樣式 -->
    <style>
        /* 你的文章內容樣式可以自由發揮 */
        .your-custom-class {
            /* 自定義樣式 */
        }
    </style>
</head>
<body>
    <!-- 必須：Header 模板 -->
    <header class="header">
        <div class="header-content">
            <h1>📚 English Conversation with Elisa</h1>
            <span class="level-badge">Intermediate Level</span>
            <div class="search-box">
                <a href="../index.html" class="back-to-calendar-btn" style="...">Home</a>
            </div>
        </div>
    </header>

    <!-- 你的文章內容 -->
    <div class="container">
        <main class="main-content">
            <h1>🧠 Your Article Title</h1>
            <!-- 文章內容 -->
        </main>
    </div>
</body>
</html>
```

---

## 檢查清單

生成 HTML 後，請確認：

- [ ] Header 模板已包含在 `<body>` 開頭
- [ ] 主站 CSS 已正確引用（路徑使用 `../`）
- [ ] 等級徽章顯示正確（Intermediate 或 Advanced）
- [ ] 「Home」連結路徑正確
- [ ] 文章內容放在 `<div class="container"><main class="main-content">` 內
- [ ] 文章內容的樣式可以自由發揮，保持專業即可

---

## 記住

- **Header 必須固定**：確保品牌一致性和導航功能
- **內容可以多樣**：保持視覺驚喜和專業感
- **路徑要正確**：確保 CSS 和連結都能正常工作

