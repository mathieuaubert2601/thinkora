import { useNavigate } from "react-router";
import StudentLayout from "../components/StudentLayout";
import { Sparkles, ArrowRight, Target, Heart } from "lucide-react";

export default function PersonalizedLearning() {
  const navigate = useNavigate();

  const personalizedTasks = [
    {
      id: 1,
      concept: "Quadratic Equations",
      hobby: "Video Games",
      title: "Understanding Functions through Game Mechanics",
      description: "Learn how quadratic equations model projectile motion in your favorite games",
      progress: 60,
      difficulty: "Medium",
    },
    {
      id: 2,
      concept: "Graphing Techniques",
      hobby: "Music",
      title: "Visualizing Sound Waves",
      description: "Explore how graphs represent musical frequencies and harmonies",
      progress: 0,
      difficulty: "Easy",
    },
    {
      id: 3,
      concept: "Systems of Equations",
      hobby: "Cooking",
      title: "Recipe Scaling and Proportions",
      description: "Master systems of equations by adjusting recipe quantities",
      progress: 30,
      difficulty: "Medium",
    },
  ];

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl">Personalized Learning</h1>
          </div>
          <p className="text-muted-foreground">
            AI-generated tasks designed just for you, based on your interests
          </p>
        </div>

        {/* Interest Profile */}
        <div className="mb-8 bg-gradient-to-br from-primary to-[#8b87f7] p-6 rounded-xl text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl mb-2">Your Learning Profile</h2>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Interests: Video Games, Music, Cooking</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-sm">
              Update Interests
            </button>
          </div>
        </div>

        {/* Personalized Tasks */}
        <div className="space-y-4">
          {personalizedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="text-sm text-primary">Target: {task.concept}</span>
                    </div>
                    <h3 className="text-xl mb-2">{task.title}</h3>
                    <p className="text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          Tailored to: <span className="text-foreground">{task.hobby}</span>
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        task.difficulty === "Easy" 
                          ? "bg-green-100 text-green-700"
                          : task.difficulty === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/student/task/${task.id}`)}
                    className="ml-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-md"
                  >
                    {task.progress > 0 ? "Continue" : "Start"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {task.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendation Box */}
        <div className="mt-8 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-xl border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="bg-primary p-3 rounded-xl shrink-0">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg mb-2">AI Recommendation</h3>
              <p className="text-muted-foreground mb-4">
                Based on your recent performance, we recommend focusing on "Quadratic Equations" 
                next. The video game-themed lesson will help you understand this concept better!
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm">
                View Recommendation
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
