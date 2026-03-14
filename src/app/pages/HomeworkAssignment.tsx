import { useState } from "react";
import TeacherLayout from "../components/TeacherLayout";
import { Upload, Calendar, Users, User, BookOpen, Sparkles } from "lucide-react";

type AssignmentType = "class" | "student";

export default function HomeworkAssignment() {
  const [assignmentType, setAssignmentType] = useState<AssignmentType>("class");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [aiInstructions, setAiInstructions] = useState("");

  const classes = [
    { id: 1, name: "Mathematics 101 - Section A" },
    { id: 2, name: "Physics Advanced" },
    { id: 3, name: "Chemistry Basics" },
  ];

  const courses = [
    { id: 1, classId: 1, name: "Algebra Fundamentals" },
    { id: 2, classId: 1, name: "Geometry Basics" },
    { id: 3, classId: 2, name: "Classical Mechanics" },
    { id: 4, classId: 3, name: "Organic Chemistry" },
  ];

  const chapters = [
    { id: 1, courseId: 1, name: "Linear Equations" },
    { id: 2, courseId: 1, name: "Quadratic Functions" },
    { id: 3, courseId: 1, name: "Polynomials" },
    { id: 4, courseId: 2, name: "Triangles" },
    { id: 5, courseId: 3, name: "Newton's Laws" },
  ];

  const students = [
    { id: 1, name: "Emma Johnson", classId: 1 },
    { id: 2, name: "Liam Smith", classId: 1 },
    { id: 3, name: "Sophia Davis", classId: 1 },
    { id: 4, name: "Noah Wilson", classId: 2 },
  ];

  const filteredCourses = selectedClass
    ? courses.filter((c) => c.classId === Number(selectedClass))
    : [];

  const filteredChapters = selectedCourse
    ? chapters.filter((ch) => ch.courseId === Number(selectedCourse))
    : [];

  const filteredStudents = selectedClass
    ? students.filter((s) => s.classId === Number(selectedClass))
    : [];

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Create Homework Assignment</h1>
          <p className="text-muted-foreground">Assign homework to your classes or individual students</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
          {/* Assignment Type Selector */}
          <div>
            <label className="block mb-3">Assign to</label>
            <div className="flex bg-muted rounded-xl p-1">
              <button
                type="button"
                onClick={() => setAssignmentType("class")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  assignmentType === "class"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Entire Class</span>
              </button>
              <button
                type="button"
                onClick={() => setAssignmentType("student")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  assignmentType === "student"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Individual Student</span>
              </button>
            </div>
          </div>

          {/* Homework Title */}
          <div>
            <label className="block mb-2">Homework Title</label>
            <input
              type="text"
              placeholder="e.g., Week 3: Quadratic Equations Practice"
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              rows={5}
              placeholder="Describe the homework assignment, expectations, and any special instructions..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block mb-2">Select Class</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedCourse("");
                  setSelectedChapter("");
                }}
              >
                <option value="">Select a class...</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block mb-2">Select Course</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedChapter("");
                }}
                disabled={!selectedClass}
              >
                <option value="">Select a course...</option>
                {filteredCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chapter Selection */}
          <div>
            <label className="block mb-2">Select Chapter</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">Select a chapter...</option>
              {filteredChapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-2">
              Competencies will be automatically extracted from the homework and linked to this chapter
            </p>
          </div>

          {/* Student Selection (only if individual student is selected) */}
          {assignmentType === "student" && (
            <div>
              <label className="block mb-2">Select Student</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                  disabled={!selectedClass}
                >
                  <option value="">Select a student...</option>
                  {filteredStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block mb-2">Assignment File</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="mb-1">
                    <span className="text-primary">Click to upload</span> assignment file
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOCX up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                  type="date"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">Due Time</label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Points */}
          <div>
            <label className="block mb-2">Points</label>
            <input
              type="number"
              placeholder="100"
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* AI Grading Instructions */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3 text-primary">
              <Sparkles className="w-5 h-5" />
              <label className="font-medium text-foreground">AI Grading Assistance (Optional)</label>
            </div>
            <textarea
              rows={4}
              value={aiInstructions}
              onChange={(e) => setAiInstructions(e.target.value)}
              placeholder="Provide specific guidelines, key points to look for, or common mistakes to penalize to help the AI grade this assignment more accurately..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              These instructions will be used as context for the AI when evaluating student submissions.
            </p>
          </div>

          {/* Additional Options */}
          <div className="space-y-3 pt-4 border-t border-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-sm">Allow late submissions</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
              <span className="text-sm">Enable AI auto-grading</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" defaultChecked />
              <span className="text-sm">Send notification to students</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors">
              Save as Draft
            </button>
            <button className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md">
              Assign Homework
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}