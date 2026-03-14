import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import StudentLayout from "../components/StudentLayout";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Target, Heart, Lightbulb, Trophy, Sparkles, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { generateTaskContent } from "../../lib/gemini";

type TaskData = {
  concept: string;
  hobby: string;
  title: string;
  explanation: string;
  practiceTask: string;
  correctAnswer: string;
  hint: string;
};

export default function TailoredTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const conceptParam = searchParams.get("concept") || "Linear Equations";
  const hobbyParam = searchParams.get("hobby") || "Music";

  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showMastery, setShowMastery] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const content = await generateTaskContent(conceptParam, hobbyParam);
        setTaskData(content);
      } catch (e) {
        console.error("Failed to generate task content", e);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [conceptParam, hobbyParam]);

  const masteryBefore = [
    { concept: "Quadratics", score: 72 },
    { concept: "Functions", score: 75 },
    { concept: "Graphing", score: 70 },
    { concept: "Applications", score: 68 },
  ];

  const masteryAfter = [
    { concept: "Quadratics", score: 82 },
    { concept: "Functions", score: 80 },
    { concept: "Graphing", score: 75 },
    { concept: "Applications", score: 78 },
  ];

  const handleSubmit = () => {
    if (answer.toLowerCase().trim() === taskData?.correctAnswer.toLowerCase().trim()) {
      setIsCorrect(true);
      setTimeout(() => {
        setShowMastery(true);
      }, 1000);
    } else {
      alert(`Not quite right. Try again or check the hint!`);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-medium">Generating Tailored Content...</h2>
          <p className="text-muted-foreground">AI is connecting ${conceptParam} to your interest in ${hobbyParam}</p>
        </div>
      </StudentLayout>
    );
  }

  if (!taskData) return null;

  return (
    <StudentLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/student/dashboard")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary to-[#8b87f7] p-6 rounded-xl text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-white/90">
                  <Target className="w-5 h-5" />
                  <span className="text-sm">Concept Target</span>
                </div>
                <h1 className="text-3xl mb-2">{taskData.title}</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Tailored to your interest: {taskData.hobby}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <div className="text-lg font-medium">{taskData.concept}</div>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl">AI Explanation</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {taskData.explanation}
              </p>
            </div>
          </div>

          {/* Practice Task */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-accent/10 p-2 rounded-xl">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-xl">Practice Task</h2>
            </div>

            <div className="bg-muted p-4 rounded-xl mb-6 font-mono text-sm whitespace-pre-line">
              {taskData.practiceTask}
            </div>

            {!isCorrect && (
              <>
                <div className="mb-4">
                  <label className="block mb-2">Your Answer</label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Submit Answer
                  </button>
                </div>

                {showHint && (
                  <div className="mt-4 p-4 bg-amber-50 border-l-4 border-accent rounded-xl">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-1 font-medium text-amber-900">Hint</p>
                        <p className="text-sm text-amber-800">{taskData.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {isCorrect && (
              <div className="p-6 bg-green-50 border-2 border-secondary rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary p-3 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-secondary mb-1">Excellent Work!</h3>
                    <p className="text-muted-foreground">You've mastered this concept</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-accent" />
                  <span className="text-lg font-medium text-green-900">+10 Mastery Points in {taskData.concept}</span>
                </div>
              </div>
            )}
          </div>

          {/* Mastery Progress Visualization */}
          {showMastery && (
            <div className="bg-card rounded-xl border border-border shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary/10 p-2 rounded-xl">
                  <Trophy className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl">Your Mastery Improved!</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center mb-4 text-muted-foreground">Before</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={masteryBefore}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="concept"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                      <Radar
                        dataKey="score"
                        stroke="#9ca3af"
                        fill="#9ca3af"
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-center mb-4 text-secondary">After</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={masteryAfter}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="concept"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                      <Radar
                        dataKey="score"
                        stroke="#22C55E"
                        fill="#22C55E"
                        fillOpacity={0.5}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/student/dashboard")}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}

