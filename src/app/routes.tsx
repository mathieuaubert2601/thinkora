import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import CourseManagement from "./pages/CourseManagement";
import CourseCreation from "./pages/CourseCreation";
import CourseAnalysis from "./pages/CourseAnalysis";
import HomeworkManagement from "./pages/HomeworkManagement";
import HomeworkAssignment from "./pages/HomeworkAssignment";
import Analytics from "./pages/Analytics";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSettings from "./pages/StudentSettings";
import StudentAnalytics from "./pages/StudentAnalytics";
import HomeworkSubmission from "./pages/HomeworkSubmission";
import TailoredTask from "./pages/TailoredTask";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/teacher/dashboard",
    Component: TeacherDashboard,
  },
  {
    path: "/teacher/courses",
    Component: CourseManagement,
  },
  {
    path: "/teacher/courses/new",
    Component: CourseCreation,
  },
  {
    path: "/teacher/courses/analysis",
    Component: CourseAnalysis,
  },
  {
    path: "/teacher/homework",
    Component: HomeworkManagement,
  },
  {
    path: "/teacher/homework/new",
    Component: HomeworkAssignment,
  },
  {
    path: "/teacher/analytics",
    Component: Analytics,
  },
  {
    path: "/student/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/student/settings",
    Component: StudentSettings,
  },
  {
    path: "/student/analytics",
    Component: StudentAnalytics,
  },
  {
    path: "/student/homework/:id",
    Component: HomeworkSubmission,
  },
  {
    path: "/student/task",
    Component: TailoredTask,
  },
]);