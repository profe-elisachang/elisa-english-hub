🏗️ Project Structure: Elisa's English Hub
This project is a decoupled educational web platform designed specifically for professional English learners in the automotive industry.

📁 File Directory
Plaintext

elisa-english-hub/
├── index.html                 # The "Main Terminal" (Shell of the website)
├── style-intermediate.css      # The "Stylist" (Nordic green palette & layout)
├── script.js                  # The "Brain" (Lesson database & auto-loader)
├── README.md                  # Project overview for external viewers
├── STRUCTURE.md               # Technical manual (This file)
└── intermediate/              # Content Folder (The Library)
    └── bubble-palace.html     # Individual lesson content (Clean HTML)
🛠️ System Components
1. The Shell (index.html)
Purpose: Provides the fixed navigation and content container.

Key IDs:

#sidebar: Houses the search bar and monthly navigation.

#mainContent: The dynamic area where lessons are injected.

2. The Stylist (style-intermediate.css)
Color Palette: Olive green (#6b8e23) and Sage green (#8ba888).

Container Control: Manages the .lesson-content-wrapper which automatically beautifies any HTML file loaded into the system.

Interactive Tooltip: Handles the .vocab-highlight hover effect for Spanish translations.

3. The Brain (script.js)
Lesson Array: Where all metadata (Date, Title, Filename) is stored.

Fetch Engine: Uses async/fetch to retrieve external .html files without refreshing the page.

Auto-Archive: Group lessons by month based on the date property in the array.

📝 Workflow for Adding New Lessons
Create Content: Create a new .html file in the intermediate/ folder. Use Clean HTML (only <div>, <h3>, <p>, etc., no <body> tags).

Register Lesson: Open script.js and add a new object to the lessons array:

JavaScript

{
    id: 'lesson-20260201',
    date: '2026-02-01',
    title: "New Topic Title",
    description: "Short summary for the card.",
    filename: 'intermediate/your-new-file.html'
}
Sync: Commit and Push to GitHub. The monthly navigation and the "Latest Lessons" section will update automatically.