Update the existing Thinkora educational platform with the following feature improvements and UX modifications. Do NOT redesign the whole application. Extend the current structure while keeping the same design system and architecture.

Thinkora is an AI-powered educational platform with two roles: Teacher and Student.
The system tracks concept mastery, analyzes student work with AI, and adapts learning.

Apply the following modifications.

---

COURSE CREATION – KNOWLEDGE LEVEL STRUCTURE

When a teacher creates a course and uploads course materials, the AI must analyze the documents and extract **three levels of knowledge for the chapter**.

Level 1 – Fundamental Knowledge
These are the minimum required concepts that students must understand.

Level 2 – Advanced Knowledge
These concepts require deeper reasoning and application.

Level 3 – Expert Knowledge
These represent the highest level expected for this academic level.

Each level must contain several **skills/competencies**.

Example structure:

Level 1 – Fundamentals
• Understand basic functions
• Interpret simple graphs
• Solve linear equations

Level 2 – Advanced
• Analyze function behavior
• Combine multiple equations
• Interpret complex graphs

Level 3 – Expert
• Model real-world problems with functions
• Optimize equations
• Explain mathematical reasoning

After AI extraction:

Display the three levels in the course creation interface.

Each competency must be editable by the teacher:

* Add competency
* Edit competency
* Remove competency

Use a UI with three clear sections or cards:

Level 1 – Fundamental
Level 2 – Advanced
Level 3 – Expert

Each competency should appear as an editable tag or list item.

---

COURSE ANALYSIS – STUDENT MASTERY VIEW

When a teacher analyzes a course, they must be able to see:

• The level reached by each student
• Which competencies are mastered or not mastered

The analysis must be organized by levels.

Example student progression:

Student A
Level 1: 4 / 5 competencies mastered
Level 2: 2 / 4 competencies mastered
Level 3: 0 / 3 competencies mastered

---

TIMELINE / PROGRESSION VISUALIZATION

Add a **special visualization** showing the student's learning progression across levels.

Suggested visualization:

A horizontal learning progression timeline.

Structure:

Level 1 → Level 2 → Level 3

Each level contains competency nodes.

Visual states for competencies:

• mastered (green)
• in progress (yellow)
• not mastered (gray)

This timeline allows teachers to quickly see:

* which level the student has reached
* which competencies are blocking progression

Allow switching between students to see their progression.

---

ANALYTICS PAGE MODIFICATION

Currently the Radar Chart analytics is based on a class only.

Modify the analytics logic so that **the radar chart is tied to a specific course**, not only a class.

New analytics flow:

1. Teacher selects a Class
2. Teacher selects a Course within that class
3. Analytics are generated for that course

---

RADAR CHART DATA

The radar chart should represent **course competencies or key concepts**.

Datasets displayed:

• Class Average
• Selected Student
• Best Student
• Worst Student

Each axis corresponds to a concept or competency from the course.

---

UI REQUIREMENTS

Update the Analytics interface with:

Dropdown 1:
Select Class

Dropdown 2:
Select Course

Once both are selected:
Display the radar chart and course analytics.

---

DESIGN REQUIREMENTS

Keep the Thinkora design system:

Modern SaaS dashboard
Indigo primary color
Rounded cards
Clean EdTech interface

Add the following new UI components:

• Level-based competency editor
• Student mastery timeline visualization
• Course selector in analytics
• Competency mastery indicators

---

GOAL

These updates should allow teachers to:

• define structured knowledge levels for a course
• track student mastery per competency
• visualize student progression across levels
• analyze performance per course instead of only per class
