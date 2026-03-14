import TeacherLayout from "../components/TeacherLayout";
import { Users, TrendingUp, BookOpen, Sparkles } from "lucide-react";

export default function TeacherDashboard() {
  const classes = [
    {
      id: 1,
      name: "Mathematics 101",
      students: 28,
      avgProgress: 78,
      color: "bg-primary",
    },
    {
      id: 2,
      name: "Physics Advanced",
      students: 24,
      avgProgress: 82,
      color: "bg-secondary",
    },
    {
      id: 3,
      name: "Chemistry Basics",
      students: 32,
      avgProgress: 65,
      color: "bg-accent",
    },
  ];

  const recentActivity = [
    {
      student: "Emma Johnson",
      action: "Completed homework",
      course: "Mathematics 101",
      time: "2 hours ago",
    },
    {
      student: "Liam Smith",
      action: "Improved in Algebra",
      course: "Mathematics 101",
      time: "4 hours ago",
    },
    {
      student: "Sophia Davis",
      action: "Submitted assignment",
      course: "Physics Advanced",
      time: "5 hours ago",
    },
  ];

  const aiInsights = [
    {
      insight: "28% of students struggling with quadratic equations",
      severity: "high",
      class: "Mathematics 101",
    },
    {
      insight: "Average test scores improved by 12% this week",
      severity: "positive",
      class: "All Classes",
    },
    {
      insight: "3 students need additional support in Chemistry",
      severity: "medium",
      class: "Chemistry Basics",
    },
  ];

  return (
    <TeacherLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl mb-1">3</div>
            <div className="text-sm text-muted-foreground">Active Classes</div>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-secondary/10 p-3 rounded-xl">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <div className="text-2xl mb-1">84</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>


          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">156</div>
            <div className="text-sm text-muted-foreground">AI Insights Generated</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Classes */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl mb-4">Your Classes</h2>
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`${cls.color} p-3 rounded-xl text-white`}>
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg">{cls.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cls.students} students enrolled
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl mb-4">Recent Activity</h2>
              <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="mb-1">
                          <span>{activity.student}</span>
                          <span className="text-muted-foreground"> {activity.action}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <h2 className="text-xl mb-4">AI Insights</h2>
            <div className="space-y-4">
              {aiInsights.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${
                    item.severity === "high"
                      ? "bg-red-50 border-red-500"
                      : item.severity === "positive"
                      ? "bg-green-50 border-secondary"
                      : "bg-amber-50 border-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles
                      className={`w-5 h-5 mt-0.5 ${
                        item.severity === "high"
                          ? "text-red-600"
                          : item.severity === "positive"
                          ? "text-secondary"
                          : "text-accent"
                      }`}
                    />
                    <div>
                      <p className="text-sm mb-1">{item.insight}</p>
                      <p className="text-xs text-muted-foreground">{item.class}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
