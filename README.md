# ⏱️ Timer App

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b022f9b-9a8e-4f1e-9e8a-5b0b0b5b0b0b/deploy-status)](https://roaring-lokum-5140e7.netlify.app/)
![GitHub last commit](https://img.shields.io/github/last-commit/Akshy18/timer-app)

A feature-rich React timer application for creating and managing customizable timers with category organization, progress visualization, and history tracking.

🔗 **Live Demo**: [https://roaring-lokum-5140e7.netlify.app/](https://roaring-lokum-5140e7.netlify.app/)

## ✨ Features

- 🕒 **Create Timers**: Add timers with names, durations (up to 24 hours), and categories.
- 📁 **Category Management**: Group timers in collapsible categories, with defaults ("Workout", "Study", "Break") and custom options.
- ⚡ **Bulk Actions**: Start, pause, or reset all timers in a category via a dropdown menu.
- 📊 **Progress Visualization**: Display progress bars and a "Focus Mode" for distraction-free timer viewing.
- 🕰️ **Completion History**: Log completed timers with timestamps and deletion options.
- 🗑️ **Delete Options**: Remove individual timers or entire categories.
- 💾 **Data Persistence**: Store timers, categories, and history in localStorage.

## 📸 Screenshots

*(Add screenshots of the app here to showcase the UI, e.g., timer list, focus mode, history view.)*

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or Yarn

### Installation

```bash
git clone https://github.com/Akshy18/timer-app.git
cd timer-app
npm install
npm start

🛠️ Technical Details
Persistence: Uses localStorage to save timers, categories, and history (5MB limit).
State Management: Employs useState for lightweight state handling.
Styling: Leverages Tailwind CSS for responsive, modern UI design.
Timer Logic: Implements countdowns with JavaScript’s setInterval.
📝 Development Assumptions
The following assumptions were made to guide implementation and address assignment requirements:

Persistence with localStorage: Used localStorage for data storage, as it suits web apps and minimizes dependencies (5MB limit sufficient).
State Management with useState: Opted for useState over Redux to keep the app lightweight, accepting minor prop drilling trade-offs.
Styling with Tailwind CSS: Chose Tailwind CSS for rapid, responsive styling, reducing custom CSS needs.
Timer Duration Constraints: Limited timers to 24 hours and formatted durations >60 seconds as HH:MM:SS for practicality and readability.
Category Management Enhancements: Included default categories ("Workout", "Study", "Break") and custom category creation for flexibility.
Bulk Actions UI: Implemented bulk actions via a dropdown menu to streamline the UI and reduce clutter.
Focus Mode Addition: Added a "Focus Mode" to highlight a single timer, enhancing usability for crowded lists.
History Log Enhancements: Enabled manual deletion of history logs and included timestamps for better tracking.
Custom Alerts Behavior: Auto-dismissed 50% completion alerts upon timer completion to avoid redundant notifications.
Single-Page Navigation: Used a single-page layout instead of separate pages, aligning with web app UX patterns.
Omitted Bonus Features: Skipped bonus features (e.g., data export, themes, filtering) to focus on core functionality within the 5-6 hour timeframe.
🤝 Contributing
Contributions are welcome! To get started:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
Please ensure tests pass and follow standard contribution guidelines.

🐛 Troubleshooting
App not loading: Verify Node.js and npm/Yarn are installed, and run npm install again.
Timers not saving: Check browser localStorage limits (clear via dev tools if needed).
CORS errors: Ensure the app runs locally or via the Netlify demo.
For other issues, open a GitHub Issue.

📬 Contact
For questions or feedback, reach out via GitHub Issues.

📜 License
This project is licensed under the MIT License. See the  file for details.