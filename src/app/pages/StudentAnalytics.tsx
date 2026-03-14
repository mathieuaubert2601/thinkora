import { useState, useEffect } from "react";
import StudentLayout from "../components/StudentLayout";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { BookOpen, CheckCircle, Clock, Circle, Lock, Award, Target, Video, Headphones, FileText, Image as ImageIcon, Send, Sparkles, Loader2 } from "lucide-react";
import { generatePersonalizedTasks } from "../../lib/gemini";

type CompetencyStatus = {
  id: string;
  text: string;
  status: "mastered" | "in-progress" | "not-mastered";
};

type PersonalizedTask = {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  completed: boolean;
  hobbyContext?: string;
};

type Chapter = {
  id: number;
  name: string;
  description: string;
};

type Course = {
  id: number;
  name: string;
  chapters: Chapter[];
};

export default function StudentAnalytics() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<PersonalizedTask[]>([]);

  const courses: Course[] = [
    {
      id: 1,
      name: "Algebra Fundamentals",
      chapters: [
        { id: 1, name: "Linear Equations", description: "Understanding and solving linear equations" },
        { id: 2, name: "Quadratic Functions", description: "Working with quadratic equations and graphs" },
        { id: 3, name: "Polynomials", description: "Polynomial operations and factoring" },
      ],
    },
    {
      id: 2,
      name: "Geometry Basics",
      chapters: [
        { id: 1, name: "Shapes and Angles", description: "Properties of geometric shapes" },
        { id: 2, name: "Triangles", description: "Triangle properties and theorems" },
        { id: 3, name: "Circles", description: "Circle geometry and calculations" },
      ],
    },
  ];

  const selectedCourseObj = courses.find((c) => c.id === Number(selectedCourse));
  const selectedChapterObj = selectedCourseObj?.chapters.find((ch) => ch.id === Number(selectedChapter));

  // Student learning preferences
  const learningPreferences = {
    channels: ["Text", "Video"],
    hobbies: ["Reading", "Music"],
  };

  useEffect(() => {
    if (selectedChapter && selectedCourse) {
      loadAIData();
    }
  }, [selectedChapter, selectedCourse]);

  const loadAIData = async () => {
    setIsLoading(true);
    try {
      const generated = await generatePersonalizedTasks(learningPreferences.hobbies, [selectedChapterObj?.name || "math"]);
      setTasks(generated.map((t: any) => ({
        id: t.id.toString(),
        title: t.title,
        description: t.description,
        type: "text", // default
        difficulty: t.difficulty.toLowerCase(),
        completed: false,
        hobbyContext: t.hobby
      })));
    } catch (e) {
      console.error("AI load failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for student progression (remains for visualization structure)
  const studentProgress = {
    level1: {
      mastered: 4,
      total: 5,
      competencies: [
        { id: "1-1", text: "Understand basic linear equations", status: "mastered" as CompetencyStatus["status"] },
        { id: "1-2", text: "Solve one-variable equations", status: "mastered" as CompetencyStatus["status"] },
        { id: "1-3", text: "Graph simple linear functions", status: "in-progress" as CompetencyStatus["status"] },
        { id: "1-4", text: "Identify slope and intercept", status: "mastered" as CompetencyStatus["status"] },
        { id: "1-5", text: "Apply equations to real problems", status: "mastered" as CompetencyStatus["status"] },
      ],
    },
    level2: {
      mastered: 2,
      total: 4,
      competencies: [
        { id: "2-1", text: "Solve complex linear systems", status: "mastered" as CompetencyStatus["status"] },
        { id: "2-2", text: "Work with inequalities", status: "in-progress" as CompetencyStatus["status"] },
        { id: "2-3", text: "Apply linear programming", status: "mastered" as CompetencyStatus["status"] },
        { id: "2-4", text: "Interpret multiple representations", status: "not-mastered" as CompetencyStatus["status"] },
      ],
    },
    level3: {
      mastered: 0,
      total: 3,
      competencies: [
        { id: "3-1", text: "Model real-world scenarios with equations", status: "not-mastered" as CompetencyStatus["status"] },
        { id: "3-2", text: "Optimize solutions using linear methods", status: "not-mastered" as CompetencyStatus["status"] },
        { id: "3-3", text: "Explain mathematical reasoning clearly", status: "not-mastered" as CompetencyStatus["status"] },
      ],
    },
  };

  const conceptData = [
    { concept: "Basic Equations", student: 85, classAvg: 78 },
    { concept: "Graphing", student: 70, classAvg: 75 },
    { concept: "Slope", student: 88, classAvg: 80 },
    { concept: "Intercepts", student: 82, classAvg: 77 },
    { concept: "Applications", student: 75, classAvg: 82 },
  ];

  const isLevel1Complete = studentProgress.level1.mastered === studentProgress.level1.total;
  const isLevel2Complete = studentProgress.level2.mastered === studentProgress.level2.total;

  const getStatusColor = (status: CompetencyStatus["status"]) => {
    switch (status) {
      case "mastered": return "text-secondary";
      case "in-progress": return "text-accent";
      case "not-mastered": return "text-muted-foreground";
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "audio": return <Headphones className="w-4 h-4" />;
      case "image": return <ImageIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-700 border-blue-200";
      case "audio": return "bg-purple-100 text-purple-700 border-purple-200";
      case "image": return "bg-pink-100 text-pink-700 border-pink-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const showAnalytics = selectedCourse && selectedChapter;

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl mb-2">My Analytics</h1>
            <p className="text-muted-foreground">Track your progress and personalized learning journey</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">AI Insights Active</span>
          </div>
        </div>

        {/* Course and Chapter Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-2">Select Course</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedChapter("");
              }}
            >
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Select Chapter</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">Choose a chapter</option>
              {selectedCourseObj?.chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
              ))}
            </select>
          </div>
        </div>

        {!showAnalytics && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-16 text-center">
            <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2">Select Course and Chapter</h3>
            <p className="text-muted-foreground">Choose a course and chapter to view your personalized analytics and tasks.</p>
          </div>
        )}

        {showAnalytics && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl mb-2">{selectedChapterObj?.name}</h2>
                <p className="text-muted-foreground">{selectedChapterObj?.description}</p>
              </div>
              {isLoading ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              ) : (
                <div className="bg-card rounded-xl px-4 py-2 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Overall Mastery</p>
                  <p className="text-2xl text-primary">
                    {Math.round(((studentProgress.level1.mastered + studentProgress.level2.mastered + studentProgress.level3.mastered) / (studentProgress.level1.total + studentProgress.level2.total + studentProgress.level3.total)) * 100)}%
                  </p>
                </div>
              )}
            </div>

            {/* Level Progression */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-xl">My Learning Progression</h2>
              </div>
              <div className="relative">
                <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-destructive opacity-20"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Level 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg relative z-10 text-white text-sm">1</div>
                      <div>
                        <h3 className="text-secondary">Level 1</h3>
                        <p className="text-xs text-muted-foreground">Fundamental</p>
                      </div>
                    </div>
                    <div className="bg-secondary/5 border-2 border-secondary/20 rounded-xl p-4 min-h-[300px]">
                      <div className="mb-3 flex items-center justify-between"><span className="text-sm">Progress</span><span className="text-sm">{studentProgress.level1.mastered}/{studentProgress.level1.total}</span></div>
                      <div className="w-full bg-background rounded-full h-2 mb-4">
                        <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${(studentProgress.level1.mastered / studentProgress.level1.total) * 100}%` }} />
                      </div>
                      <div className="space-y-2">
                        {studentProgress.level1.competencies.map((comp) => (
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
                      <div className={`w-8 h-8 rounded-full ${isLevel1Complete ? "bg-accent" : "bg-muted-foreground/30"} flex items-center justify-center shadow-lg relative z-10 text-white`}>
                        {isLevel1Complete ? <span className="text-sm">2</span> : <Lock className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className={isLevel1Complete ? "text-accent" : "text-muted-foreground"}>Level 2</h3>
                        <p className="text-xs text-muted-foreground">{isLevel1Complete ? "Advanced" : "Locked"}</p>
                      </div>
                    </div>
                    <div className={`${isLevel1Complete ? "bg-accent/5 border-accent/20" : "bg-muted/50 border-muted"} border-2 rounded-xl p-4 min-h-[300px] ${!isLevel1Complete && "opacity-50"}`}>
                      <div className="mb-3 flex items-center justify-between"><span className="text-sm">Progress</span><span className="text-sm">{studentProgress.level2.mastered}/{studentProgress.level2.total}</span></div>
                      <div className="w-full bg-background rounded-full h-2 mb-4">
                        <div className={`${isLevel1Complete ? "bg-accent" : "bg-muted-foreground/30"} h-2 rounded-full transition-all`} style={{ width: `${(studentProgress.level2.mastered / studentProgress.level2.total) * 100}%` }} />
                      </div>
                      <div className="space-y-2">
                        {studentProgress.level2.competencies.map((comp) => (
                          <div key={comp.id} className="flex items-start gap-2 text-xs">
                            <div className={`mt-0.5 ${isLevel1Complete ? getStatusColor(comp.status) : "text-muted-foreground"}`}>
                              {isLevel1Complete ? (comp.status === "mastered" ? <CheckCircle className="w-4 h-4" /> : comp.status === "in-progress" ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4" />) : <Lock className="w-4 h-4" />}
                            </div>
                            <span className={isLevel1Complete ? getStatusColor(comp.status) : "text-muted-foreground"}>{comp.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full ${isLevel2Complete ? "bg-destructive" : "bg-muted-foreground/30"} flex items-center justify-center shadow-lg relative z-10 text-white`}>
                        {isLevel2Complete ? <span className="text-sm">3</span> : <Lock className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className={isLevel2Complete ? "text-destructive" : "text-muted-foreground"}>Level 3</h3>
                        <p className="text-xs text-muted-foreground">{isLevel2Complete ? "Expert" : "Locked"}</p>
                      </div>
                    </div>
                    <div className={`${isLevel2Complete ? "bg-destructive/5 border-destructive/20" : "bg-muted/50 border-muted"} border-2 rounded-xl p-4 min-h-[300px] ${!isLevel2Complete && "opacity-50"}`}>
                      <div className="mb-3 flex items-center justify-between"><span className="text-sm">Progress</span><span className="text-sm">{studentProgress.level3.mastered}/{studentProgress.level3.total}</span></div>
                      <div className="w-full bg-background rounded-full h-2 mb-4">
                        <div className={`${isLevel2Complete ? "bg-destructive" : "bg-muted-foreground/30"} h-2 rounded-full transition-all`} style={{ width: `${(studentProgress.level3.mastered / studentProgress.level3.total) * 100}%` }} />
                      </div>
                      <div className="space-y-2">
                        {studentProgress.level3.competencies.map((comp) => (
                          <div key={comp.id} className="flex items-start gap-2 text-xs">
                            <div className={`mt-0.5 ${isLevel2Complete ? getStatusColor(comp.status) : "text-muted-foreground"}`}>
                              {isLevel2Complete ? (comp.status === "mastered" ? <CheckCircle className="w-4 h-4" /> : comp.status === "in-progress" ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4" />) : <Lock className="w-4 h-4" />}
                            </div>
                            <span className={isLevel2Complete ? getStatusColor(comp.status) : "text-muted-foreground"}>{comp.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalized Tasks */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  <h2 className="text-xl">Personalized Tasks for You</h2>
                </div>
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground mb-6">These tasks are dynamically generated by AI based on your learning preferences and hobbies</p>

              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
                  ))
                ) : tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="p-5 rounded-xl border-2 bg-card border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{task.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs border ${getTaskTypeColor(task.type)}`}>
                              <span className="inline-flex items-center gap-1">
                                {getTaskTypeIcon(task.type)}
                                {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                              </span>
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.difficulty === "easy" ? "bg-green-100 text-green-700" : task.difficulty === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                              {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                            </span>
                            {task.hobbyContext && (
                              <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">🎯 {task.hobbyContext}</span>
                            )}
                          </div>
                        </div>
                        <button className="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2">
                          <span className="text-sm font-medium">Start</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8 italic">No tasks yet. Select a course and chapter to get started!</p>
                )}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <h2 className="text-xl mb-6">My Concept Mastery - {selectedChapterObj?.name}</h2>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={conceptData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="concept" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                  <Radar name="My Performance" dataKey="student" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} strokeWidth={3} />
                  <Radar name="Class Average" dataKey="classAvg" stroke="#22C55E" fill="#22C55E" fillOpacity={0.1} strokeWidth={2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              <div className="mt-6 text-center text-sm text-muted-foreground">Compare your performance with the class average for this chapter</div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-sm text-muted-foreground mb-2">Level 1 Mastery</h3>
                <p className="text-3xl mb-1 text-secondary">{Math.round((studentProgress.level1.mastered / studentProgress.level1.total) * 100)}%</p>
                <p className="text-sm text-muted-foreground">{studentProgress.level1.mastered} of {studentProgress.level1.total} competencies</p>
              </div>
              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-sm text-muted-foreground mb-2">Level 2 Mastery</h3>
                <p className="text-3xl mb-1 text-accent">{Math.round((studentProgress.level2.mastered / studentProgress.level2.total) * 100)}%</p>
                <p className="text-sm text-muted-foreground">{studentProgress.level2.mastered} of {studentProgress.level2.total} competencies</p>
              </div>
              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <h3 className="text-sm text-muted-foreground mb-2">Level 3 Mastery</h3>
                <p className="text-3xl mb-1 text-destructive">{Math.round((studentProgress.level3.mastered / studentProgress.level3.total) * 100)}%</p>
                <p className="text-sm text-muted-foreground">{studentProgress.level3.mastered} of {studentProgress.level3.total} competencies</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
