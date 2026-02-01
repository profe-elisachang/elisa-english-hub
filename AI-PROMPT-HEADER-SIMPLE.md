# Header Template for Articles

## 必須包含的 Header（在 <body> 開頭）

```html
<header class="header">
    <div class="header-content">
        <h1>📚 English Conversation with Elisa</h1>
        <span class="level-badge">Intermediate Level</span>  <!-- Intermediate 或 Advanced -->
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
```

## 關鍵規則

1. **必須引用主站 CSS**：
   - Intermediate: `<link rel="stylesheet" href="../style-intermediate.css">`
   - Advanced: `<link rel="stylesheet" href="../style-advanced.css">`

2. **Header 結構不可修改**：保持 class 名稱和 HTML 結構完全一致

3. **路徑正確**：
   - CSS: `../style-intermediate.css` 或 `../style-advanced.css`
   - Home 連結: `../index.html`（Intermediate）或 `../index-advanced.html`（Advanced）

4. **文章內容可自由設計**：樣式、顏色、佈局都可以變化，保持專業即可

## 完整結構範例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[文章標題] - English Conversation with Elisa</title>
    <link rel="stylesheet" href="../style-intermediate.css">
    <style>
        /* 你的自定義樣式 */
    </style>
</head>
<body>
    <!-- Header 模板（必須包含） -->
    <header class="header">...</header>
    
    <!-- 你的文章內容 -->
    <div class="container">
        <main class="main-content">
            <h1>🧠 你的文章標題</h1>
            <!-- 文章內容 -->
        </main>
    </div>
</body>
</html>
```

