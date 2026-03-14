Update the existing Thinkora platform with the following logic and UI modifications for the Teacher Analytics section and the Student progression system. Do not redesign the application. Extend the current design system and keep the existing layout and components.

Thinkora is an AI-powered education platform with Teacher and Student roles. The system analyzes student work, tracks concept mastery, and structures learning using three knowledge levels.

Apply the following updates.

---

ANALYTICS ACCESS CONTROL

The Analytics page must not display any analytics data unless BOTH of the following are selected:

• A Class
• A Course

Add the following behavior:

If no class or course is selected:
Display an empty analytics state with a message:

"Select a class and a course to view analytics."

UI requirements:

Two dropdown selectors at the top of the page:

Dropdown 1: Select Class
Dropdown 2: Select Course

Analytics components (Radar Chart, student performance data, etc.) must only appear after both selections are made.

---

ANALYTICS VIEW MODES

Add two analytics viewing modes:

1. Class View
2. Student View

This should be implemented as a toggle or segmented control.

---

CLASS VIEW

In Class View, display:

• Radar chart for the selected course
• Class Average
• Best Student
• Worst Student
• Distribution of student mastery across competencies

This view shows the overall class performance for the selected course.

---

STUDENT VIEW

When switching to Student View:

A third selector must appear:

Dropdown 3: Select Student

Once a student is selected, display:

• The student's radar chart for the selected course
• Their mastery scores across competencies
• Their learning progression across levels
• Their preferred learning methods

---

STUDENT LEARNING METHOD ANALYTICS

In Student View, display the student's learning preferences that were defined in their profile.

This includes:

Favorite Learning Channels:
• Text
• Video
• Audio
• Images

Hobbies used by the AI for explanations.

Display this in a card called:

"Student Learning Preferences"

This helps teachers understand how the student learns best.

---

STUDENT LEVEL PROGRESSION RULE

Students progress through three levels in a course:

Level 1 – Fundamental
Level 2 – Advanced
Level 3 – Expert

Each level contains several competencies.

A student can only visually progress to the next level when ALL competencies of the current level are mastered.

Progression rules:

If all Level 1 competencies are mastered → Level 2 unlocks
If all Level 2 competencies are mastered → Level 3 unlocks

---

STUDENT PROGRESSION VISUALIZATION

Display a progression visualization for the student.

Structure:

Level 1 → Level 2 → Level 3

Each level contains competency nodes.

Competency states:

• mastered (green)
• in progress (yellow)
• not mastered (gray)

Locked levels should appear visually locked until the previous level is fully completed.

Example:

Level 2 is locked until Level 1 competencies are all mastered.

---

UI COMPONENTS TO ADD

Add the following UI components:

• Empty analytics state when class/course not selected
• Class/Course dropdown selectors
• View toggle (Class View / Student View)
• Student selector dropdown
• Student Learning Preferences card
• Level progression visualization with locked states

---

DESIGN REQUIREMENTS

Keep the existing Thinkora design system:

Modern SaaS dashboard
Indigo primary color
Rounded cards
Clean EdTech interface

Ensure the analytics page remains clean and easy to read while supporting both class-level and student-level analysis.

---

GOAL

These updates ensure that:

• Analytics only appear when relevant data is selected
• Teachers can analyze both the class and individual students
• Student learning preferences are visible to teachers
• Student progression is clearly structured and locked by level completion
