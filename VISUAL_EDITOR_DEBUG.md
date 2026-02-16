# 視覺化編輯器除錯指南

## 已修復的問題 (2026/2/15)

### 1. ✅ 拖拽手柄不顯示
**原因**: 容器的 `position: relative` 設置不完整  
**修復**: 
- 改進容器創建邏輯，確保 `position: relative` 正確設置
- 在 `showResizeControls()` 中明確設置容器定位

### 2. ✅ 草稿彈窗循環
**原因**: 每次頁面互動都會觸發草稿檢查  
**修復**:
- 添加 `draftPromptShown` 標誌，防止重複彈窗
- 用戶選擇「不載入」時，自動清除草稿
- 發布文章成功後，自動清除草稿

### 3. ⚠️ GitHub 上傳轉圈圈
**可能原因**:
1. GitHub Token 未設置或過期
2. 網絡連接問題
3. API 請求限制

**檢查步驟**:
```javascript
// 在瀏覽器 Console (F12) 中執行：
localStorage.getItem('github_token')
// 應該看到你的 Token，如果是 null，請重新設置

localStorage.getItem('github_username')
// 應該看到你的 GitHub 用戶名

localStorage.getItem('github_repo')
// 應該看到 'elisa-english-hub'
```

**重新設置 GitHub Token**:
```javascript
localStorage.setItem('github_token', 'ghp_你的Token');
localStorage.setItem('github_username', '你的GitHub用戶名');
localStorage.setItem('github_repo', 'elisa-english-hub');
localStorage.setItem('github_branch', 'main');
```

---

## 測試步驟

### 測試 1: 插入圖片
1. 打開 `admin-intermediate.html` 或 `admin-advanced.html`
2. 點擊「➕ 新增文章」
3. 點擊「👁️ 視覺化編輯」
4. 點擊「📷 插入圖片」
5. 輸入圖片 URL（測試用）:
   ```
   https://picsum.photos/400/300
   ```
6. 輸入 Alt 文字: `測試圖片`
7. ✅ 圖片應該出現在編輯器中

### 測試 2: 點擊圖片查看控制面板
1. 點擊剛插入的圖片
2. ✅ 應該看到：
   - 綠色邊框
   - 右下角綠色拖拽手柄（圓點）
   - 上方布局控制面板（併排、文繞圖左、文繞圖右、全寬、刪除）

### 測試 3: 拖拽調整大小
1. 將滑鼠移到右下角綠色圓點
2. 按住滑鼠左鍵，向左或向右拖動
3. ✅ 圖片寬度應該即時改變

### 測試 4: 切換布局模式
1. 點擊「文繞圖左」按鈕
2. ✅ 圖片應該靠左，文字在右側環繞
3. 點擊「文繞圖右」按鈕
4. ✅ 圖片應該靠右，文字在左側環繞
5. 點擊「併排」按鈕
6. ✅ 圖片應該變成 inline-block（可與其他圖片併排）
7. 點擊「全寬」按鈕
8. ✅ 圖片應該恢復為全寬顯示（block）

### 測試 5: 多張圖片併排
1. 插入第一張圖片，點擊選擇，點擊「併排」
2. 插入第二張圖片，點擊選擇，點擊「併排」
3. 插入第三張圖片，點擊選擇，點擊「併排」
4. ✅ 三張圖片應該在同一行併排顯示（如果寬度允許）

### 測試 6: 草稿功能
1. 新增文章，填寫標題、日期、檔名
2. 插入一些內容
3. 點擊「💾 儲存草稿」
4. ✅ 應該看到「草稿已儲存」提示
5. 重新整理頁面
6. ✅ 應該看到「找到草稿，要載入嗎？」彈窗（只出現一次）
7. 點擊「確定」載入草稿
8. ✅ 之前的內容應該恢復

### 測試 7: 草稿清除
1. 載入草稿後，填寫完整資訊
2. 點擊「✅ 發布文章」
3. ✅ 成功發布後，草稿應該自動清除
4. 重新整理頁面
5. ✅ 不應該再看到「找到草稿」彈窗

---

## 如何排查 GitHub 上傳問題

### 方法 1: 檢查 Console 錯誤
1. 按 F12 打開開發者工具
2. 切換到 Console 標籤
3. 點擊「✅ 發布文章」
4. 查看是否有紅色錯誤訊息

**常見錯誤**:
- `401 Unauthorized`: Token 無效或過期
- `404 Not Found`: Repository 或 Branch 名稱錯誤
- `403 Forbidden`: Token 權限不足（需要 repo 和 workflow 權限）
- `Network Error`: 網絡連接問題

### 方法 2: 檢查 Network 請求
1. 按 F12 打開開發者工具
2. 切換到 Network 標籤
3. 過濾：XHR
4. 點擊「✅ 發布文章」
5. 查看 `api.github.com` 的請求
6. 點擊查看 Response

### 方法 3: 手動測試 GitHub API
在 Console 中執行：
```javascript
const token = localStorage.getItem('github_token');
const username = localStorage.getItem('github_username');

fetch(`https://api.github.com/user`, {
    headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    }
})
.then(res => res.json())
.then(data => console.log('GitHub API 測試結果:', data))
.catch(err => console.error('GitHub API 測試失敗:', err));
```

如果成功，應該看到你的 GitHub 用戶資料。  
如果失敗，請重新生成 Token。

---

## 重新生成 GitHub Token

1. 訪問: https://github.com/settings/tokens
2. 點擊「Generate new token」→「Generate new token (classic)」
3. Note: `elisa-english-hub-admin`
4. Expiration: 選擇「No expiration」或你偏好的期限
5. 勾選權限:
   - ✅ `repo` (全選)
   - ✅ `workflow`
6. 點擊「Generate token」
7. **立即複製 Token**（離開頁面後無法再看到）
8. 在 admin 頁面的 Console 中執行:
   ```javascript
   localStorage.setItem('github_token', 'ghp_你的新Token');
   ```
9. 重新整理頁面

---

## 技術細節

### 圖片控制系統
- **容器**: `.resize-container` - `position: relative`
- **拖拽手柄**: `.resize-handle` - `position: absolute`，右下角 (-12px, -12px)
- **布局面板**: `.layout-control-panel` - `position: absolute`，上方中央

### 布局模式
1. **全寬 (full-width)**: `display: block; width: 100%;`
2. **併排 (inline)**: `display: inline-block; vertical-align: top; margin: 0.5rem;`
3. **文繞圖左 (float-left)**: `float: left; margin: 0 1rem 1rem 0;`
4. **文繞圖右 (float-right)**: `float: right; margin: 0 0 1rem 1rem;`

### 事件綁定
- 圖片設置 `contentEditable="false"` 和 `draggable="false"`，防止干擾
- 點擊事件使用 `e.stopPropagation()` 和 `e.preventDefault()`
- 拖拽調整使用 `mousedown` → `mousemove` → `mouseup` 事件鏈

---

## 如果問題仍然存在

請提供以下資訊：
1. 瀏覽器版本（Chrome/Edge/Firefox 等）
2. Console 中的錯誤訊息（F12 → Console）
3. Network 請求的 Response（F12 → Network → XHR）
4. 具體操作步驟和預期 vs 實際結果

---

最後更新: 2026/2/15
版本: v2.3

