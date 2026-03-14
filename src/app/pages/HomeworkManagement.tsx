import { useState } from "react";
import { useNavigate } from "react-router";
import TeacherLayout from "../components/TeacherLayout";
import { ChevronDown, ChevronRight, Plus, FileText, Users, User, Calendar } from "lucide-react";

type Homework = {
  id: number;
  title: string;
  dueDate: string;
  assignedTo: "class" | "student";
  studentName?: string;
  submitted: number;
  total: number;
};

type Chapter = {
  id: number;
  name: string;
  homework: Homework[];
};

type ClassData = {
  id: number;
  name: string;
  chapters: Chapter[];
};

export default function HomeworkManagement() {
  const navigate = useNavigate();
  const [expandedClasses, setExpandedClasses] = useState<number[]>([1]);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);
  
  const classes: ClassData[] = [
    {
      id: 1,
      name: "Mathematics 101 - Section A",
      chapters: [
        {
          id: 1,
          name: "Linear Equations",
          homework: [
            { id: 1, title: "Week 3: Linear Equations Practice", dueDate: "Mar 20, 2026", assignedTo: "class", submitted: 18, total: 24 },
            { id: 2, title: "Extra Practice - Emma", dueDate: "Mar 22, 2026", assignedTo: "student", studentName: "Emma Johnson", submitted: 0, total: 1 },
          ],
        },
        {
          id: 2,
          name: "Quadratic Functions",
          homework: [
            { id: 3, title: "Quadratic Equations Homework", dueDate: "Mar 25, 2026", assignedTo: "class", submitted: 20, total: 24 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Physics Advanced",
      chapters: [
        {
          id: 3,
          name: "Newton's Laws",
          homework: [
            { id: 4, title: "Classical Mechanics Assignment", dueDate: "Mar 18, 2026", assignedTo: "class", submitted: 15, total: 18 },
          ],
        },
      ],
    },
  ];

  const toggleClass = (classId: number) => {
    setExpandedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Homework Management</h1>
            <p className="text-muted-foreground">Manage homework assignments across classes and chapters</p>
          </div>
          <button
            onClick={() => navigate("/teacher/homework/new")}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Homework</span>
          </button>
        </div>

        <div className="space-y-4">
          {classes.map((classData) => (
            <div key={classData.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Class Header */}
              <button
                onClick={() => toggleClass(classData.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedClasses.includes(classData.id) ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="text-left">
                    <h2 className="text-xl">{classData.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {classData.chapters.length} chapter{classData.chapters.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </button>

              {/* Chapters List */}
              {expandedClasses.includes(classData.id) && (
                <div className="border-t border-border">
                  {classData.chapters.length === 0 ? (
                    <div className="p-8 text-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground mb-4">No chapters yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {classData.chapters.map((chapter) => (
                        <div key={chapter.id}>
                          {/* Chapter Header */}
                          <button
                            onClick={() => toggleChapter(chapter.id)}
                            className="w-full flex items-center justify-between p-4 pl-12 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {expandedChapters.includes(chapter.id) ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              )}
                              <div className="text-left">
                                <h3>{chapter.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                  {chapter.homework.length} homework assignment{chapter.homework.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Homework List */}
                          {expandedChapters.includes(chapter.id) && (
                            <div className="bg-muted/20">
                              {chapter.homework.length === 0 ? (
                                <div className="p-8 pl-20 text-center">
                                  <p className="text-muted-foreground text-sm mb-3">No homework for this chapter</p>
                                  <button
                                    onClick={() => navigate("/teacher/homework/new")}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span>Assign Homework</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="divide-y divide-border/50">
                                  {chapter.homework.map((hw) => (
                                    <div
                                      key={hw.id}
                                      className="p-4 pl-20 flex items-center justify-between hover:bg-muted/30 transition-colors"
                                    >
                                      <div className="flex items-center gap-4 flex-1">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                          {hw.assignedTo === "class" ? (
                                            <Users className="w-4 h-4 text-primary" />
                                          ) : (
                                            <User className="w-4 h-4 text-accent" />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="mb-1">{hw.title}</h4>
                                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            {hw.assignedTo === "student" && hw.studentName && (
                                              <span className="px-2 py-0.5 bg-accent/10 text-accent rounded">
                                                {hw.studentName}
                                              </span>
                                            )}
                                            <div className="flex items-center gap-1">
                                              <Calendar className="w-3 h-3" />
                                              <span>{hw.dueDate}</span>
                                            </div>
                                            <span>
                                              {hw.submitted}/{hw.total} submitted
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        {/* Progress Bar */}
                                        <div className="w-32">
                                          <div className="w-full bg-background rounded-full h-2">
                                            <div
                                              className={`h-2 rounded-full transition-all ${
                                                hw.submitted === hw.total
                                                  ? "bg-secondary"
                                                  : "bg-primary"
                                              }`}
                                              style={{
                                                width: `${(hw.submitted / hw.total) * 100}%`,
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl mb-2">No Classes Yet</h2>
            <p className="text-muted-foreground mb-6">Start by creating homework for your classes</p>
            <button
              onClick={() => navigate("/teacher/homework/new")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Homework</span>
            </button>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
