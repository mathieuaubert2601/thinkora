import { useState, useEffect } from "react";
import TeacherLayout from "../components/TeacherLayout";
import { CheckCircle, Circle, Clock, Award, Sparkles, Loader2, FileText, AlertCircle } from "lucide-react";
import { extractCourseCompetencies } from "../../lib/gemini";

type CompetencyStatus = {
  id: string;
  text: string;
  status: "mastered" | "in-progress" | "not-mastered";
};

type LevelData = {
  mastered: number;
  total: number;
  competencies: CompetencyStatus[];
};

type StudentProgress = {
  id: number;
  name: string;
  level1: LevelData;
  level2: LevelData;
  level3: LevelData;
};

export default function CourseAnalysis() {
  const [selectedStudent, setSelectedStudent] = useState<number>(1);
  const [isAuditing, setIsAuditing] = useState(false);
  const [syllabusText, setSyllabusText] = useState("Enter course syllabus here to generate learning path...");
  const [courseTitle, setCourseTitle] = useState("Algebra Fundamentals");

  // Initialize with the hardcoded data as a starting point
  const [studentsProgress, setStudentsProgress] = useState<StudentProgress[]>([
    {
      id: 1,
      name: "Emma Johnson",
      level1: {
        mastered: 4,
        total: 5,
        competencies: [
          { id: "1-1", text: "Understand basic functions", status: "mastered" },
          { id: "1-2", text: "Interpret simple graphs", status: "mastered" },
          { id: "1-3", text: "Solve linear equations", status: "in-progress" },
          { id: "1-4", text: "Identify function types", status: "mastered" },
          { id: "1-5", text: "Apply order of operations", status: "mastered" },
        ],
      },
      level2: {
        mastered: 2,
        total: 4,
        competencies: [
          { id: "2-1", text: "Analyze function behavior", status: "mastered" },
          { id: "2-2", text: "Combine multiple equations", status: "in-progress" },
          { id: "2-3", text: "Interpret complex graphs", status: "mastered" },
          { id: "2-4", text: "Apply transformations to functions", status: "not-mastered" },
        ],
      },
      level3: {
        mastered: 0,
        total: 3,
        competencies: [
          { id: "3-1", text: "Model real-world problems with functions", status: "not-mastered" },
          { id: "3-2", text: "Optimize equations", status: "not-mastered" },
          { id: "3-3", text: "Explain mathematical reasoning", status: "not-mastered" },
        ],
      },
    },
    {
      id: 2,
      name: "Liam Smith",
      level1: {
        mastered: 5,
        total: 5,
        competencies: [
          { id: "1-1", text: "Understand basic functions", status: "mastered" },
          { id: "1-2", text: "Interpret simple graphs", status: "mastered" },
          { id: "1-3", text: "Solve linear equations", status: "mastered" },
          { id: "1-4", text: "Identify function types", status: "mastered" },
          { id: "1-5", text: "Apply order of operations", status: "mastered" },
        ],
      },
      level2: {
        mastered: 3,
        total: 4,
        competencies: [
          { id: "2-1", text: "Analyze function behavior", status: "mastered" },
          { id: "2-2", text: "Combine multiple equations", status: "mastered" },
          { id: "2-3", text: "Interpret complex graphs", status: "mastered" },
          { id: "2-4", text: "Apply transformations to functions", status: "in-progress" },
        ],
      },
      level3: {
        mastered: 1,
        total: 3,
        competencies: [
          { id: "3-1", text: "Model real-world problems with functions", status: "mastered" },
          { id: "3-2", text: "Optimize equations", status: "in-progress" },
          { id: "3-3", text: "Explain mathematical reasoning", status: "not-mastered" },
        ],
      },
    },
  ]);

  const handleSyllabusAudit = async () => {
    setIsAuditing(true);
    try {
      const structure = await extractCourseCompetencies(courseTitle, syllabusText);
      // For this demo, we apply the new structure to all students but reset their progress
      const updatedStudents = studentsProgress.map(s => ({
        ...s,
        ...structure
      }));
      setStudentsProgress(updatedStudents);
    } catch (e) {
      console.error("Audit failed", e);
      alert("Failed to audit syllabus. Please try again.");
    } finally {
      setIsAuditing(false);
    }
  };

  const currentStudent = studentsProgress.find((s) => s.id === selectedStudent)!;

  const getStatusColor = (status: CompetencyStatus["status"]) => {
    switch (status) {
      case "mastered": return "text-secondary";
      case "in-progress": return "text-accent";
      case "not-mastered": return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "mastered": return "bg-secondary";
      case "in-progress": return "bg-accent";
      case "not-mastered": return "bg-muted-foreground/30";
      default: return "bg-muted";
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl mb-2">Course Analysis</h1>
            <p className="text-muted-foreground">
              Track student mastery progression across knowledge levels
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 px-4 py-2 rounded-xl flex items-center gap-2 border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{courseTitle}</span>
            </div>
          </div>
        </div>

        {/* AI Audit Section */}
        <div className="mb-8 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 bg-primary/5 border-b border-border flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-medium">AI Course Structuring (Syllabus Audit)</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm mb-2">Course Title</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Syllabus / Concept List</label>
                <textarea
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 h-24 text-sm"
                />
              </div>
            </div>
            <button
              onClick={handleSyllabusAudit}
              disabled={isAuditing}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Syllabus & Building Learning Path...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Audit Syllabus with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Student Selector */}
        <div className="mb-6 flex items-center gap-4">
          <div>
            <label className="block text-sm mb-2">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(Number(e.target.value))}
              className="px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {studentsProgress.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          {isAuditing && (
            <div className="flex items-center gap-2 text-primary animate-pulse mt-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Updating course structure...</span>
            </div>
          )}
        </div>

        {/* Timeline Progression Visualization */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-xl">Learning Progression Timeline</h2>
          </div>

          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-destructive opacity-20"></div>

            <div className="grid grid-cols-3 gap-8 relative">
              {/* Level 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${getStatusBg(currentStudent.level1.mastered === currentStudent.level1.total ? "mastered" : "in-progress")} flex items-center justify-center shadow-lg relative z-10 text-white text-sm`}>1</div>
                  <div>
                    <h3 className="text-secondary">Level 1</h3>
                    <p className="text-xs text-muted-foreground">Fundamental</p>
                  </div>
                </div>
                <div className="bg-secondary/5 border-2 border-secondary/20 rounded-xl p-4 min-h-[300px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{currentStudent.level1.mastered}/{currentStudent.level1.total}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 mb-4">
                    <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${(currentStudent.level1.mastered / currentStudent.level1.total) * 100}%` }} />
                  </div>
                  <div className="space-y-2">
                    {currentStudent.level1.competencies.map((comp) => (
                      <div key={comp.id} className="flex items-start gap-2 text-xs">
                        <div className={`mt-0.5 ${getStatusColor(comp.status)}`}>
                          {comp.status === "mastered" ? <CheckCircle className="w-4 h-4" /> : comp.status === "in-progress" ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <span className={getStatusColor(comp.status)}>{comp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${getStatusBg(currentStudent.level2.mastered === currentStudent.level2.total ? "mastered" : (currentStudent.level2.mastered > 0 ? "in-progress" : "not-mastered"))} flex items-center justify-center shadow-lg relative z-10 text-white text-sm`}>2</div>
                  <div>
                    <h3 className="text-accent">Level 2</h3>
                    <p className="text-xs text-muted-foreground">Advanced</p>
                  </div>
                </div>
                <div className="bg-accent/5 border-2 border-accent/20 rounded-xl p-4 min-h-[300px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{currentStudent.level2.mastered}/{currentStudent.level2.total}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 mb-4">
                    <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${(currentStudent.level2.mastered / currentStudent.level2.total) * 100}%` }} />
                  </div>
                  <div className="space-y-2">
                    {currentStudent.level2.competencies.map((comp) => (
                      <div key={comp.id} className="flex items-start gap-2 text-xs">
                        <div className={`mt-0.5 ${getStatusColor(comp.status)}`}>
                          {comp.status === "mastered" ? <CheckCircle className="w-4 h-4" /> : comp.status === "in-progress" ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <span className={getStatusColor(comp.status)}>{comp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${getStatusBg(currentStudent.level3.mastered === currentStudent.level3.total ? "mastered" : (currentStudent.level3.mastered > 0 ? "in-progress" : "not-mastered"))} flex items-center justify-center shadow-lg relative z-10 text-white text-sm`}>3</div>
                  <div>
                    <h3 className="text-destructive">Level 3</h3>
                    <p className="text-xs text-muted-foreground">Expert</p>
                  </div>
                </div>
                <div className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-4 min-h-[300px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{currentStudent.level3.mastered}/{currentStudent.level3.total}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 mb-4">
                    <div className="bg-destructive h-2 rounded-full transition-all" style={{ width: `${(currentStudent.level3.mastered / currentStudent.level3.total) * 100}%` }} />
                  </div>
                  <div className="space-y-2">
                    {currentStudent.level3.competencies.map((comp) => (
                      <div key={comp.id} className="flex items-start gap-2 text-xs">
                        <div className={`mt-0.5 ${getStatusColor(comp.status)}`}>
                          {comp.status === "mastered" ? <CheckCircle className="w-4 h-4" /> : comp.status === "in-progress" ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <span className={getStatusColor(comp.status)}>{comp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">Mastered</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Not Mastered</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Level 1 Mastery</h3>
            <p className="text-3xl mb-1">{Math.round((currentStudent.level1.mastered / currentStudent.level1.total) * 100)}%</p>
            <p className="text-sm text-muted-foreground">{currentStudent.level1.mastered} of {currentStudent.level1.total} competencies</p>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Level 2 Mastery</h3>
            <p className="text-3xl mb-1">{Math.round((currentStudent.level2.mastered / currentStudent.level2.total) * 100)}%</p>
            <p className="text-sm text-muted-foreground">{currentStudent.level2.mastered} of {currentStudent.level2.total} competencies</p>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Level 3 Mastery</h3>
            <p className="text-3xl mb-1">{Math.round((currentStudent.level3.mastered / currentStudent.level3.total) * 100)}%</p>
            <p className="text-sm text-muted-foreground">{currentStudent.level3.mastered} of {currentStudent.level3.total} competencies</p>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
