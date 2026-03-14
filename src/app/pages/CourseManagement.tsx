import { useState } from "react";
import { useNavigate } from "react-router";
import TeacherLayout from "../components/TeacherLayout";
import { ChevronDown, ChevronRight, Plus, BookOpen, Power, Gamepad2 } from "lucide-react";

type Course = {
  id: number;
  name: string;
  active: boolean;
  chapters: number;
  students: number;
  youngMode?: boolean;
};

type ClassData = {
  id: number;
  name: string;
  courses: Course[];
};

export default function CourseManagement() {
  const navigate = useNavigate();
  const [expandedClasses, setExpandedClasses] = useState<number[]>([1]);
  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 1,
      name: "Mathematics 101 - Section A",
      courses: [
        { id: 1, name: "Algebra Fundamentals", active: true, chapters: 8, students: 24 },
        { id: 2, name: "Geometry Basics", active: true, chapters: 6, students: 24 },
        { id: 3, name: "Trigonometry Intro", active: false, chapters: 5, students: 24 },
      ],
    },
    {
      id: 2,
      name: "Physics Advanced",
      courses: [
        { id: 4, name: "Classical Mechanics", active: true, chapters: 10, students: 18 },
        { id: 5, name: "Thermodynamics", active: false, chapters: 7, students: 18 },
      ],
    },
    {
      id: 3,
      name: "Chemistry Basics",
      courses: [
        { id: 6, name: "Organic Chemistry", active: true, chapters: 9, students: 20 },
      ],
    },
  ]);

  const toggleClass = (classId: number) => {
    setExpandedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  const toggleCourseActive = (classId: number, courseId: number) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              courses: cls.courses.map((course) =>
                course.id === courseId ? { ...course, active: !course.active } : course
              ),
            }
          : cls
      )
    );
  };

  const toggleYoungMode = (courseId: number) => {
    const key = `youngMode_${courseId}`;
    const current = localStorage.getItem(key) === "true";
    localStorage.setItem(key, String(!current));
    // Force re-render by updating state if necessary, but here we just update local storage
    // or we could add it to the course object if we want it reactive in this view too.
    setClasses((prev) =>
      prev.map((cls) => ({
        ...cls,
        courses: cls.courses.map((c) => 
          c.id === courseId ? { ...c, youngMode: !current } : c
        )
      }))
    );
  };

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Course Management</h1>
            <p className="text-muted-foreground">Manage courses across all your classes</p>
          </div>
          <button
            onClick={() => navigate("/teacher/courses/new")}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Course</span>
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
                      {classData.courses.length} course{classData.courses.length !== 1 ? "s" : ""} •{" "}
                      {classData.courses.filter((c) => c.active).length} active
                    </p>
                  </div>
                </div>
              </button>

              {/* Courses List */}
              {expandedClasses.includes(classData.id) && (
                <div className="border-t border-border">
                  {classData.courses.length === 0 ? (
                    <div className="p-8 text-center">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground mb-4">No courses yet</p>
                      <button
                        onClick={() => navigate("/teacher/courses/new")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create First Course</span>
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {classData.courses.map((course) => (
                        <div
                          key={course.id}
                          className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`p-3 rounded-xl ${course.active ? "bg-primary/10" : "bg-muted"}`}>
                              <BookOpen className={`w-5 h-5 ${course.active ? "text-primary" : "text-muted-foreground"}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className={course.active ? "" : "text-muted-foreground"}>{course.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {course.chapters} chapters • {course.students} students
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Young Mode Toggle */}
                            <button
                              onClick={() => toggleYoungMode(course.id)}
                              title={course.youngMode ? "Young Students Mode Active" : "Enable Young Mode"}
                              className={`p-2 rounded-xl border-2 transition-all ${
                                course.youngMode
                                  ? "border-secondary bg-secondary/10 text-secondary shadow-sm"
                                  : "border-muted text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              <Gamepad2 className={`w-5 h-5 ${course.youngMode ? "animate-pulse" : ""}`} />
                            </button>

                            {/* Active/Inactive Toggle */}
                            <button
                              onClick={() => toggleCourseActive(classData.id, course.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                                course.active
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-muted-foreground/30 bg-muted text-muted-foreground"
                              }`}
                            >
                              <Power className="w-4 h-4" />
                              <span className="text-sm">{course.active ? "Active" : "Inactive"}</span>
                            </button>
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

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl mb-2">No Classes Yet</h2>
            <p className="text-muted-foreground mb-6">Start by creating your first class and course</p>
            <button
              onClick={() => navigate("/teacher/courses/new")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Course</span>
            </button>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
