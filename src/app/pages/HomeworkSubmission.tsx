import { useState } from "react";
import { useNavigate } from "react-router";
import StudentLayout from "../components/StudentLayout";
import { Upload, FileText, Image, FileType, AlertCircle, Send, Loader2, Sparkles, CheckCircle, XCircle, BookOpen, Clock, ArrowRight, Trophy } from "lucide-react";
import { gradeHomework, generatePersonalizedTasks } from "../../lib/gemini";

type GradingResult = {
  score: number;
  feedback: string;
  areasOfImprovement: string[];
  correctness: string;
};

type Task = {
  id: number;
  concept: string;
  hobby: string;
  title: string;
  description: string;
  progress: number;
  difficulty: "Easy" | "Medium" | "Hard";
};

export default function HomeworkSubmission() {
  const navigate = useNavigate();
  const [submissionMethod, setSubmissionMethod] = useState<"text" | "upload">("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [remediationTasks, setRemediationTasks] = useState<Task[]>([]);
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);

  const homework = {
    title: "Quadratic Equations Practice",
    course: "Mathematics 101",
    dueDate: "March 18, 2026",
    points: 100,
    description: "Solve the following quadratic equations and show your complete working.",
    questions: [
      "1. Solve: x² - 5x + 6 = 0",
      "2. Solve: 2x² + 7x - 15 = 0",
      "3. Find the vertex of y = x² - 4x + 3"
    ]
  };

  const handleSubmit = async () => {
    if (!textAnswer && !uploadedFile) {
      alert("Please provide a submission.");
      return;
    }

    setIsSubmitting(true);
    setGradingResult(null);
    setRemediationTasks([]);

    try {
      const submission = submissionMethod === "text" ? textAnswer : "File Uploaded: " + uploadedFile;
      const fullContext = `${homework.description}\n\nQuestions:\n${homework.questions.join("\n")}`;
      const result = await gradeHomework(homework.title, fullContext, submission) as GradingResult;
      setGradingResult(result);

      if (result.score < 100) {
        setIsGeneratingTasks(true);
        // Using "Math" and the student's weaknesses to generate remediation tasks
        const tasks = await generatePersonalizedTasks(["Mathematics", "Problem Solving"], result.areasOfImprovement);
        setRemediationTasks(tasks);
        setIsGeneratingTasks(false);
      }
    } catch (e) {
      console.error("Grading failed", e);
      alert("Something went wrong with the AI grading. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsGeneratingTasks(false);
    }
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl mb-2 font-bold">{homework.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{homework.course}</span>
              <span>•</span>
              <span>Due: {homework.dueDate}</span>
              <span>•</span>
              <span>{homework.points} points</span>
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">AI Feedback Active</span>
          </div>
        </div>

        {gradingResult ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Score Card */}
            <div className={`rounded-3xl border-2 overflow-hidden shadow-2xl transition-all duration-500 ${gradingResult.score === 100
              ? "border-yellow-400/50 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-background"
              : "border-primary/20 bg-card"
              }`}>
              <div className={`p-8 flex items-center justify-between ${gradingResult.score === 100 ? "bg-yellow-400 text-yellow-900" : "bg-primary text-primary-foreground"
                }`}>
                <div className="flex items-center gap-4">
                  {gradingResult.score === 100 ? (
                    <Trophy className="w-10 h-10 animate-bounce" />
                  ) : (
                    <CheckCircle className="w-10 h-10" />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold">
                      {gradingResult.score === 100 ? "Perfect Score!" : "Homework Graded"}
                    </h2>
                    <p className="opacity-80">Pedagogical Insights by Gemini AI</p>
                  </div>
                </div>
                <div className="bg-white/20 px-8 py-3 rounded-2xl backdrop-blur-md border border-white/30 text-center">
                  <div className="text-4xl font-black">{gradingResult.score}</div>
                  <div className="text-sm font-bold opacity-70 italic">points</div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Feedback Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      Pedagogical Feedback
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{gradingResult.feedback}</p>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      Correctness
                    </h3>
                    <p className="text-muted-foreground italic">{gradingResult.correctness}</p>
                  </div>
                </div>

                {gradingResult.score < 100 && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                      <AlertCircle className="w-6 h-6" />
                      Areas for Growth
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gradingResult.areasOfImprovement.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-accent/5 p-4 rounded-xl border border-accent/20">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-sm font-medium">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Remediation Tasks Section */}
            {gradingResult.score < 100 && (
              <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Recommended Practice</h2>
                    <p className="text-muted-foreground">Generated to help you master identified weaknesses</p>
                  </div>
                  {isGeneratingTasks && (
                    <div className="flex items-center gap-2 text-primary font-medium animate-pulse">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Building your path...
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {remediationTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
                      onClick={() => navigate(`/student/task?concept=${encodeURIComponent(task.concept)}&hobby=${encodeURIComponent(task.hobby)}`)}
                    >
                      <div className="absolute top-0 right-0 p-3 bg-primary/5 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${task.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                          task.difficulty === "Medium" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                          }`}>
                          {task.difficulty}
                        </span>
                      </div>
                      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{task.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{task.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>15 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>+{task.id * 10} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setGradingResult(null)}
                className="flex-1 py-4 bg-muted hover:bg-muted/80 rounded-2xl transition-all font-bold border border-border"
              >
                Re-submit Homework
              </button>
              <button
                onClick={() => navigate("/student/dashboard")}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg font-bold"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Submission Form */}
            <div className="space-y-6">
              {/* Assignment Details */}
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <h2 className="text-xl mb-4 font-bold">Assignment Details</h2>
                <p className="text-muted-foreground mb-4">{homework.description}</p>
                <div className="bg-muted p-4 rounded-xl">
                  <h3 className="mb-2 font-medium">Questions:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {homework.questions.map((q, i) => (
                      <li key={i}>{q.split(": ").slice(1).join(": ") || q}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Important Grading Notice */}
              <div className="p-5 bg-amber-50/50 border border-amber-200/50 rounded-2xl flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-amber-900">Important Note</p>
                  <p className="text-sm text-amber-800/80">
                    Gemini AI will analyze your work. Focus on showing your logic even if your final answer is wrong.
                  </p>
                </div>
              </div>

              {/* Submission Method */}
              <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Your Submission</h2>
                  <div className="flex bg-muted p-1 rounded-xl">
                    <button
                      onClick={() => setSubmissionMethod("text")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${submissionMethod === "text" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Write
                    </button>
                    <button
                      onClick={() => setSubmissionMethod("upload")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${submissionMethod === "upload" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      Upload
                    </button>
                  </div>
                </div>

                {submissionMethod === "text" ? (
                  <div className="space-y-4">
                    <textarea
                      value={textAnswer}
                      onChange={(e) => setTextAnswer(e.target.value)}
                      rows={12}
                      placeholder="Question 1: Given x² - 5x + 6 = 0...&#10;&#10;Steps: ..."
                      className="w-full px-6 py-5 rounded-3xl border border-border bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono text-sm transition-all"
                    />
                    <div className="flex justify-between items-center text-xs text-muted-foreground px-2">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-primary" />
                        AI Feedback enabled
                      </span>
                      <span>{textAnswer.length} characters</span>
                    </div>
                  </div>
                ) : (
                  <div className="group border-2 border-dashed border-border rounded-3xl p-12 text-center hover:border-primary/50 transition-all cursor-pointer bg-muted/5" onClick={() => setUploadedFile("submission_scan.pdf")}>
                    {uploadedFile ? (
                      <div className="flex items-center justify-between p-6 bg-background rounded-2xl border border-border shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-xl">
                            <FileType className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold">{uploadedFile}</p>
                            <p className="text-xs text-muted-foreground">Ready for analysis</p>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} className="text-destructive font-bold hover:underline">Remove</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-6">
                        <div className="bg-primary/10 p-6 rounded-full group-hover:scale-110 transition-transform">
                          <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <p className="text-xl font-bold mb-2 text-foreground">Click to upload your work</p>
                          <p className="text-sm text-muted-foreground">Supports PDF, JPG, PNG or DOCX</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* AI Grading Info */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 mb-6">
                <h3 className="flex items-center gap-2 font-semibold mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Grading Criteria
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your submission will be evaluated based on the following criteria using the new Gemini 3.0 Model:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Quality of reasoning and explanation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Correctness of method used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Step-by-step working shown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Final answer accuracy</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => navigate("/student/dashboard")}
                  className="flex-1 px-8 py-5 rounded-3xl border border-border hover:bg-muted transition-all font-bold text-muted-foreground"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] bg-primary text-primary-foreground px-8 py-5 rounded-3xl hover:bg-primary/90 transition-all shadow-2xl font-black flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Gemini is grading...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Grade Submission
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </StudentLayout>
  );
}
