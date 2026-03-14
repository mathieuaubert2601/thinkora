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
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <img src={thinkoraLogo} alt="Thinkora" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-xl">Thinkora</h1>
              <p className="text-xs text-muted-foreground">Student Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:bg-muted"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
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