import { useState, useEffect } from "react";
import StudentLayout from "../components/StudentLayout";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { BookOpen, CheckCircle, Clock, Circle, Lock, Award, Target, Video, Headphones, FileText, Image as ImageIcon, Send, Sparkles, Loader2, Gamepad2 } from "lucide-react";
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
  const [youngStudentsMode, setYoungStudentsMode] = useState(false);

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
    if (selectedCourse) {
      const mode = localStorage.getItem(`youngMode_${selectedCourse}`) === "true";
      setYoungStudentsMode(mode);
    }
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

  const totalMastered = studentProgress.level1.mastered + studentProgress.level2.mastered + studentProgress.level3.mastered;
  const totalPossible = studentProgress.level1.total + studentProgress.level2.total + studentProgress.level3.total;

  // Linear progression logic
  let currentLevelIndex = 0; // 0 for Level 1, 1 for Level 2, 2 for Finish
  let currentLevelMastered = studentProgress.level1.mastered;
  let currentLevelTotal = studentProgress.level1.total;

  if (studentProgress.level1.mastered === studentProgress.level1.total) {
    currentLevelIndex = 1;
    currentLevelMastered = studentProgress.level2.mastered;
    currentLevelTotal = studentProgress.level2.total;
    
    if (studentProgress.level2.mastered === studentProgress.level2.total) {
      currentLevelIndex = 2;
      currentLevelMastered = studentProgress.level3.mastered;
      currentLevelTotal = studentProgress.level3.total;
    }
  }

  // Calculate position: Level 1 is at 40%, Level 2 at 70%, Finish at 90%
  const levelPositions = [40, 70, 90];
  const startPosition = 0;
  
  let visualProgressPercent = 0;
  if (currentLevelIndex === 0) {
    // Between Start (0) and L1 (10)
    visualProgressPercent = (currentLevelMastered / currentLevelTotal) * levelPositions[0];
  } else if (currentLevelIndex === 1) {
    // Between L1 (10) and L2 (50)
    visualProgressPercent = levelPositions[0] + (currentLevelMastered / currentLevelTotal) * (levelPositions[1] - levelPositions[0]);
  } else if (currentLevelIndex === 2) {
    // Between L2 (50) and Finish (90)
    visualProgressPercent = levelPositions[1] + (currentLevelMastered / currentLevelTotal) * (levelPositions[2] - levelPositions[1]);
  }

  const MarioPathVisualization = () => {

    return (
      <div className="relative py-16 px-4 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-50 rounded-3xl border-8 border-sky-400/30 overflow-hidden shadow-inner">
        {/* Background Decorative elements */}
        <div className="absolute top-10 left-[10%] opacity-40"><div className="w-16 h-8 bg-white rounded-full blur-md"></div></div>
        <div className="absolute top-24 left-[30%] opacity-30"><div className="w-20 h-10 bg-white rounded-full blur-md"></div></div>
        <div className="absolute top-12 right-[15%] opacity-40"><div className="w-24 h-12 bg-white rounded-full blur-md"></div></div>
        
        {/* Distant Hills */}
        <div className="absolute bottom-16 left-0 right-0 h-32 flex items-end">
          <div className="w-1/3 h-20 bg-emerald-600/20 rounded-t-full blur-xl translate-x-10"></div>
          <div className="w-1/2 h-24 bg-emerald-500/20 rounded-t-full blur-xl -translate-x-5"></div>
          <div className="w-1/3 h-16 bg-emerald-400/20 rounded-t-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Ongoing Path Background (Gray/Unfinished) */}
          <div className="absolute top-1/2 left-0 right-[-10%] h-12 bg-gray-300 -translate-y-1/2 rounded-l-full shadow-inner border-b-4 border-gray-400/50"></div>
          
          {/* Finished Part of the Path (Green) */}
          <div 
            className="absolute top-1/2 left-0 h-12 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 -translate-y-1/2 rounded-l-full shadow-lg border-b-4 border-emerald-800/50 transition-all duration-1000 z-10"
            style={{ width: `${visualProgressPercent}%` }}
          ></div>
          
          {/* Milestone Bases */}
          <div className="relative h-24 z-20">
            {/* Level 1 */}
            <div 
              className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-all duration-1000"
              style={{ left: `${levelPositions[0]}%` }}
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 transition-transform hover:scale-110 border-b-8 ${studentProgress.level1.mastered === studentProgress.level1.total ? "bg-amber-400 border-amber-600 text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                  <Award className="w-10 h-10 drop-shadow-md" />
                </div>
                {studentProgress.level1.mastered === studentProgress.level1.total && (
                  <div className="absolute -top-3 -right-3 bg-secondary p-1.5 rounded-full border-2 border-white animate-bounce">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <span className="mt-4 font-black text-xs tracking-widest text-emerald-800 uppercase">Level 1</span>
            </div>
            
            {/* Level 2 */}
            <div 
              className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-all duration-1000"
              style={{ left: `${levelPositions[1]}%` }}
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-3 transition-transform hover:scale-110 border-b-8 ${isLevel1Complete ? "bg-blue-400 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-300"}`}>
                  {isLevel1Complete ? <Award className="w-10 h-10 drop-shadow-md" /> : <Lock className="w-10 h-10" />}
                </div>
                {isLevel1Complete && studentProgress.level2.mastered === studentProgress.level2.total && (
                  <div className="absolute -top-3 -right-3 bg-secondary p-1.5 rounded-full border-2 border-white animate-bounce">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <span className="mt-4 font-black text-xs tracking-widest text-emerald-800 uppercase">Level 2</span>
            </div>
            
            {/* Grand Finale */}
            <div 
              className="absolute top-0 flex flex-col items-center -translate-x-1/2 transition-all duration-1000"
              style={{ left: `${levelPositions[2]}%` }}
            >
              <div className="relative">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform hover:scale-110 border-b-8 ${isLevel2Complete ? "bg-purple-500 border-purple-700 text-white" : "bg-white border-gray-200 text-gray-300 shadow-none opacity-50"}`}>
                  <Sparkles className="w-12 h-12 drop-shadow-md" />
                </div>
                <div className={`absolute -top-12 left-1/2 -ml-3 text-4xl transform transition-opacity duration-1000 ${isLevel2Complete ? "opacity-100 animate-pulse" : "opacity-0"}`}>🚩</div>
              </div>
              <span className="mt-4 font-black text-xs tracking-widest text-emerald-800 uppercase">Grand Finale</span>
            </div>
          </div>

          {/* Golden Stars (Coins) along the path */}
          <div className={`absolute top-1/2 left-[20%] -translate-y-8 animate-pulse text-xl transition-opacity ${visualProgressPercent > 20 ? "text-yellow-500" : "text-gray-300 opacity-50"}`}>⭐</div>
          <div className={`absolute top-1/2 left-[55%] -translate-y-14 animate-pulse delay-75 text-xl transition-opacity ${visualProgressPercent > 55 ? "text-yellow-500" : "text-gray-300 opacity-50"}`}>⭐</div>
          <div className={`absolute top-1/2 left-[80%] -translate-y-8 animate-pulse delay-150 text-xl transition-opacity ${visualProgressPercent > 80 ? "text-yellow-500" : "text-gray-300 opacity-50"}`}>⭐</div>

          {/* Player Character */}
          <div 
            className="absolute top-1/2 -mt-20 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) z-30"
            style={{ 
              left: `calc(${visualProgressPercent}% - 48px)`,
            }}
          >
            <div className="relative group cursor-pointer">
              <div className="bg-primary p-4 rounded-full border-4 border-white text-white shadow-2xl animate-bounce">
                <Gamepad2 className="w-12 h-12 drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 w-6 h-6 rounded-full border-2 border-white shadow-md animate-spin-slow"></div>
              
              {/* Tooltip-like popup */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg border-2 border-primary shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-sm font-bold text-primary">On my way! 🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quest Info */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/90 rounded-2xl border-b-4 border-secondary shadow-md transform -rotate-1">
            <div className="bg-secondary/10 p-2 rounded-lg"><Award className="w-5 h-5 text-secondary" /></div>
            <div>
              <p className="text-[10px] font-black uppercase text-secondary tracking-tighter">Current Step Mastery</p>
              <p className="text-xl font-black text-emerald-900 leading-none">{currentLevelMastered} / {currentLevelTotal}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-white/90 rounded-2xl border-b-4 border-sky-200 shadow-md transform rotate-1">
             <div className="bg-sky-100 p-2 rounded-lg"><Target className="w-5 h-5 text-sky-500" /></div>
             <div>
              <p className="text-[10px] font-black uppercase text-sky-600 tracking-tighter">Current Quest</p>
              <p className="text-base font-black text-emerald-900 leading-tight">{selectedChapterObj?.name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                  <p className="text-xs text-muted-foreground mb-1">Current Mastery</p>
                  <p className="text-2xl text-secondary">
                    {currentLevelMastered} / {currentLevelTotal}
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

            {/* Mastery Visualization */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">My Concept Mastery - {selectedChapterObj?.name}</h2>
                {youngStudentsMode && (
                  <span className="flex items-center gap-1 text-xs font-bold text-secondary px-2 py-1 bg-secondary/10 rounded-lg">
                    <Gamepad2 className="w-3 h-3" />
                    YOUNG MODE
                  </span>
                )}
              </div>
              
              {youngStudentsMode ? (
                <MarioPathVisualization />
              ) : (
                <>
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
                </>
              )}
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
