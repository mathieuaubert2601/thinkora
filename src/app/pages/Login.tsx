import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Mail, Lock, Sparkles, Shield, User, TrendingUp, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import thinkoraLogo from "@/assets/79e589be87bee90c30cc390d1043c26dfe1b30b4.png";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Data Protection & Security */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-[#8b87f7] p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1726831662572-ea2bb962dc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGVkdWNhdGlvbiUyMGxlYXJuaW5nJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3MzQ4MzQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="AI Learning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <img src={thinkoraLogo} alt="Thinkora Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-4xl">Thinkora</h1>
              <p className="text-white/90 text-sm mt-1">Learning Through Guided Thinking</p>
            </div>
          </div>

          {/* Main Educational Message */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Adaptive Learning Platform</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-6">
              <h2 className="text-2xl mb-4">The First Platform That Truly Connects Students & Teachers</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mb-1">Adapts to Each Student's Learning Style</h3>
                    <p className="text-white/80 text-sm">
                      Personalized content through text, video, audio, or images — matching how each student learns best
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mb-1">Reduces Learning Gaps</h3>
                    <p className="text-white/80 text-sm">
                      AI-driven tasks and personalized learning paths ensure no student is left behind
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg mt-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mb-1">Strengthens Teacher-Student Connection</h3>
                    <p className="text-white/80 text-sm">
                      Real-time insights and adaptive feedback create a closer, more effective learning relationship
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary: Data Protection */}
            <div className="text-center text-xs text-white/70 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-3 h-3" />
                <span>European Data Sovereignty</span>
              </div>
              <p>Mistral AI • OVH France Hosting • GDPR Compliant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">{isSignup ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-muted-foreground">
              {isSignup ? "Start your learning journey" : "Sign in to continue"}
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block mb-3 text-sm">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-4 rounded-xl border-2 transition-all ${role === "student"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                <GraduationCap className={`w-6 h-6 mb-2 mx-auto ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
                <div className={role === "student" ? "text-primary" : "text-foreground"}>Student</div>
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`p-4 rounded-xl border-2 transition-all ${role === "teacher"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50"
                  }`}
              >
                <GraduationCap className={`w-6 h-6 mb-2 mx-auto ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`} />
                <div className={role === "teacher" ? "text-primary" : "text-foreground"}>Teacher</div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </span>{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}