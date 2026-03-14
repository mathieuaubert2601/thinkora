import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, BookOpen, GraduationCap, LogOut, Settings, BarChart3 } from "lucide-react";
import thinkoraLogo from "@/assets/79e589be87bee90c30cc390d1043c26dfe1b30b4.png";

interface StudentLayoutProps {
  children: ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    { icon: BarChart3, label: "My Analytics", path: "/student/analytics" },
    { icon: Settings, label: "Settings", path: "/student/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 sidebar-gradient text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <img src={thinkoraLogo} alt="Thinkora" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Thinkora</h1>
              <p className="text-[10px] uppercase tracking-wider opacity-60">Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive(item.path)
                  ? "bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}