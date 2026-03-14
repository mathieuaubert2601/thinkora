import StudentLayout from "../components/StudentLayout";
import { useNavigate } from "react-router";
import { Clock, CheckCircle, AlertCircle, Trophy } from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const homeworkList = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      course: "Mathematics 101",
      dueDate: "Mar 18, 2026",
      status: "pending",
      points: 100,
    },
    {
      id: 2,
      title: "Newton's Laws Assignment",
      course: "Physics Advanced",
      dueDate: "Mar 20, 2026",
      status: "pending",
      points: 50,
    },
    {
      id: 3,
      title: "Chemical Bonding Quiz",
      course: "Chemistry Basics",
      dueDate: "Mar 15, 2026",
      status: "graded",
      points: 75,
      score: 68,
    },
    {
      id: 4,
      title: "Polynomial Operations",
      course: "Mathematics 101",
      dueDate: "Mar 12, 2026",
      status: "graded",
      points: 100,
      score: 88,
    },
  ];



  const stats = [
    { label: "Assignments Due", value: "2", icon: Clock, color: "bg-accent" },
    { label: "Completed", value: "12", icon: CheckCircle, color: "bg-secondary" },
    { label: "Average Score", value: "78%", icon: Trophy, color: "bg-primary" },
  ];

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, Emma!</h1>
          <p className="text-muted-foreground">Here's your learning progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Homework List */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-xl mb-4">My Homework</h2>
              <div className="space-y-3">
                {homeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-1">{hw.title}</h3>
                        <p className="text-sm text-muted-foreground">{hw.course}</p>
                      </div>
                      {hw.status === "pending" && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                          Pending
                        </span>
                      )}
                      {hw.status === "graded" && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Graded
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Due {hw.dueDate}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {hw.points} points
                        </div>
                      </div>
                      {hw.score !== undefined && (
                        <div className="text-primary">
                          Score: {hw.score}/{hw.points}
                        </div>
                      )}
                    </div>

                    {hw.status === "pending" && (
                      <button
                        onClick={() => navigate(`/student/homework/${hw.id}`)}
                        className="mt-3 w-full bg-primary text-primary-foreground py-2 rounded-xl hover:bg-primary/90 transition-colors">
                        Start Assignment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}