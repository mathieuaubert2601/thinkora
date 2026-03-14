import { useState } from "react";
import { useNavigate } from "react-router";
import StudentLayout from "../components/StudentLayout";
import { Upload, FileText, Image, FileType, AlertCircle, Send } from "lucide-react";

export default function HomeworkSubmission() {
  const navigate = useNavigate();
  const [submissionMethod, setSubmissionMethod] = useState<"text" | "upload">("text");
  const [textAnswer, setTextAnswer] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const homework = {
    title: "Quadratic Equations Practice",
    course: "Mathematics 101",
    dueDate: "March 18, 2026",
    points: 100,
    description: "Solve the following quadratic equations and show your complete working.",
  };

  return (
    <StudentLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">{homework.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{homework.course}</span>
            <span>•</span>
            <span>Due: {homework.dueDate}</span>
            <span>•</span>
            <span>{homework.points} points</span>
          </div>
        </div>

        {/* Assignment Details */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
          <h2 className="text-xl mb-4">Assignment Details</h2>
          <p className="text-muted-foreground mb-4">{homework.description}</p>
          <div className="bg-muted p-4 rounded-xl">
            <h3 className="mb-2">Questions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Solve: x² - 5x + 6 = 0</li>
              <li>Solve: 2x² + 7x - 15 = 0</li>
              <li>Find the vertex of y = x² - 4x + 3</li>
            </ol>
          </div>
        </div>

        {/* Important Grading Notice */}
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-accent rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="mb-1">Important Grading Information</p>
              <p className="text-sm text-muted-foreground">
                A correct answer alone does not guarantee a perfect grade. The reasoning and
                method are essential. Please show your complete working and explain your thought
                process.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Method Selector */}
        <div className="mb-6">
          <label className="block mb-3">Choose Submission Method</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSubmissionMethod("text")}
              className={`p-5 rounded-xl border-2 transition-all ${
                submissionMethod === "text"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText
                  className={`w-6 h-6 ${
                    submissionMethod === "text" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <div className="text-left">
                  <div
                    className={submissionMethod === "text" ? "text-primary" : "text-foreground"}
                  >
                    Write Answer
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Type your solution directly
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSubmissionMethod("upload")}
              className={`p-5 rounded-xl border-2 transition-all ${
                submissionMethod === "upload"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Upload
                  className={`w-6 h-6 ${
                    submissionMethod === "upload" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <div className="text-left">
                  <div
                    className={submissionMethod === "upload" ? "text-primary" : "text-foreground"}
                  >
                    Upload File
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Upload document or image
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Submission Area */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-6">
          <h2 className="text-xl mb-4">Your Submission</h2>

          {submissionMethod === "text" ? (
            <div>
              <label className="block mb-2 text-sm">Write Your Answer</label>
              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                rows={15}
                placeholder="Show your complete working here...&#10;&#10;Question 1:&#10;Given: x² - 5x + 6 = 0&#10;Using the quadratic formula...&#10;&#10;Question 2:&#10;..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono text-sm"
              />
              <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>Support for formatting coming soon</span>
                <span>{textAnswer.length} characters</span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block mb-2 text-sm">Upload Your Work</label>
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <p className="mb-2">
                        <span className="text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Accepted formats: Images (JPG, PNG), PDF, DOCX
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        {uploadedFile.includes("image") ? (
                          <Image className="w-5 h-5 text-primary" />
                        ) : (
                          <FileType className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm">{uploadedFile}</p>
                        <p className="text-xs text-muted-foreground">2.4 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-destructive hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <button
                    onClick={() => setUploadedFile("homework_solution_scan.jpg")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors text-sm text-muted-foreground"
                  >
                    Upload another file
                  </button>
                </div>
              )}

              {!uploadedFile && (
                <button
                  onClick={() => setUploadedFile("homework_solution_scan.jpg")}
                  className="mt-4 w-full bg-primary/10 text-primary py-3 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  Select File
                </button>
              )}
            </div>
          )}
        </div>

        {/* AI Grading Info */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 mb-6">
          <h3 className="mb-2">AI Grading Criteria</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your submission will be evaluated based on:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Quality of reasoning and explanation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Correctness of method used</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Step-by-step working shown</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Final answer accuracy</span>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="flex-1 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
          >
            Save as Draft
          </button>
          <button className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Submit Homework
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
