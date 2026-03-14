import { useState, useEffect } from "react";
import TeacherLayout from "../components/TeacherLayout";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { AlertCircle, TrendingUp, TrendingDown, Eye, EyeOff, Users, User, BookOpen, Video, Headphones, Image as ImageIcon, Lock, CheckCircle, Clock, Circle, ChevronDown, ChevronUp, Sparkles, Loader2, RefreshCw, MessageSquare, Send } from "lucide-react";
import { analyzeErrorPatterns } from "../../lib/gemini";

type ViewMode = "class" | "student";

type CompetencyStatus = {
  id: string;
  text: string;
  status: "mastered" | "in-progress" | "not-mastered";
};

type ErrorPattern = {
  pattern: string;
  affected: number;
  severity: "high" | "medium" | "low";
};

export default function Analytics() {
  const [viewMode, setViewMode] = useState<ViewMode>("class");
  const [selectedForRadar, setSelectedForRadar] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudentView, setSelectedStudentView] = useState("");
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [errorPatterns, setErrorPatterns] = useState<ErrorPattern[]>([]);
  const [analyzingErrors, setAnalyzingErrors] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState({
    classAvg: true,
    best: true,
    worst: true,
  });
  const [feedbackText, setFeedbackText] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [youngStudentsMode, setYoungStudentsMode] = useState(false);

  useEffect(() => {
    if (selectedClass) {
      const mode = localStorage.getItem(`youngMode_${selectedClass}`) === "true";
      setYoungStudentsMode(mode);
    }
  }, [selectedClass]);

  const classes = [
    { id: 1, name: "Mathematics 101 - Section A" },
    { id: 2, name: "Mathematics 101 - Section B" },
    { id: 3, name: "Physics Advanced" },
  ];

  const courses = [
    { id: 1, classId: 1, name: "Algebra Fundamentals" },
    { id: 2, classId: 1, name: "Geometry Basics" },
    { id: 3, classId: 2, name: "Algebra Fundamentals" },
    { id: 4, classId: 3, name: "Classical Mechanics" },
  ];

  const filteredCourses = selectedClass
    ? courses.filter((c) => c.classId === Number(selectedClass))
    : [];

  const conceptData = [
    { concept: "Linear Equations", classAvg: 85, student: 72, best: 98, worst: 45 },
    { concept: "Quadratic Functions", classAvg: 78, student: 68, best: 95, worst: 38 },
    { concept: "Polynomials", classAvg: 82, student: 88, best: 97, worst: 52 },
    { concept: "Graphing", classAvg: 75, student: 70, best: 92, worst: 41 },
    { concept: "Systems", classAvg: 80, student: 75, best: 96, worst: 48 },
    { concept: "Factoring", classAvg: 88, student: 92, best: 99, worst: 55 },
  ];

  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      score: 78,
      trend: "up",
      mastery: 75,
      learningChannels: ["Text", "Video"],
      hobbies: ["Reading", "Music"],
      level1: {
        mastered: 4,
        total: 5,
        competencies: [
          { id: "1-1", text: "Understand basic functions", status: "mastered" as const },
          { id: "1-2", text: "Interpret simple graphs", status: "mastered" as const },
          { id: "1-3", text: "Solve linear equations", status: "in-progress" as const },
          { id: "1-4", text: "Identify function types", status: "mastered" as const },
          { id: "1-5", text: "Apply order of operations", status: "mastered" as const },
        ],
      },
      level2: {
        mastered: 2,
        total: 4,
        competencies: [
          { id: "2-1", text: "Analyze function behavior", status: "mastered" as const },
          { id: "2-2", text: "Combine multiple equations", status: "in-progress" as const },
          { id: "2-3", text: "Interpret complex graphs", status: "mastered" as const },
          { id: "2-4", text: "Apply transformations to functions", status: "not-mastered" as const },
        ],
      },
      level3: {
        mastered: 0,
        total: 3,
        competencies: [
          { id: "3-1", text: "Model real-world problems with functions", status: "not-mastered" as const },
          { id: "3-2", text: "Optimize equations", status: "not-mastered" as const },
          { id: "3-3", text: "Explain mathematical reasoning", status: "not-mastered" as const },
        ],
      },
    },
    {
      id: 2,
      name: "Liam Smith",
      score: 85,
      trend: "up",
      mastery: 82,
      learningChannels: ["Video", "Images"],
      hobbies: ["Sports", "Gaming"],
      level1: {
        mastered: 5,
        total: 5,
        competencies: [
          { id: "1-1", text: "Understand basic functions", status: "mastered" as const },
          { id: "1-2", text: "Interpret simple graphs", status: "mastered" as const },
          { id: "1-3", text: "Solve linear equations", status: "mastered" as const },
          { id: "1-4", text: "Identify function types", status: "mastered" as const },
          { id: "1-5", text: "Apply order of operations", status: "mastered" as const },
        ],
      },
      level2: {
        mastered: 3,
        total: 4,
        competencies: [
          { id: "2-1", text: "Analyze function behavior", status: "mastered" as const },
          { id: "2-2", text: "Combine multiple equations", status: "mastered" as const },
          { id: "2-3", text: "Interpret complex graphs", status: "mastered" as const },
          { id: "2-4", text: "Apply transformations to functions", status: "in-progress" as const },
        ],
      },
      level3: {
        mastered: 1,
        total: 3,
        competencies: [
          { id: "3-1", text: "Model real-world problems with functions", status: "mastered" as const },
          { id: "3-2", text: "Optimize equations", status: "in-progress" as const },
          { id: "3-3", text: "Explain mathematical reasoning", status: "not-mastered" as const },
        ],
      },
    },
    {
      id: 3,
      name: "Sophia Davis",
      score: 72,
      trend: "down",
      mastery: 68,
      learningChannels: ["Audio", "Text"],
      hobbies: ["Art", "Dance"],
      level1: {
        mastered: 3,
        total: 5,
        competencies: [
          { id: "1-1", text: "Understand basic functions", status: "mastered" as const },
          { id: "1-2", text: "Interpret simple graphs", status: "mastered" as const },
          { id: "1-3", text: "Solve linear equations", status: "not-mastered" as const },
          { id: "1-4", text: "Identify function types", status: "mastered" as const },
          { id: "1-5", text: "Apply order of operations", status: "in-progress" as const },
        ],
      },
      level2: {
        mastered: 1,
        total: 4,
        competencies: [
          { id: "2-1", text: "Analyze function behavior", status: "mastered" as const },
          { id: "2-2", text: "Combine multiple equations", status: "not-mastered" as const },
          { id: "2-3", text: "Interpret complex graphs", status: "not-mastered" as const },
          { id: "2-4", text: "Apply transformations to functions", status: "not-mastered" as const },
        ],
      },
      level3: {
        mastered: 0,
        total: 3,
        competencies: [
          { id: "3-1", text: "Model real-world problems with functions", status: "not-mastered" as const },
          { id: "3-2", text: "Optimize equations", status: "not-mastered" as const },
          { id: "3-3", text: "Explain mathematical reasoning", status: "not-mastered" as const },
        ],
      },
    },
  ];

  const handleAnalyzeErrors = async () => {
    setAnalyzingErrors(true);
    try {
      const patterns = await analyzeErrorPatterns(students);
      setErrorPatterns(patterns);
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setAnalyzingErrors(false);
    }
  };

  useEffect(() => {
    if (selectedCourse && selectedClass && errorPatterns.length === 0) {
      handleAnalyzeErrors();
    }
  }, [selectedCourse, selectedClass]);

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers({ ...visibleLayers, [layer]: !visibleLayers[layer] });
  };

  const showAnalytics = selectedClass && selectedCourse;
  const currentStudent = students.find((s) => s.id === Number(selectedStudentView));

  const isLevel1Complete = currentStudent ? currentStudent.level1.mastered === currentStudent.level1.total : false;
  const isLevel2Complete = currentStudent ? currentStudent.level2.mastered === currentStudent.level2.total : false;

  const getStatusColor = (status: CompetencyStatus["status"]) => {
    switch (status) {
      case "mastered": return "text-secondary";
      case "in-progress": return "text-accent";
      case "not-mastered": return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: CompetencyStatus["status"]) => {
    switch (status) {
      case "mastered": return "bg-secondary";
      case "in-progress": return "bg-accent";
      case "not-mastered": return "bg-muted-foreground/30";
    }
  };

  const getLearningChannelIcon = (channel: string) => {
    switch (channel) {
      case "Text": return <BookOpen className="w-4 h-4" />;
      case "Video": return <Video className="w-4 h-4" />;
      case "Audio": return <Headphones className="w-4 h-4" />;
      case "Images": return <ImageIcon className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track student performance and concept mastery</p>
        </div>

        {/* Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-2">Select Class</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedCourse("");
              }}
            >
              <option value="">Select a Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Select Course</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Select a Course</option>
              {filteredCourses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">View Mode</label>
            <div className="flex bg-muted rounded-xl p-1">
              <button
                onClick={() => { setViewMode("class"); setSelectedStudentView(""); }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === "class" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Users className="w-4 h-4" />
                <span>Class View</span>
              </button>
              <button
                onClick={() => setViewMode("student")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === "student" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <User className="w-4 h-4" />
                <span>Student View</span>
              </button>
            </div>
          </div>
        </div>

        {viewMode === "student" && showAnalytics && (
          <div className="mb-6">
            <label className="block text-sm mb-2">Select Student</label>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <select
                  className="px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={selectedStudentView}
                  onChange={(e) => {
                    setSelectedStudentView(e.target.value);
                    setShowFeedbackSuccess(false);
                    setFeedbackText("");
                  }}
                >
                  <option value="">Select a Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                {youngStudentsMode && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-secondary/10 border-secondary text-secondary shadow-sm">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm font-medium">Young Mode Enabled</span>
                  </div>
                )}
              </div>

              <div className="flex bg-muted p-1 rounded-xl border border-border">
              </div>
            </div>
          </div>
        )}

        {!showAnalytics && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-16 text-center">
            <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2">No Analytics Selected</h3>
            <p className="text-muted-foreground">Select a class and a course to view analytics.</p>
          </div>
        )}

        {showAnalytics && viewMode === "class" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-xl mb-6">Concept Mastery Analysis</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={conceptData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="concept" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                    {visibleLayers.classAvg && <Radar key="classAvg" name="Class Average" dataKey="classAvg" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />}
                    {visibleLayers.best && <Radar key="best" name="Best Student" dataKey="best" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />}
                    {visibleLayers.worst && <Radar key="worst" name="Worst Student" dataKey="worst" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>

                <div className="mt-6 space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">Toggle layers:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => toggleLayer("classAvg")} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${visibleLayers.classAvg ? "border-primary bg-primary/5" : "border-border bg-muted/50 opacity-50"}`}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div><span className="text-sm">Class Avg</span></div>
                      {visibleLayers.classAvg ? <Eye className="w-4 h-4 text-primary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    <button onClick={() => toggleLayer("best")} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${visibleLayers.best ? "border-secondary bg-secondary/5" : "border-border bg-muted/50 opacity-50"}`}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-secondary rounded-full"></div><span className="text-sm">Best</span></div>
                      {visibleLayers.best ? <Eye className="w-4 h-4 text-secondary" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </button>
                    <button onClick={() => toggleLayer("worst")} className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${visibleLayers.worst ? "border-destructive bg-destructive/5" : "border-border bg-muted/50 opacity-50"}`}>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-destructive rounded-full"></div><span className="text-sm">Worst</span></div>
                      {visibleLayers.worst ? <Eye className="w-4 h-4 text-destructive" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-xl mb-4">Class Students</h2>
                <div className="space-y-2 max-h-[450px] overflow-y-auto">
                  {students.map((student) => (
                    <div key={student.id} className="p-3 rounded-xl bg-muted border-2 border-transparent">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{student.name}</span>
                        {student.trend === "up" ? <TrendingUp className="w-4 h-4 text-secondary" /> : student.trend === "down" ? <TrendingDown className="w-4 h-4 text-destructive" /> : null}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Mastery: {student.mastery}%</span>
                        <span className="text-xs">{student.score}%</span>
                      </div>
                      <div className="mt-2 w-full bg-background rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${student.mastery}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl">AI Detected Error Patterns</h2>
                </div>
                <button
                  onClick={handleAnalyzeErrors}
                  disabled={analyzingErrors}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-primary/5 hover:bg-primary/10 text-primary rounded-xl transition-colors border border-primary/20"
                >
                  <RefreshCw className={`w-4 h-4 ${analyzingErrors ? 'animate-spin' : ''}`} />
                  Re-analyze
                </button>
              </div>

              {analyzingErrors ? (
                <div className="py-12 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing student response patterns for pedagogic insights...</p>
                </div>
              ) : errorPatterns.length > 0 ? (
                <div className="space-y-3">
                  {errorPatterns.map((error, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-l-4 flex items-start gap-4 ${error.severity === "high" ? "bg-red-50 border-red-500" : error.severity === "medium" ? "bg-amber-50 border-accent" : "bg-blue-50 border-blue-500"
                        }`}
                    >
                      <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${error.severity === "high" ? "text-red-600" : error.severity === "medium" ? "text-accent" : "text-blue-600"}`} />
                      <div className="flex-1">
                        <p className="mb-1 font-medium">{error.pattern}</p>
                        <p className="text-sm text-muted-foreground">{error.affected} students affected</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${error.severity === "high" ? "bg-red-100 text-red-700" : error.severity === "medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {error.severity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                  Select a class and course to perform AI analysis
                </div>
              )}
            </div>
          </div>
        )}


        {/* STUDENT VIEW */}
        {showAnalytics && viewMode === "student" && !selectedStudentView && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-16 text-center">
            <div className="bg-muted rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2">No Student Selected</h3>
            <p className="text-muted-foreground">
              Select a student to view their individual analytics.
            </p>
          </div>
        )}

        {showAnalytics && viewMode === "student" && currentStudent && (
          <div className="space-y-6">
            {/* Compact Student Summary Card */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border-2 border-primary/20 shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl mb-1">{currentStudent.name}</h2>
                  <p className="text-muted-foreground">Quick Overview</p>
                </div>
                <div className="flex items-center gap-2">
                  {currentStudent.trend === "up" ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Improving</span>
                    </div>
                  ) : currentStudent.trend === "down" ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-destructive/10 text-destructive rounded-full">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm">Needs Attention</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left: Key Stats */}
                <div className="space-y-3">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Current Level</p>
                    <p className="text-2xl">
                      {isLevel2Complete ? "3" : isLevel1Complete ? "2" : "1"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isLevel2Complete ? "Expert" : isLevel1Complete ? "Advanced" : "Fundamental"}
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Level {isLevel2Complete ? "3" : isLevel1Complete ? "2" : "1"} Progress
                    </p>
                    <p className="text-2xl text-secondary">
                      {isLevel2Complete
                        ? currentStudent.level3.mastered
                        : isLevel1Complete
                          ? currentStudent.level2.mastered
                          : currentStudent.level1.mastered}
                      <span className="text-base text-muted-foreground">
                        {" "}
                        /{" "}
                        {isLevel2Complete
                          ? currentStudent.level3.total
                          : isLevel1Complete
                            ? currentStudent.level2.total
                            : currentStudent.level1.total}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">competencies completed</p>
                  </div>

                  <div className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Course Average</p>
                    <p className="text-2xl text-primary">{currentStudent.score}%</p>
                  </div>
                </div>

                {/* Right: Mini Radar Chart */}
                <div className="bg-card rounded-xl p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-3">Competency Radar</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={conceptData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="concept" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                      <Radar
                        name={currentStudent.name}
                        dataKey="student"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* View More Button */}
              <button
                onClick={() => setShowDetailedView(!showDetailedView)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                <span>{showDetailedView ? "Hide Details" : "View Detailed Analytics"}</span>
                {showDetailedView ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Personalized Feedback Section */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl">Send Personalized Feedback</h2>
              </div>
              
              {showFeedbackSuccess ? (
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-secondary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary mb-1">Feedback Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your feedback has been shared with {currentStudent.name}.
                  </p>
                  <button 
                    onClick={() => {
                      setShowFeedbackSuccess(false);
                      setFeedbackText("");
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={`Write a message to support ${currentStudent.name}'s progression...`}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (!feedbackText.trim()) return;
                        setIsSendingFeedback(true);
                        // Mock sending
                        setTimeout(() => {
                          setIsSendingFeedback(false);
                          setShowFeedbackSuccess(true);
                        }, 1000);
                      }}
                      disabled={isSendingFeedback || !feedbackText.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingFeedback ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>{isSendingFeedback ? "Sending..." : "Send Feedback"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed View (conditionally shown) */}
            {showDetailedView && (
              <>
                {/* Student Learning Preferences */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <h2 className="text-xl mb-4">Student Learning Preferences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-3">Favorite Learning Channels</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentStudent.learningChannels.map((channel) => (
                          <div
                            key={channel}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20"
                          >
                            {getLearningChannelIcon(channel)}
                            <span className="text-sm">{channel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm text-muted-foreground mb-3">Hobbies (AI Explanation Context)</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentStudent.hobbies.map((hobby) => (
                          <div
                            key={hobby}
                            className="px-4 py-2 bg-secondary/10 text-secondary rounded-xl border border-secondary/20"
                          >
                            <span className="text-sm">{hobby}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level Progression Visualization */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-8">
                  <h2 className="text-xl mb-6">Learning Progression Timeline</h2>

                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-destructive opacity-20"></div>

                    {/* Timeline Levels */}
                    <div className="grid grid-cols-3 gap-8 relative">
                      {/* Level 1 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-lg relative z-10">
                            <span className="text-white text-sm">1</span>
                          </div>
                          <div>
                            <h3 className="text-secondary">Level 1</h3>
                            <p className="text-xs text-muted-foreground">Fundamental</p>
                          </div>
                        </div>

                        <div className="bg-secondary/5 border-2 border-secondary/20 rounded-xl p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">
                              {currentStudent.level1.mastered}/{currentStudent.level1.total}
                            </span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2 mb-4">
                            <div
                              className="bg-secondary h-2 rounded-full transition-all"
                              style={{
                                width: `${(currentStudent.level1.mastered / currentStudent.level1.total) * 100
                                  }%`,
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            {currentStudent.level1.competencies.map((comp) => (
                              <div
                                key={comp.id}
                                className="flex items-start gap-2 text-xs"
                              >
                                <div className={`mt-0.5 ${getStatusColor(comp.status)}`}>
                                  {comp.status === "mastered" ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : comp.status === "in-progress" ? (
                                    <Clock className="w-4 h-4" />
                                  ) : (
                                    <Circle className="w-4 h-4" />
                                  )}
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
                          <div className={`w-8 h-8 rounded-full ${isLevel1Complete ? 'bg-accent' : 'bg-muted-foreground/30'} flex items-center justify-center shadow-lg relative z-10`}>
                            {isLevel1Complete ? (
                              <span className="text-white text-sm">2</span>
                            ) : (
                              <Lock className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className={isLevel1Complete ? "text-accent" : "text-muted-foreground"}>Level 2</h3>
                            <p className="text-xs text-muted-foreground">
                              {isLevel1Complete ? "Advanced" : "Locked"}
                            </p>
                          </div>
                        </div>

                        <div className={`${isLevel1Complete ? 'bg-accent/5 border-accent/20' : 'bg-muted/50 border-muted'} border-2 rounded-xl p-4 ${!isLevel1Complete && 'opacity-50'}`}>
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">
                              {currentStudent.level2.mastered}/{currentStudent.level2.total}
                            </span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2 mb-4">
                            <div
                              className={`${isLevel1Complete ? 'bg-accent' : 'bg-muted-foreground/30'} h-2 rounded-full transition-all`}
                              style={{
                                width: `${(currentStudent.level2.mastered / currentStudent.level2.total) * 100
                                  }%`,
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            {currentStudent.level2.competencies.map((comp) => (
                              <div
                                key={comp.id}
                                className="flex items-start gap-2 text-xs"
                              >
                                <div className={`mt-0.5 ${isLevel1Complete ? getStatusColor(comp.status) : 'text-muted-foreground'}`}>
                                  {isLevel1Complete ? (
                                    comp.status === "mastered" ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : comp.status === "in-progress" ? (
                                      <Clock className="w-4 h-4" />
                                    ) : (
                                      <Circle className="w-4 h-4" />
                                    )
                                  ) : (
                                    <Lock className="w-4 h-4" />
                                  )}
                                </div>
                                <span className={isLevel1Complete ? getStatusColor(comp.status) : 'text-muted-foreground'}>{comp.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Level 3 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-full ${isLevel2Complete ? 'bg-destructive' : 'bg-muted-foreground/30'} flex items-center justify-center shadow-lg relative z-10`}>
                            {isLevel2Complete ? (
                              <span className="text-white text-sm">3</span>
                            ) : (
                              <Lock className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className={isLevel2Complete ? "text-destructive" : "text-muted-foreground"}>Level 3</h3>
                            <p className="text-xs text-muted-foreground">
                              {isLevel2Complete ? "Expert" : "Locked"}
                            </p>
                          </div>
                        </div>

                        <div className={`${isLevel2Complete ? 'bg-destructive/5 border-destructive/20' : 'bg-muted/50 border-muted'} border-2 rounded-xl p-4 ${!isLevel2Complete && 'opacity-50'}`}>
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm">
                              {currentStudent.level3.mastered}/{currentStudent.level3.total}
                            </span>
                          </div>
                          <div className="w-full bg-background rounded-full h-2 mb-4">
                            <div
                              className={`${isLevel2Complete ? 'bg-destructive' : 'bg-muted-foreground/30'} h-2 rounded-full transition-all`}
                              style={{
                                width: `${(currentStudent.level3.mastered / currentStudent.level3.total) * 100
                                  }%`,
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            {currentStudent.level3.competencies.map((comp) => (
                              <div
                                key={comp.id}
                                className="flex items-start gap-2 text-xs"
                              >
                                <div className={`mt-0.5 ${isLevel2Complete ? getStatusColor(comp.status) : 'text-muted-foreground'}`}>
                                  {isLevel2Complete ? (
                                    comp.status === "mastered" ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : comp.status === "in-progress" ? (
                                      <Clock className="w-4 h-4" />
                                    ) : (
                                      <Circle className="w-4 h-4" />
                                    )
                                  ) : (
                                    <Lock className="w-4 h-4" />
                                  )}
                                </div>
                                <span className={isLevel2Complete ? getStatusColor(comp.status) : 'text-muted-foreground'}>{comp.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
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
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Locked</span>
                    </div>
                  </div>
                </div>

                {/* Individual Radar Chart for Student */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                  <h2 className="text-xl mb-6">{currentStudent.name}'s Competency Mastery</h2>

                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={conceptData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="concept"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />

                      <Radar
                        name={currentStudent.name}
                        dataKey="student"
                        stroke="#F59E0B"
                        fill="#F59E0B"
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />

                      <Radar
                        name="Class Average"
                        dataKey="classAvg"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />

                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h3 className="text-sm text-muted-foreground mb-2">Level 1 Mastery</h3>
                    <p className="text-3xl mb-1">
                      {Math.round(
                        (currentStudent.level1.mastered / currentStudent.level1.total) * 100
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentStudent.level1.mastered} of {currentStudent.level1.total} competencies
                    </p>
                  </div>

                  <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h3 className="text-sm text-muted-foreground mb-2">Level 2 Mastery</h3>
                    <p className="text-3xl mb-1">
                      {Math.round(
                        (currentStudent.level2.mastered / currentStudent.level2.total) * 100
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentStudent.level2.mastered} of {currentStudent.level2.total} competencies
                    </p>
                  </div>

                  <div className="bg-card rounded-xl border border-border shadow-sm p-6">
                    <h3 className="text-sm text-muted-foreground mb-2">Level 3 Mastery</h3>
                    <p className="text-3xl mb-1">
                      {Math.round(
                        (currentStudent.level3.mastered / currentStudent.level3.total) * 100
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentStudent.level3.mastered} of {currentStudent.level3.total} competencies
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}