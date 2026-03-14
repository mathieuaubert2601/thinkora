Update the existing Thinkora educational platform UI and product design with the following improvements and new features. Do NOT redesign from scratch; extend the current design and keep the same design system.

Thinkora is an AI-powered educational platform with two roles:
Teacher and Student.

The platform uses AI to analyze student work, provide personalized explanations, and track concept mastery.

Apply the following feature updates.

------------------------------------------------

STUDENT FEATURES

1. Student Profile Settings Improvements

Add a "Learning Preferences" section in the student account settings.

This section must allow the student to configure:

Hobbies:
Students can select multiple hobbies that the AI will use in explanations and examples.
Examples:
- Video games
- Football
- Music
- Drawing
- Technology
- Space
- History

Purpose:
The AI should use these hobbies to create engaging explanations and analogies.

Example:
Explaining math concepts using video games mechanics.

------------------------------------------------

2. Learning Channel Preferences

Students must be able to choose their preferred learning formats:

Learning Channels:
- Text explanations
- Video explanations
- Audio explanations
- Image/visual explanations

These preferences will guide the AI when generating:
- explanations
- exercises
- study material
- tailored learning tasks

UI requirement:
Use selectable cards or toggle chips for each learning format.

------------------------------------------------

3. Homework Submission Improvements

Students must have two options when submitting homework:

Option 1:
Write their answer directly in a rich text editor.

Option 2:
Upload a document or image of their handwritten work.

Accepted formats:
- image
- PDF
- document

Important grading rule:
The AI must evaluate:
- reasoning
- method used
- explanation quality

NOT only the final answer.

The UI should clearly communicate that:
"A correct answer alone does not guarantee a perfect grade. The reasoning and method are essential."

------------------------------------------------

TEACHER FEATURES

4. Preferred Learning Sources

Teachers should be able to define preferred educational sources that the AI should prioritize when generating:

- explanations
- exercises
- study material

Example sources:
- textbooks
- academic websites
- curriculum documents
- teacher uploaded files

UI:
Add a "Preferred Sources" section when creating or editing a course.

------------------------------------------------

5. Course Must Be Assigned to a Class

When creating a course:
A teacher must assign the course to a class.

Update the course creation flow to include:

Select Class → Then create Course → Then upload materials.

------------------------------------------------

6. Knowledge Level Classification During Course Creation

When AI analyzes uploaded course documents, it must categorize concepts into three levels:

Level 1:
Minimum knowledge required for the chapter.

Level 2:
Intermediate or advanced knowledge.

Level 3:
Highly advanced knowledge for the student’s academic level.

UI Requirements:

After AI analysis display concepts grouped by:

Level 1 – Fundamental Concepts  
Level 2 – Advanced Concepts  
Level 3 – Expert Concepts

Each concept should appear as a tag.

------------------------------------------------

7. AI Grading Strictness Control

Teachers must be able to control how strict the AI grading is.

Add a grading strictness slider when creating or editing a course.

Values:
- Lenient
- Balanced
- Strict

This parameter will influence:
grading severity and feedback strictness.

------------------------------------------------

ANALYTICS IMPROVEMENTS

8. Advanced Radar Chart

The Radar Chart in the Analytics section must now show four layers:

Class Average  
Selected Student  
Best Student in the Class  
Worst Student in the Class

Purpose:
Allow teachers to understand the full distribution of mastery across concepts.

Visualization requirements:

Different colors for each layer
Interactive legend
Toggle visibility for each dataset.

------------------------------------------------

DESIGN REQUIREMENTS

Keep the existing Thinkora design system:

Modern SaaS dashboard
Indigo primary color
Rounded cards
Clean EdTech aesthetic

New components needed:

Learning Preferences selector
Learning format selector
Rich text homework editor
Upload area for handwritten work
AI strictness slider
Advanced radar chart legend
Concept level tags

------------------------------------------------

OUTPUT REQUIREMENTS

Update the existing pages and components:

Student Settings Page
Homework Submission Page
Teacher Course Creation Page
Analytics Dashboard

Add new UI components where needed.

Ensure the flows for both Teacher and Student remain intuitive and easy to use.