import { useState } from "react";
import TeacherLayout from "../components/TeacherLayout";
import { Upload, Sparkles, X, Link, Users, Plus, Edit2, Check, Tag } from "lucide-react";

type Competency = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export default function CourseCreation() {
  const [courseName, setCourseName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [strictness, setStrictness] = useState(50);
  const [preferredSources, setPreferredSources] = useState<string[]>([]);
  const [newSource, setNewSource] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [newCompetencies, setNewCompetencies] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
    3: "",
  });

  const classes = [
    { id: 1, name: "Mathematics 101 - Section A" },
    { id: 2, name: "Mathematics 101 - Section B" },
    { id: 3, name: "Physics Advanced" },
  ];

  const handleExtractConcepts = () => {
    setExtracting(true);
    // Simulate AI extraction with competencies organized by levels
    setTimeout(() => {
      setCompetencies([
        // Level 1 - Fundamentals
        { id: "1-1", text: "Understand basic functions", level: 1 },
        { id: "1-2", text: "Interpret simple graphs", level: 1 },
        { id: "1-3", text: "Solve linear equations", level: 1 },
        { id: "1-4", text: "Identify function types", level: 1 },
        { id: "1-5", text: "Apply order of operations", level: 1 },
        
        // Level 2 - Advanced
        { id: "2-1", text: "Analyze function behavior", level: 2 },
        { id: "2-2", text: "Combine multiple equations", level: 2 },
        { id: "2-3", text: "Interpret complex graphs", level: 2 },
        { id: "2-4", text: "Apply transformations to functions", level: 2 },
        
        // Level 3 - Expert
        { id: "3-1", text: "Model real-world problems with functions", level: 3 },
        { id: "3-2", text: "Optimize equations", level: 3 },
        { id: "3-3", text: "Explain mathematical reasoning", level: 3 },
      ]);
      setExtracting(false);
    }, 1500);
  };

  const removeCompetency = (id: string) => {
    setCompetencies(competencies.filter((c) => c.id !== id));
  };

  const startEdit = (comp: Competency) => {
    setEditingId(comp.id);
    setEditText(comp.text);
  };

  const saveEdit = (id: string) => {
    setCompetencies(
      competencies.map((c) => (c.id === id ? { ...c, text: editText } : c))
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const addCompetency = (level: 1 | 2 | 3) => {
    const text = newCompetencies[level];
    if (text.trim()) {
      const newId = `${level}-${Date.now()}`;
      setCompetencies([...competencies, { id: newId, text: text.trim(), level }]);
      setNewCompetencies({ ...newCompetencies, [level]: "" });
    }
  };

  const addSource = () => {
    if (newSource.trim()) {
      setPreferredSources([...preferredSources, newSource.trim()]);
      setNewSource("");
    }
  };

  const removeSource = (index: number) => {
    setPreferredSources(preferredSources.filter((_, i) => i !== index));
  };

  const getStrictnessLabel = () => {
    if (strictness < 33) return "Lenient";
    if (strictness < 66) return "Balanced";
    return "Strict";
  };

  const getStrictnessColor = () => {
    if (strictness < 33) return "text-secondary";
    if (strictness < 66) return "text-accent";
    return "text-destructive";
  };

  const getLevelInfo = (level: 1 | 2 | 3) => {
    switch (level) {
      case 1:
        return {
          title: "Level 1 – Fundamental Knowledge",
          description: "Minimum required concepts that students must understand",
          color: "bg-secondary/10 text-secondary border-secondary/20",
          badge: "bg-secondary/10 text-secondary",
        };
      case 2:
        return {
          title: "Level 2 – Advanced Knowledge",
          description: "Concepts requiring deeper reasoning and application",
          color: "bg-accent/10 text-accent border-accent/20",
          badge: "bg-accent/10 text-accent",
        };
      case 3:
        return {
          title: "Level 3 – Expert Knowledge",
          description: "Highest level expected for this academic level",
          color: "bg-destructive/10 text-destructive border-destructive/20",
          badge: "bg-destructive/10 text-destructive",
        };
    }
  };

  return (
    <TeacherLayout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Create New Course</h1>
          <p className="text-muted-foreground">Set up a new course and let AI extract key concepts</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
          {/* Select Class FIRST */}
          <div>
            <label className="block mb-2">Assign to Class *</label>
            <p className="text-sm text-muted-foreground mb-3">
              Select which class this course will be assigned to
            </p>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
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

          {/* Course Title */}
          <div>
            <label className="block mb-2">Course Title</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Algebra Fundamentals"
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              rows={4}
              placeholder="Provide a brief description of the course..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Preferred Learning Sources */}
          <div>
            <label className="block mb-2">Preferred Learning Sources</label>
            <p className="text-sm text-muted-foreground mb-3">
              Define educational sources that AI should prioritize when generating explanations and exercises
            </p>
            
            {preferredSources.length > 0 && (
              <div className="mb-3 space-y-2">
                {preferredSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Link className="w-4 h-4 text-primary" />
                      <span className="text-sm">{source}</span>
                    </div>
                    <button
                      onClick={() => removeSource(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSource()}
                placeholder="e.g., Khan Academy, OpenStax Textbook, etc."
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={addSource}
                className="px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* AI Grading Strictness */}
          <div>
            <label className="block mb-2">AI Grading Strictness</label>
            <p className="text-sm text-muted-foreground mb-4">
              Control how strict the AI grading will be for this course
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lenient</span>
                <span className={`text-lg ${getStrictnessColor()}`}>
                  {getStrictnessLabel()}
                </span>
                <span className="text-sm text-muted-foreground">Strict</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={strictness}
                onChange={(e) => setStrictness(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
              
              <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                <div className="text-left">
                  <p className="text-secondary mb-1">More forgiving</p>
                  <p>Encourages effort</p>
                </div>
                <div className="text-center">
                  <p className="text-accent mb-1">Moderate</p>
                  <p>Standard grading</p>
                </div>
                <div className="text-right">
                  <p className="text-destructive mb-1">Demanding</p>
                  <p>High expectations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Learning Materials */}
          <div>
            <label className="block mb-2">Upload Learning Materials</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="mb-1">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOCX, PPTX up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Files Preview */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">algebra_textbook_chapter3.pdf</p>
                    <p className="text-xs text-muted-foreground">2.4 MB</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Extract Concepts Button */}
          <div className="pt-4">
            <button
              onClick={handleExtractConcepts}
              disabled={extracting}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-5 h-5 ${extracting ? "animate-spin" : ""}`} />
              {extracting ? "Extracting Concepts..." : "Extract Key Concepts with AI"}
            </button>
          </div>

          {/* Extracted Concepts with Levels */}
          {competencies.length > 0 && (
            <div className="pt-4 border-t border-border space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg">Course Competencies by Level</h3>
              </div>

              {/* Level 1 - Fundamental */}
              <div className="bg-card rounded-xl border-2 border-secondary/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20">
                        Level 1
                      </div>
                      <h4 className="">Level 1 – Fundamental Knowledge</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Minimum required concepts that students must understand
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {competencies
                    .filter((c) => c.level === 1)
                    .map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center gap-2 p-3 bg-secondary/5 rounded-xl border border-secondary/10 group"
                      >
                        {editingId === comp.id ? (
                          <>
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 px-3 py-1 rounded-lg border border-secondary bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary/20"
                              autoFocus
                            />
                            <button
                              onClick={() => saveEdit(comp.id)}
                              className="p-1 text-secondary hover:bg-secondary/10 rounded-lg"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-muted-foreground hover:bg-muted rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-secondary">•</span>
                            <span className="flex-1 text-sm">{comp.text}</span>
                            <button
                              onClick={() => startEdit(comp)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-secondary transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCompetency(comp.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCompetencies[1]}
                    onChange={(e) =>
                      setNewCompetencies({ ...newCompetencies, 1: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addCompetency(1)}
                    placeholder="Add new fundamental competency..."
                    className="flex-1 px-4 py-2 rounded-xl border border-secondary/20 bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary text-sm"
                  />
                  <button
                    onClick={() => addCompetency(1)}
                    className="px-4 py-2 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Level 2 - Advanced */}
              <div className="bg-card rounded-xl border-2 border-accent/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/20">
                        Level 2
                      </div>
                      <h4 className="">Level 2 – Advanced Knowledge</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Concepts requiring deeper reasoning and application
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {competencies
                    .filter((c) => c.level === 2)
                    .map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center gap-2 p-3 bg-accent/5 rounded-xl border border-accent/10 group"
                      >
                        {editingId === comp.id ? (
                          <>
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 px-3 py-1 rounded-lg border border-accent bg-input-background focus:outline-none focus:ring-2 focus:ring-accent/20"
                              autoFocus
                            />
                            <button
                              onClick={() => saveEdit(comp.id)}
                              className="p-1 text-accent hover:bg-accent/10 rounded-lg"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-muted-foreground hover:bg-muted rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-accent">•</span>
                            <span className="flex-1 text-sm">{comp.text}</span>
                            <button
                              onClick={() => startEdit(comp)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-accent transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCompetency(comp.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCompetencies[2]}
                    onChange={(e) =>
                      setNewCompetencies({ ...newCompetencies, 2: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addCompetency(2)}
                    placeholder="Add new advanced competency..."
                    className="flex-1 px-4 py-2 rounded-xl border border-accent/20 bg-input-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
                  />
                  <button
                    onClick={() => addCompetency(2)}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-xl hover:bg-accent/20 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Level 3 - Expert */}
              <div className="bg-card rounded-xl border-2 border-destructive/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm border border-destructive/20">
                        Level 3
                      </div>
                      <h4 className="">Level 3 – Expert Knowledge</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Highest level expected for this academic level
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {competencies
                    .filter((c) => c.level === 3)
                    .map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center gap-2 p-3 bg-destructive/5 rounded-xl border border-destructive/10 group"
                      >
                        {editingId === comp.id ? (
                          <>
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 px-3 py-1 rounded-lg border border-destructive bg-input-background focus:outline-none focus:ring-2 focus:ring-destructive/20"
                              autoFocus
                            />
                            <button
                              onClick={() => saveEdit(comp.id)}
                              className="p-1 text-destructive hover:bg-destructive/10 rounded-lg"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-muted-foreground hover:bg-muted rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-destructive">•</span>
                            <span className="flex-1 text-sm">{comp.text}</span>
                            <button
                              onClick={() => startEdit(comp)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCompetency(comp.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCompetencies[3]}
                    onChange={(e) =>
                      setNewCompetencies({ ...newCompetencies, 3: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addCompetency(3)}
                    placeholder="Add new expert competency..."
                    className="flex-1 px-4 py-2 rounded-xl border border-destructive/20 bg-input-background focus:outline-none focus:ring-2 focus:ring-destructive/20 focus:border-destructive text-sm"
                  />
                  <button
                    onClick={() => addCompetency(3)}
                    className="px-4 py-2 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md">
              Create Course
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}