import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Plus, 
  Filter, 
  Menu, 
  X,
  Download,
  GraduationCap,
  Briefcase,
  FileText,
  PieChart as PieChartIcon,
  Lock,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Page = "dashboard" | "attendance" | "curriculum" | "students" | "teachers" | "timetable" | "communication" | "admin" | "reports" | "marks";

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  activeActivities: number;
  avgAttendance: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  attendance: number;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
  experience: string;
}

interface Activity {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
}

interface TimetableSlot {
  time: string;
  subject: string;
  teacher: string;
}

interface TimetableDay {
  day: string;
  slots: TimetableSlot[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
}

interface Report {
  id: string;
  name: string;
  date: string;
  size: string;
  type: string;
  category: string;
}

interface Place {
  id: string;
  name: string;
}

// --- Components ---

const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
              <ShieldCheck size={32} className="text-white" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Enter your credentials to access EduSmart</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-300"
                  placeholder="password"
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demo Credentials</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button"
                  onClick={() => { setEmail("dharanithasekar23@gmail.com"); setPassword("password"); }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                >
                  Dharani (Admin)
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail("admin@school.com"); setPassword("password"); }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                >
                  Admin
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail("teacher@school.com"); setPassword("password"); }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                >
                  Teacher
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail("student@school.com"); setPassword("password"); }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                >
                  Student
                </button>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-500 text-xs font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-200 text-emerald-500 focus:ring-emerald-500/20" />
                Remember me
              </label>
              <button type="button" className="text-emerald-500 font-bold hover:underline">Forgot Password?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs">
              Don't have an account? <button className="text-emerald-500 font-bold hover:underline">Contact Support</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon size={20} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
    <span className="font-medium">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
  </button>
);

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      {trend && (
        <span className={cn(
          "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
          trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          <TrendingUp size={12} className={trend < 0 ? "rotate-180" : ""} />
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </motion.div>
);

const academicYears = ["2023-24", "2024-25", "2025-26"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timetable, setTimetable] = useState<TimetableDay[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [attendanceMarking, setAttendanceMarking] = useState<Record<string, string>>({});
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedReportClass, setSelectedReportClass] = useState<string>("All Classes");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("2025-26");
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toLocaleString('en-US', { month: 'long' }));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatResponse, setAiChatResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [editingTimetableSlot, setEditingTimetableSlot] = useState<{ day: string, slotIndex: number, slot: any } | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [localPhotoUrl, setLocalPhotoUrl] = useState("");
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isAcademicYearModalOpen, setIsAcademicYearModalOpen] = useState(false);
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>("broadcast");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [attendanceThreshold, setAttendanceThreshold] = useState(75);
  const [hasCheckedExpirations, setHasCheckedExpirations] = useState(false);
  const [reportCategory, setReportCategory] = useState<string>("All");
  const [selectedGrade, setSelectedGrade] = useState<string>("All");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [editingMarksStudent, setEditingMarksStudent] = useState<any>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [passMark, setPassMark] = useState(40);
  const [isSystemConfigModalOpen, setIsSystemConfigModalOpen] = useState(false);
  const [tempStudentPhoto, setTempStudentPhoto] = useState<string | null>(null);
  const [tempTeacherPhoto, setTempTeacherPhoto] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [attendanceAnalytics, setAttendanceAnalytics] = useState<any[]>([]);
  const [academicGrowthAnalytics, setAcademicGrowthAnalytics] = useState<any[]>([]);
  const [isGeneratingAnalytics, setIsGeneratingAnalytics] = useState(false);
  const [isGeneratingAcademicGrowth, setIsGeneratingAcademicGrowth] = useState(false);
  const [isChartEditModalOpen, setIsChartEditModalOpen] = useState(false);
  const [editingChartTarget, setEditingChartTarget] = useState<"attendance" | "academic" | "reports">("attendance");
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState("Last 7 Days");
  const [notificationSettings, setNotificationSettings] = useState({
    absenceAlerts: true,
    assignmentDeadlines: true,
    eventNotifications: true,
    pushEnabled: true
  });

  // --- Interactive States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, chatId: "broadcast", text: "Welcome to the school broadcast channel!", sender: "other", time: "09:00 AM" },
    { id: 2, chatId: "broadcast", text: "All students, please check the new curriculum updates.", sender: "me", time: "12:47 PM" }
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchData();
      fetchAiInsights();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activePage === "attendance") {
      fetchAttendance();
    }
  }, [isAuthenticated, activePage, selectedAttendanceDate]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`/api/attendance?date=${selectedAttendanceDate}`);
      const data = await res.json();
      setAttendance(data);
      // Clear marking state when date changes
      setAttendanceMarking({});
    } catch (e) {
      console.error("Failed to fetch attendance", e);
    }
  };

  useEffect(() => {
    if (isProfileModalOpen) {
      setLocalPhotoUrl(user?.photoUrl || "");
    }
  }, [isProfileModalOpen, user?.photoUrl]);

  const fetchAiInsights = async () => {
    try {
      const res = await fetch("/api/ai/insights");
      const data = await res.json();
      setAiInsights(data);
    } catch (e) {
      console.error("Failed to fetch AI insights", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated && assignments.length > 0 && activities.length > 0 && !hasCheckedExpirations) {
      checkExpirations();
    }
  }, [isAuthenticated, assignments, activities, hasCheckedExpirations]);

  const checkExpirations = async () => {
    const today = new Date().toISOString().split('T')[0];
    let needsRefresh = false;

    // Check Assignments
    for (const as of assignments) {
      if (as.dueDate < today && as.status !== "Expired") {
        try {
          // Mark as expired on server
          await fetch(`/api/assignments/${as.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...as, status: "Expired" })
          });
          
          // Create notification
          await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "Assignment Expired",
              message: `The assignment "${as.title}" has reached its due date (${as.dueDate}).`,
              type: "assignment"
            })
          });
          needsRefresh = true;
        } catch (e) {
          console.error("Failed to process expired assignment", e);
        }
      }
    }

    // Check Activities
    for (const act of activities) {
      if (act.date < today && act.status !== "Completed" && act.status !== "Expired") {
        try {
          // Mark as expired on server
          await fetch(`/api/activities/${act.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...act, status: "Expired" })
          });
          
          // Create notification
          await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "Activity Expired",
              message: `The activity "${act.title}" has reached its date (${act.date}).`,
              type: "event"
            })
          });
          needsRefresh = true;
        } catch (e) {
          console.error("Failed to process expired activity", e);
        }
      }
    }

    if (needsRefresh) {
      fetchData();
    }
    setHasCheckedExpirations(true);
  };

  const handleAiChat = async (message: string) => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setAiChatResponse(data.response);
      setMessages(prev => [...prev, { id: Date.now(), text: data.response, sender: "ai", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (e) {
      console.error("AI Chat failed", e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error("Failed to fetch stats", e);
    }
  };

  const classSummaryStats = useMemo(() => {
    const filteredStudents = selectedReportClass === "All Classes" 
      ? students 
      : students.filter(s => s.grade === selectedReportClass);

    if (filteredStudents.length === 0) {
      return { academic: "0%", attendance: "0%" };
    }

    const avgAcademic = filteredStudents.reduce((acc, s) => {
      const studentAvg = s.marks.reduce((sum: number, m: any) => sum + m.score, 0) / s.marks.length;
      return acc + studentAvg;
    }, 0) / filteredStudents.length;

    const avgAttendance = filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length;

    return {
      academic: `${avgAcademic.toFixed(1)}%`,
      attendance: `${avgAttendance.toFixed(1)}%`
    };
  }, [students, selectedReportClass]);

  useEffect(() => {
    if (activePage === 'reports') {
      handleGenerateAnalytics();
      handleGenerateAcademicGrowth();
    }
  }, [selectedReportClass, activePage]);

  const handleGenerateAnalytics = async (gradeOverride?: string) => {
    setIsGeneratingAnalytics(true);
    const grade = gradeOverride || selectedReportClass;
    try {
      const res = await fetch(`/api/analytics/attendance?grade=${encodeURIComponent(grade)}`);
      const data = await res.json();
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAttendanceAnalytics(data);
    } catch (e) {
      console.error("Failed to generate analytics", e);
    } finally {
      setIsGeneratingAnalytics(false);
    }
  };

  const handleGenerateAcademicGrowth = async (gradeOverride?: string) => {
    setIsGeneratingAcademicGrowth(true);
    const grade = gradeOverride || selectedReportClass;
    try {
      const res = await fetch(`/api/analytics/academic?grade=${encodeURIComponent(grade)}`);
      const data = await res.json();
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1200));
      setAcademicGrowthAnalytics(data);
    } catch (e) {
      console.error("Failed to generate academic growth analytics", e);
    } finally {
      setIsGeneratingAcademicGrowth(false);
    }
  };

  const fetchData = async () => {
    try {
      const [sRes, tRes, aRes, nRes, ttRes, rRes, asRes, setRes, configRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/teachers"),
        fetch("/api/activities"),
        fetch("/api/notifications"),
        fetch("/api/timetable"),
        fetch("/api/reports"),
        fetch("/api/assignments"),
        fetch("/api/settings"),
        fetch("/api/config")
      ]);
      setStudents(await sRes.json());
      setTeachers(await tRes.json());
      setActivities(await aRes.json());
      setNotifications(await nRes.json());
      setTimetable(await ttRes.json());
      setReports(await rRes.json());
      setAssignments(await asRes.json());
      setNotificationSettings(await setRes.json());
      const mConfig = await configRes.json();
      setSubjects(mConfig.subjects);
      setGrades(mConfig.grades || ["10th", "11th", "12th"]);
      setDepartments(mConfig.departments || ["Science", "Humanities", "Languages", "Arts"]);
      setActivityTypes(mConfig.activityTypes || ["Curriculum", "Competition", "Arts", "Sports"]);
      setPlaces(mConfig.places || []);
      setPassMark(mConfig.passMark);
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  };

  const handleDeleteTimetableSlot = async (day: string, slotIndex: number) => {
    setConfirmationConfig({
      title: "Delete Timetable Slot",
      message: "Are you sure you want to delete this timetable slot?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/timetable/${day}/${slotIndex}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setIsTimetableModalOpen(false);
          }
        } catch (e) {
          console.error("Failed to delete timetable slot", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteReport = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Report",
      message: "Are you sure you want to delete this report?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
          if (res.ok) fetchData();
        } catch (e) {
          console.error("Failed to delete report", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteNotification = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Notification",
      message: "Are you sure you want to delete this notification?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/notifications/${id}`, { method: "DELETE" });
          if (res.ok) fetchData();
        } catch (e) {
          console.error("Failed to delete notification", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteMark = async (studentId: string, subject: string) => {
    setConfirmationConfig({
      title: "Delete Marks",
      message: `Are you sure you want to delete marks for ${subject}?`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/students/${studentId}/marks/${subject}`, { method: "DELETE" });
          if (res.ok) {
            const updatedStudent = await res.json();
            setStudents(students.map(s => s.id === studentId ? updatedStudent : s));
            if (editingMarksStudent?.id === studentId) {
              setEditingMarksStudent(updatedStudent);
            }
          }
        } catch (e) {
          console.error("Failed to delete mark", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSaveStudent = async (student: any) => {
    const method = student.id ? "PUT" : "POST";
    const url = student.id ? `/api/students/${student.id}` : "/api/students";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });
      if (res.ok) {
        fetchData();
        setIsStudentModalOpen(false);
        setEditingStudent(null);
        setTempStudentPhoto(null);
      }
    } catch (e) {
      console.error("Failed to save student", e);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Student",
      message: "Are you sure you want to delete this student? All their records will be removed.",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setIsStudentModalOpen(false);
          }
        } catch (e) {
          console.error("Failed to delete student", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleMarkAttendance = (studentId: string, status: string) => {
    setAttendanceMarking(prev => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = async () => {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedAttendanceDate,
          records: Object.entries(attendanceMarking).map(([studentId, status]) => ({ studentId, status }))
        })
      });
      if (response.ok) {
        fetchAttendance();
        setAttendanceMarking({});
      }
    } catch (e) {
      console.error("Failed to save attendance", e);
    }
  };

  const handleSaveTeacher = async (teacher: any) => {
    const method = teacher.id ? "PUT" : "POST";
    const url = teacher.id ? `/api/teachers/${teacher.id}` : "/api/teachers";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher),
      });
      if (res.ok) {
        fetchData();
        setIsTeacherModalOpen(false);
        setEditingTeacher(null);
        setTempTeacherPhoto(null);
      }
    } catch (e) {
      console.error("Failed to save teacher", e);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Teacher",
      message: "Are you sure you want to delete this teacher?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setIsTeacherModalOpen(false);
          }
        } catch (e) {
          console.error("Failed to delete teacher", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleAddPlace = async (name: string) => {
    try {
      const res = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) fetchData();
    } catch (e) {
      console.error("Failed to add place", e);
    }
  };

  const handleDeletePlace = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Place",
      message: "Are you sure you want to delete this place?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/places/${id}`, { method: "DELETE" });
          if (res.ok) fetchData();
        } catch (e) {
          console.error("Failed to delete place", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleSaveAssignment = async (assignment: any) => {
    const method = assignment.id ? "PUT" : "POST";
    const url = assignment.id ? `/api/assignments/${assignment.id}` : "/api/assignments";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignment),
      });
      if (res.ok) {
        fetchData();
        setIsAssignmentModalOpen(false);
        setEditingAssignment(null);
      }
    } catch (e) {
      console.error("Failed to save assignment", e);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Assignment",
      message: "Are you sure you want to delete this assignment?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/assignments/${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setIsAssignmentModalOpen(false);
          }
        } catch (e) {
          console.error("Failed to delete assignment", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleSaveActivity = async (activity: any) => {
    const method = activity.id ? "PUT" : "POST";
    const url = activity.id ? `/api/activities/${activity.id}` : "/api/activities";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });
      if (res.ok) {
        fetchData();
        setIsActivityModalOpen(false);
        setEditingActivity(null);
      }
    } catch (e) {
      console.error("Failed to save activity", e);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    setConfirmationConfig({
      title: "Delete Activity",
      message: "Are you sure you want to delete this activity?",
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
          if (res.ok) {
            fetchData();
            setIsActivityModalOpen(false);
          }
        } catch (e) {
          console.error("Failed to delete activity", e);
        }
        setIsConfirmationModalOpen(false);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  const handleSaveTimetableSlot = async (day: string, slotIndex: number, updatedSlot: any) => {
    const updatedTimetable = timetable.map(d => {
      if (d.day === day) {
        const newSlots = [...d.slots];
        newSlots[slotIndex] = updatedSlot;
        return { ...d, slots: newSlots };
      }
      return d;
    });

    try {
      const res = await fetch("/api/timetable", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTimetable),
      });
      if (res.ok) {
        fetchData();
        setIsTimetableModalOpen(false);
        setEditingTimetableSlot(null);
      }
    } catch (e) {
      console.error("Failed to save timetable", e);
    }
  };

  const handleUpdateSettings = async (newSettings: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const updated = await res.json();
        setNotificationSettings(updated);
        // Re-fetch notifications to apply filters
        const nRes = await fetch("/api/notifications");
        setNotifications(await nRes.json());
      }
    } catch (err) {
      console.error("Error updating settings:", err);
    }
  };

  const handleSendTestNotification = async () => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Alert",
          message: "This is a test notification from the admin panel.",
          type: "event"
        }),
      });
      if (res.ok) {
        const nRes = await fetch("/api/notifications");
        setNotifications(await nRes.json());
        setIsNotificationDropdownOpen(true);
      }
    } catch (err) {
      console.error("Error sending test notification:", err);
    }
  };

  const handleUpdateProfile = async (profileData: any) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, ...profileData }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setProfileUpdateSuccess(true);
        setTimeout(() => {
          setProfileUpdateSuccess(false);
          setIsProfileModalOpen(false);
        }, 1500);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleDownloadReport = (report: Report) => {
    const blob = new Blob([JSON.stringify(report)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, '_')}.${report.type.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const type = formData.get("type") as string;
    const academicYear = formData.get("academicYear") as string;
    const month = formData.get("month") as string;

    const newReport: Report = {
      id: `r${Date.now()}`,
      name: `${name} - ${selectedReportClass} (${month} ${academicYear})`,
      category,
      type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      size: `${(Math.random() * 5).toFixed(1)} MB`
    };

    setReports([newReport, ...reports]);
    setIsReportModalOpen(false);

    // Trigger analytics update if it's an Academic or Attendance report
    if (category === "Attendance" || category === "Academic Performance" || category === "Academic") {
      setSelectedReportClass("All Classes");
      if (category === "Attendance") {
        handleGenerateAnalytics("All Classes");
      } else {
        handleGenerateAcademicGrowth("All Classes");
      }
    }
  };

  const filteredReports = reportCategory === "All" 
    ? reports 
    : reports.filter(r => r.category === reportCategory);

  const toggleAttendance = (studentId: string) => {
    setStudents(students.map(s => {
      if (s.id === studentId) {
        return { ...s, attendance: s.attendance > 90 ? 85 : 95 };
      }
      return s;
    }));
  };

  const filteredStudents = students
    .filter(s => 
      (selectedGrade === "All" || s.grade === selectedGrade) &&
      (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       s.id.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChatId,
      text: chatMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setChatMessage("");
  };

  const handleUpdateMarks = async (studentId: string, marks: any[], performance?: string, academicYear?: string, month?: string) => {
    try {
      const res = await fetch(`/api/students/${studentId}/marks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks, performance, academicYear, month }),
      });
      if (res.ok) {
        const updatedStudent = await res.json();
        setStudents(students.map(s => s.id === studentId ? updatedStudent : s));
        setIsMarksModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating marks:", err);
    }
  };

  const handleUpdateSystemConfig = async (newSubjects: string[], newPassMark: number, newGrades: string[], newDepartments: string[], newActivityTypes: string[]) => {
    try {
      const response = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          subjects: newSubjects, 
          passMark: newPassMark,
          grades: newGrades,
          departments: newDepartments,
          activityTypes: newActivityTypes
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setSubjects(data.config.subjects);
        setGrades(data.config.grades);
        setDepartments(data.config.departments);
        setActivityTypes(data.config.activityTypes);
        setPassMark(data.config.passMark);
        
        // Refresh student data to reflect new pass/fail statuses
        const studentsRes = await fetch("/api/students");
        if (studentsRes.ok) {
          const studentsData = await studentsRes.json();
          setStudents(studentsData);
        }
        setIsSystemConfigModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating system config:", err);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        if (user?.role === "student") {
          return (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="My Attendance" value="95%" icon={UserCheck} trend={2} color="bg-emerald-500" />
                <StatCard title="Pending Assignments" value={assignments.filter(a => a.status === "Pending").length} icon={FileText} trend={-1} color="bg-amber-500" />
                <StatCard title="Current GPA" value="3.8" icon={TrendingUp} trend={5} color="bg-indigo-500" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-indigo-500" />
                    My Timetable (Today)
                  </h3>
                  <div className="space-y-4">
                    {timetable[0]?.slots.map((slot, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{slot.subject}</p>
                          <p className="text-slate-500 text-xs">{slot.teacher}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-500">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    AI Study Suggestions
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700">
                      <p className="text-xs font-medium">You're doing great in Science! Try focusing more on Math Algebra this week to boost your score.</p>
                    </div>
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700">
                      <p className="text-xs font-medium">New resources for "Newton's Laws" are available in the Curriculum section.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Students" value={stats?.totalStudents || 0} icon={GraduationCap} trend={12} color="bg-indigo-500" />
              <StatCard title="Total Teachers" value={stats?.totalTeachers || 0} icon={Briefcase} trend={4} color="bg-emerald-500" />
              <StatCard title="Active Activities" value={stats?.activeActivities || 0} icon={BookOpen} trend={-2} color="bg-amber-500" />
              <StatCard title="Avg Attendance" value={`${stats?.avgAttendance || 0}%`} icon={UserCheck} trend={8} color="bg-rose-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-500" />
                  Attendance Overview
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Mon', value: 92 },
                      { name: 'Tue', value: 88 },
                      { name: 'Wed', value: 95 },
                      { name: 'Thu', value: 91 },
                      { name: 'Fri', value: 89 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    AI Insights
                  </h3>
                  <div className="space-y-4">
                    {aiInsights.map((insight, idx) => (
                      <div key={idx} className={cn(
                        "p-4 rounded-xl border flex gap-3",
                        insight.type === "warning" ? "bg-rose-50 border-rose-100 text-rose-700" :
                        insight.type === "suggestion" ? "bg-amber-50 border-amber-100 text-amber-700" :
                        "bg-emerald-50 border-emerald-100 text-emerald-700"
                      )}>
                        <div className="mt-0.5">
                          {insight.type === "warning" ? <XCircle size={16} /> :
                           insight.type === "suggestion" ? <Clock size={16} /> :
                           <CheckCircle size={16} />}
                        </div>
                        <p className="text-xs font-medium leading-relaxed">{insight.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-amber-500" />
                    Recent Notifications
                  </h3>
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((n) => (
                      <div key={n.id} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-2 rounded-lg bg-white shadow-sm h-fit">
                          <Bell size={16} className="text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-slate-900 text-sm">{n.title}</h4>
                            <button 
                              onClick={() => handleDeleteNotification(n.id)}
                              className="text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                          <p className="text-slate-500 text-xs mt-1">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-2 block">{n.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "attendance":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Smart Attendance System</h3>
                <p className="text-slate-500 text-sm">Mark daily attendance for Class 10-A on {selectedAttendanceDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                  <Calendar size={16} />
                  <input 
                    type="date" 
                    value={selectedAttendanceDate}
                    onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-sm outline-none"
                  />
                </div>
                <button 
                  onClick={saveAttendance}
                  disabled={Object.keys(attendanceMarking).length === 0}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Attendance
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50/50">
                {["All", ...grades].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                      selectedGrade === g 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s: any) => (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {s.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-900 text-sm">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{s.id.slice(-4)}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                          (attendanceMarking[s.id] || attendance.find(a => a.studentId === s.id)?.status) === "Present" ? "bg-emerald-100 text-emerald-700" :
                          (attendanceMarking[s.id] || attendance.find(a => a.studentId === s.id)?.status) === "Absent" ? "bg-rose-100 text-rose-700" :
                          "bg-slate-100 text-slate-500"
                        )}>
                          {attendanceMarking[s.id] || attendance.find(a => a.studentId === s.id)?.status || "Not Marked"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleMarkAttendance(s.id, "Present")}
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              attendanceMarking[s.id] === "Present" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500"
                            )}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleMarkAttendance(s.id, "Absent")}
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              attendanceMarking[s.id] === "Absent" ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                            )}
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "curriculum":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Curriculum & Assignments</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setEditingAssignment(null); setIsAssignmentModalOpen(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  <Plus size={16} />
                  Add Assignment
                </button>
                <button 
                  onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <Plus size={16} />
                  Add Activity
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Active Assignments</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {assignments.map((as) => (
                      <div key={as.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <FileText size={24} />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900">{as.title}</h5>
                            <p className="text-slate-500 text-xs">{as.subject} • Due: {as.dueDate} • Grade: {as.grade}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                            as.status === "Submitted" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          )}>
                            {as.status}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => { setEditingAssignment(as); setIsAssignmentModalOpen(true); }}
                              className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-500 shadow-sm border border-slate-100"
                            >
                              <Settings size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteAssignment(as.id)}
                              className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100"
                            >
                              <XCircle size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Upcoming Activities</h4>
                  <div className="space-y-4">
                    {activities.map((a) => (
                      <div key={a.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 group relative">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setEditingActivity(a); setIsActivityModalOpen(true); }}
                            className="p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-emerald-500 shadow-sm"
                          >
                            <Settings size={12} />
                          </button>
                          <button 
                            onClick={() => handleDeleteActivity(a.id)}
                            className="p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-rose-500 shadow-sm"
                          >
                            <XCircle size={12} />
                          </button>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-slate-900 text-sm">{a.title}</h5>
                          <span className="text-[10px] font-bold text-indigo-500">{a.date}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full" style={{ width: `${a.progress}%` }}></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">{a.progress}% Completed • {a.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "marks":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Marks Management</h2>
                <p className="text-sm text-slate-500">Manage subject-wise marks, subjects, and passing criteria</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsSystemConfigModalOpen(true)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <Settings size={18} />
                  System Settings
                </button>
                <button 
                  onClick={() => { setEditingStudent(null); setTempStudentPhoto(null); setIsStudentModalOpen(true); }}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20"
                >
                  <Plus size={18} />
                  Add Student
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by name, ID or grade..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year:</span>
                    <select 
                      value={selectedAcademicYear}
                      onChange={(e) => setSelectedAcademicYear(e.target.value)}
                      className="bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 outline-none cursor-pointer"
                    >
                      {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Month:</span>
                    <select 
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="bg-transparent border-none text-xs font-bold text-slate-700 focus:ring-0 outline-none cursor-pointer"
                    >
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span>Pass Mark: {passMark}</span>
                </div>
              </div>
              <div className="px-6 py-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                {["All", ...grades].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                      selectedGrade === g 
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest">
                      <th className="px-6 py-4 font-bold border-b border-slate-100">Student & Grade</th>
                      {subjects.map(sub => (
                        <th key={sub} className="px-6 py-4 font-bold border-b border-slate-100">{sub}</th>
                      ))}
                      <th className="px-6 py-4 font-bold border-b border-slate-100">Total</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-100">Result</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-100">Performance</th>
                      <th className="px-6 py-4 font-bold border-b border-slate-100 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((s: any) => {
                      const currentMarks = s.marks?.filter((m: any) => m.academicYear === selectedAcademicYear && m.month === selectedMonth) || [];
                      const total = currentMarks.reduce((acc: number, curr: any) => acc + (curr.isAbsent ? 0 : curr.score), 0);
                      const hasFailed = currentMarks.some((m: any) => m.isAbsent || m.score < passMark);
                      const isPass = currentMarks.length > 0 && !hasFailed;
                      
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden">
                                {s.photoUrl ? (
                                  <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  s.name.charAt(0)
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-slate-400 text-[10px]">ID: {s.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                  <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-wider">{s.grade}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          {subjects.map(sub => {
                            const mark = currentMarks.find((m: any) => m.subject === sub);
                            return (
                              <td key={sub} className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className={cn(
                                    "text-sm font-bold",
                                    mark ? (mark.isAbsent ? "text-rose-500" : (mark.score >= passMark ? "text-slate-700" : "text-rose-500")) : "text-slate-300"
                                  )}>
                                    {mark ? (mark.isAbsent ? "Absent" : mark.score) : "-"}
                                  </span>
                                  {mark && !mark.isAbsent && (
                                    <span className={cn(
                                      "text-[9px] font-bold uppercase tracking-tighter",
                                      mark.score >= passMark ? "text-emerald-500" : "text-rose-400"
                                    )}>
                                      {mark.score >= passMark ? "Pass" : "Fail"}
                                    </span>
                                  )}
                                  {mark?.isAbsent && (
                                    <span className="text-[9px] font-bold uppercase tracking-tighter text-rose-400">
                                      Absent
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                          <td className="px-6 py-4">
                            <span className="text-sm font-black text-indigo-600">{total}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                              isPass 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                : "bg-rose-50 text-rose-600 border-rose-100"
                            )}>
                              {isPass ? "Pass" : "Fail"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                              s.performance.includes("Outstanding") ? "bg-indigo-50 text-indigo-600" :
                              s.performance.includes("Excellent") ? "bg-blue-50 text-blue-600" :
                              s.performance.includes("Good") ? "bg-emerald-50 text-emerald-600" :
                              s.performance.includes("Average") ? "bg-amber-50 text-amber-600" :
                              "bg-rose-50 text-rose-600"
                            )}>
                              {s.performance}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => { setEditingMarksStudent(s); setIsMarksModalOpen(true); }}
                                className="p-2 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                                title="Edit Marks"
                              >
                                <FileText size={16} />
                              </button>
                              <button 
                                onClick={() => { setEditingStudent(s); setTempStudentPhoto(s.photoUrl || null); setIsStudentModalOpen(true); }}
                                className="p-2 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                                title="Edit Student"
                              >
                                <Settings size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteStudent(s.id)}
                                className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                                title="Delete Student"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "students":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Student Directory</h3>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                    />
                  </div>
                  <button 
                    onClick={() => { setEditingStudent(null); setTempStudentPhoto(null); setIsStudentModalOpen(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                  >
                    <Plus size={16} />
                    Add Student
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                {["All", ...grades].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                      selectedGrade === g 
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Student</th>
                      <th className="px-6 py-4 font-semibold">Grade</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Attendance</th>
                      <th className="px-6 py-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                              <p className="text-slate-400 text-[10px]">ID: {s.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm font-medium">{s.grade}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{s.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                              <div className="h-full bg-emerald-500" style={{ width: `${s.attendance}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{s.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setEditingStudent(s); setTempStudentPhoto(s.photoUrl || null); setIsStudentModalOpen(true); }}
                              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-500"
                            >
                              <Settings size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(s.id)}
                              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-500"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "teachers":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Faculty Directory</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search teachers..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" 
                  />
                </div>
                <button 
                  onClick={() => { setEditingTeacher(null); setTempTeacherPhoto(null); setIsTeacherModalOpen(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  <Plus size={16} />
                  Add Teacher
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((t) => (
                <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative">
                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingTeacher(t); setTempTeacherPhoto(t.photoUrl || null); setIsTeacherModalOpen(true); }}
                      className="p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-500 shadow-sm"
                    >
                      <Settings size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-rose-500 shadow-sm"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl overflow-hidden">
                      {t.photoUrl ? (
                        <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        t.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <p className="text-indigo-500 text-xs font-semibold uppercase tracking-wider">{t.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <Users size={16} className="text-slate-400" />
                      <span>{t.department} Department</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <Clock size={16} className="text-slate-400" />
                      <span>{t.experience} Experience</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "timetable":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Weekly Timetable</h3>
              <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold">Week View</button>
                <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-sm font-bold">Day View</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {timetable.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900">{day.day}</h4>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {day.slots.map((slot, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setEditingTimetableSlot({ day: day.day, slotIndex: idx, slot }); setIsTimetableModalOpen(true); }}
                        className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group relative"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTimetableSlot({ day: day.day, slotIndex: idx, slot });
                              setIsTimetableModalOpen(true);
                            }}
                            className="p-1 hover:bg-white rounded-md text-slate-400 hover:text-emerald-500 shadow-sm border border-slate-100"
                          >
                            <Settings size={12} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTimetableSlot(day.day, idx);
                            }}
                            className="p-1 hover:bg-white rounded-md text-slate-400 hover:text-rose-500 shadow-sm border border-slate-100"
                          >
                            <XCircle size={12} />
                          </button>
                        </div>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">{slot.time}</p>
                        <h5 className="font-bold text-slate-900 mb-1">{slot.subject}</h5>
                        <p className="text-slate-500 text-xs">{slot.teacher}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "communication":
        const currentChatMessages = messages.filter(m => m.chatId === selectedChatId);
        const selectedStudent = students.find((s: any) => s.id === selectedChatId);

        return (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm h-[75vh] flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r border-slate-100 flex flex-col">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Messages</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" 
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Broadcast Option */}
                <div 
                  onClick={() => setSelectedChatId("broadcast")}
                  className={cn(
                    "p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50",
                    selectedChatId === "broadcast" && "bg-emerald-50/50 border-l-4 border-l-emerald-500"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
                    <Users size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 text-sm truncate">All Students</h4>
                      <span className="text-[10px] text-slate-400">Broadcast</span>
                    </div>
                    <p className="text-slate-500 text-xs truncate">Send a message to everyone</p>
                  </div>
                </div>

                {/* Student Chats */}
                {students.map((s: any) => (
                  <div 
                    key={s.id} 
                    onClick={() => setSelectedChatId(s.id)}
                    className={cn(
                      "p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50",
                      selectedChatId === s.id && "bg-emerald-50/50 border-l-4 border-l-emerald-500"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0 overflow-hidden">
                      <img src={s.photoUrl || `https://picsum.photos/seed/${s.id}/100/100`} alt={s.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{s.name}</h4>
                        <span className="text-[10px] text-slate-400">{s.grade}</span>
                      </div>
                      <p className="text-slate-500 text-xs truncate">Student ID: {s.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
              <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedChatId === "broadcast" ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <Users size={20} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                      <img src={selectedStudent?.photoUrl || `https://picsum.photos/seed/${selectedChatId}/100/100`} alt={selectedStudent?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {selectedChatId === "broadcast" ? "Broadcast to All Students" : selectedStudent?.name}
                    </h4>
                    <p className="text-emerald-500 text-[10px] font-bold uppercase">
                      {selectedChatId === "broadcast" ? "Public Channel" : "Online"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {currentChatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                      <MessageSquare size={32} />
                    </div>
                    <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  currentChatMessages.map((m) => (
                    <div key={m.id} className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "p-4 rounded-2xl shadow-sm border max-w-md",
                        m.sender === "me" 
                          ? "bg-emerald-500 text-white rounded-tr-none border-emerald-400" 
                          : "bg-white text-slate-700 rounded-tl-none border-slate-100"
                      )}>
                        <p className="text-sm">{m.text}</p>
                        <span className={cn("text-[10px] mt-2 block", m.sender === "me" ? "text-emerald-100" : "text-slate-400")}>
                          {m.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-white border-t border-slate-100">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex gap-4"
                >
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={selectedChatId === "broadcast" ? "Type a broadcast message..." : "Type your message..."} 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none" 
                  />
                  <button 
                    type="submit"
                    disabled={!chatMessage.trim()}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Reports & Analytics</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Class:</span>
                  <select 
                    value={selectedReportClass}
                    onChange={(e) => setSelectedReportClass(e.target.value)}
                    className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="All Classes">All Classes</option>
                    {grades.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                  <button 
                    onClick={() => setChartType("bar")}
                    className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", chartType === "bar" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-50")}
                  >
                    Bar Chart
                  </button>
                  <button 
                    onClick={() => setChartType("line")}
                    className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", chartType === "line" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-50")}
                  >
                    Line Chart
                  </button>
                  <button 
                    onClick={() => setChartType("pie")}
                    className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", chartType === "pie" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-slate-50")}
                  >
                    Pie Chart
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm font-medium mb-1">Monthly Reports</p>
                <p className="text-2xl font-bold text-slate-900">{reports.length}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm font-medium mb-1">Academic Performance</p>
                <p className="text-2xl font-bold text-slate-900">{classSummaryStats.academic}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>{selectedReportClass === "All Classes" ? "+3.2% from last term" : `Average for ${selectedReportClass}`}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm font-medium mb-1">Avg Attendance</p>
                <p className="text-2xl font-bold text-slate-900">{classSummaryStats.attendance}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-500 text-xs font-bold">
                  <TrendingUp size={14} />
                  <span>{selectedReportClass === "All Classes" ? "+0.5% from last month" : `Average for ${selectedReportClass}`}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Users size={20} className="text-indigo-500" />
                      {selectedReportClass === "All Classes" ? "Class-wise Attendance (Latest Day)" : "Attendance Analytics"}
                    </h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingChartTarget("attendance");
                        setIsChartEditModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Edit Chart"
                    >
                      <Settings size={18} />
                    </button>
                    <button 
                      onClick={handleGenerateAnalytics}
                      disabled={isGeneratingAnalytics}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                        isGeneratingAnalytics 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                      )}
                    >
                      {isGeneratingAnalytics ? (
                        <>
                          <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <TrendingUp size={14} />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  {attendanceAnalytics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "bar" ? (
                        <BarChart data={attendanceAnalytics}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="absent" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : chartType === "line" ? (
                        <LineChart data={attendanceAnalytics}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="absent" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Present', value: attendanceAnalytics.reduce((acc, curr) => acc + curr.present, 0) },
                              { name: 'Absent', value: attendanceAnalytics.reduce((acc, curr) => acc + curr.absent, 0) },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#f43f5e" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={32} className="text-slate-200" />
                      </div>
                      <p className="text-slate-500 font-medium">No analytics data generated yet</p>
                      <button 
                        onClick={handleGenerateAnalytics}
                        className="text-indigo-500 text-xs font-bold mt-2 hover:underline"
                      >
                        Click "Generate" to see the chart
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp size={20} className="text-rose-500" />
                      {selectedReportClass === "All Classes" ? "Class-wise Academic Comparison" : "Academic Growth Trend"}
                    </h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingChartTarget("academic");
                        setIsChartEditModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Edit Chart"
                    >
                      <Settings size={18} />
                    </button>
                    <button 
                      onClick={handleGenerateAcademicGrowth}
                      disabled={isGeneratingAcademicGrowth}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                        isGeneratingAcademicGrowth 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                      )}
                    >
                      {isGeneratingAcademicGrowth ? (
                        <>
                          <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <TrendingUp size={14} />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  {academicGrowthAnalytics.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "bar" ? (
                        <BarChart data={academicGrowthAnalytics}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey={selectedReportClass === "All Classes" ? "name" : "month"} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="score" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : chartType === "line" ? (
                        <LineChart data={academicGrowthAnalytics}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey={selectedReportClass === "All Classes" ? "name" : "month"} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Line type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Passing', value: 85 },
                              { name: 'Failing', value: 15 },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#f43f5e" />
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp size={32} className="text-slate-200" />
                      </div>
                      <p className="text-slate-500 font-medium">No academic data generated yet</p>
                      <button 
                        onClick={handleGenerateAcademicGrowth}
                        className="text-rose-500 text-xs font-bold mt-2 hover:underline"
                      >
                        Click "Generate" to see the trend
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Generated Reports</h3>
                  <p className="text-xs text-slate-500 mt-1">View and download academic and administrative reports</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingChartTarget("reports");
                      setIsChartEditModalOpen(true);
                    }}
                    className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Edit Report Settings"
                  >
                    <Settings size={18} />
                  </button>
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
                  >
                    <Plus size={14} />
                    Generate New Report
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {["All", "Academic", "Attendance", "Faculty", "Enrollment"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setReportCategory(cat)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                      reportCategory === cat 
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" 
                        : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-100">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2 rounded-lg text-white",
                          report.category === "Attendance" ? "bg-emerald-500" : 
                          report.category === "Academic" ? "bg-indigo-500" : 
                          report.category === "Faculty" ? "bg-amber-500" : "bg-slate-400"
                        )}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{report.name}</p>
                          <p className="text-slate-400 text-[10px]">{report.date} • {report.size} • {report.category}</p>
                        </div>
                      </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            report.type === "PDF" ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-500"
                          )}>
                            {report.type}
                          </span>
                          <button 
                            onClick={() => {
                              setSelectedReportClass("All Classes");
                              if (report.category === "Attendance") {
                                handleGenerateAnalytics("All Classes");
                              } else {
                                handleGenerateAcademicGrowth("All Classes");
                              }
                              // Scroll to charts
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Analytics"
                          >
                            <TrendingUp size={16} />
                          </button>
                          <button 
                            onClick={() => handleDownloadReport(report)}
                            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Download Report"
                          >
                            <Download size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Report"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-slate-200" />
                    </div>
                    <p className="text-slate-500 font-medium">No reports found in this category</p>
                    <button 
                      onClick={() => setReportCategory("All")}
                      className="text-indigo-500 text-xs font-bold mt-2 hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Settings size={20} className="text-slate-500" />
                  System Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Academic Year</p>
                      <p className="text-slate-500 text-xs">Current: {academicYear}</p>
                    </div>
                    <button 
                      onClick={() => setIsAcademicYearModalOpen(true)}
                      className="text-emerald-500 font-bold text-xs uppercase tracking-wider"
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Attendance Threshold</p>
                      <p className="text-slate-500 text-xs">Alert at: {attendanceThreshold}%</p>
                    </div>
                    <button 
                      onClick={() => setIsThresholdModalOpen(true)}
                      className="text-emerald-500 font-bold text-xs uppercase tracking-wider"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Global Configuration</p>
                      <p className="text-slate-500 text-xs">Subjects, Grades, Departments, Activities</p>
                    </div>
                    <button 
                      onClick={() => setIsSystemConfigModalOpen(true)}
                      className="text-emerald-500 font-bold text-xs uppercase tracking-wider"
                    >
                      Configure
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Notification Alerts</p>
                      <p className="text-slate-500 text-xs">Global Push & Email: {notificationSettings.pushEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <button 
                      onClick={() => handleUpdateSettings({ pushEnabled: !notificationSettings.pushEnabled })}
                      className={cn(
                        "w-10 h-5 rounded-full relative transition-colors",
                        notificationSettings.pushEnabled ? "bg-emerald-500" : "bg-slate-300"
                      )}
                    >
                      <motion.div 
                        animate={{ x: notificationSettings.pushEnabled ? 20 : 0 }}
                        className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" 
                      />
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Alert Types</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { key: 'absenceAlerts', label: 'Absence Alerts', icon: UserCheck },
                        { key: 'assignmentDeadlines', label: 'Assignment Deadlines', icon: Clock },
                        { key: 'eventNotifications', label: 'Event Notifications', icon: Calendar }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <item.icon size={16} className="text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                          </div>
                          <button 
                            onClick={() => handleUpdateSettings({ [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings] })}
                            className={cn(
                              "w-8 h-4 rounded-full relative transition-colors",
                              notificationSettings[item.key as keyof typeof notificationSettings] ? "bg-indigo-500" : "bg-slate-200"
                            )}
                          >
                            <motion.div 
                              animate={{ x: notificationSettings[item.key as keyof typeof notificationSettings] ? 16 : 0 }}
                              className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full" 
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={handleSendTestNotification}
                      className="w-full mt-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-indigo-200 hover:text-indigo-500 transition-all flex items-center justify-center gap-2"
                    >
                      <Bell size={14} />
                      Send Test Notification
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Users size={20} className="text-indigo-500" />
                  User Management
                </h3>
                <div className="space-y-4">
                  <div 
                    onClick={() => setActivePage("students")}
                    className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Manage Students</p>
                      <p className="text-slate-500 text-xs">Add, edit, or remove student accounts</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  <div 
                    onClick={() => setActivePage("teachers")}
                    className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Manage Teachers</p>
                      <p className="text-slate-500 text-xs">Assign subjects and manage departments</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                      <Settings size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">Role Permissions</p>
                      <p className="text-slate-500 text-xs">Configure access levels for each role</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={(user) => {
      setIsAuthenticated(true);
      setUser(user);
    }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-slate-100 transition-all duration-300 flex flex-col fixed h-full z-50",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <GraduationCap size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">EduSmart</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} />
          <SidebarItem icon={Users} label="Students" active={activePage === "students"} onClick={() => setActivePage("students")} />
          <SidebarItem icon={Briefcase} label="Teachers" active={activePage === "teachers"} onClick={() => setActivePage("teachers")} />
          <SidebarItem icon={UserCheck} label="Attendance" active={activePage === "attendance"} onClick={() => setActivePage("attendance")} />
          <SidebarItem icon={CheckCircle} label="Marks" active={activePage === "marks"} onClick={() => setActivePage("marks")} />
          <SidebarItem icon={BookOpen} label="Curriculum" active={activePage === "curriculum"} onClick={() => setActivePage("curriculum")} />
          <SidebarItem icon={Calendar} label="Timetable" active={activePage === "timetable"} onClick={() => setActivePage("timetable")} />
          <SidebarItem icon={FileText} label="Reports & Analytics" active={activePage === "reports"} onClick={() => setActivePage("reports")} />
          <SidebarItem icon={MessageSquare} label="Communication" active={activePage === "communication"} onClick={() => setActivePage("communication")} />
          <SidebarItem icon={Settings} label="Admin Panel" active={activePage === "admin"} onClick={() => setActivePage("admin")} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* AI Chatbot Button */}
      <button 
        onClick={() => setIsAiChatOpen(!isAiChatOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* AI Chatbot Window */}
      <AnimatePresence>
        {isAiChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-80 h-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50"
          >
            <div className="p-4 bg-emerald-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} />
                <span className="font-bold text-sm">EduSmart AI</span>
              </div>
              <button onClick={() => setIsAiChatOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {messages.filter(m => m.sender === "ai" || m.sender === "me").map(m => (
                <div key={m.id} className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "p-3 rounded-2xl text-xs max-w-[80%]",
                    m.sender === "me" ? "bg-emerald-500 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100">
              <form onSubmit={(e) => {
                e.preventDefault();
                const msg = (e.target as any).message.value;
                if (!msg) return;
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: "me", time: "Now" }]);
                handleAiChat(msg);
                (e.target as any).message.value = "";
              }} className="flex gap-2">
                <input name="message" placeholder="Ask AI..." className="flex-1 px-3 py-2 bg-slate-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/20" />
                <button type="submit" className="p-2 bg-emerald-500 text-white rounded-xl"><ChevronRight size={16} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-72" : "ml-20"
      )}>
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 relative transition-colors"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full border-2 border-white text-[8px] text-white flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {isNotificationDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                        <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {notifications.length} New
                        </span>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                              <div className="flex gap-3">
                                <div className={cn(
                                  "p-2 rounded-lg h-fit",
                                  n.type === "absence" ? "bg-rose-50 text-rose-500" :
                                  n.type === "assignment" ? "bg-indigo-50 text-indigo-500" :
                                  "bg-amber-50 text-amber-500"
                                )}>
                                  {n.type === "absence" ? <UserCheck size={14} /> :
                                   n.type === "assignment" ? <Clock size={14} /> :
                                   <Calendar size={14} />}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-900">{n.title}</p>
                                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                                  <p className="text-[9px] text-slate-400 mt-1.5">{n.date}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <Bell size={32} className="text-slate-200 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">No new notifications</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setActivePage("reports");
                            setIsNotificationDropdownOpen(false);
                          }}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
                        >
                          View All Activity
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="h-8 w-px bg-slate-100 mx-2"></div>
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded-xl transition-colors"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none capitalize">{user?.name || "Administrator"}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">{user?.role || "Administrator"}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                {user?.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Admin"}`} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 capitalize">{activePage}</h2>
                <p className="text-slate-500 mt-1">Manage your school's {activePage} and activities.</p>
              </div>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Student Modal */}
      <AnimatePresence>
        {isStudentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">{editingStudent ? "Edit Student" : "Add New Student"}</h3>
                <button onClick={() => setIsStudentModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const student = Object.fromEntries(formData.entries());
                handleSaveStudent(editingStudent ? { ...editingStudent, ...student, photoUrl: tempStudentPhoto } : { ...student, photoUrl: tempStudentPhoto });
              }} className="p-8 space-y-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                      {tempStudentPhoto ? (
                        <img src={tempStudentPhoto} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <Users size={32} className="text-slate-300" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                      <Camera size={24} className="text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const base64 = await fileToBase64(file);
                            setTempStudentPhoto(base64);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Profile Photo</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input name="name" defaultValue={editingStudent?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</label>
                    <select name="grade" defaultValue={editingStudent?.grade} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      {grades.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input name="email" type="email" defaultValue={editingStudent?.email} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Parent Name</label>
                    <input name="parentName" defaultValue={editingStudent?.parentName} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Parent Phone</label>
                    <input name="parentPhone" defaultValue={editingStudent?.parentPhone} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsStudentModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  {editingStudent && (
                    <button 
                      type="button" 
                      onClick={() => {
                        handleDeleteStudent(editingStudent.id);
                      }} 
                      className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">Save Student</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Teacher Modal */}
      <AnimatePresence>
        {isTeacherModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h3>
                <button onClick={() => setIsTeacherModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const teacher = Object.fromEntries(formData.entries());
                handleSaveTeacher(editingTeacher ? { ...editingTeacher, ...teacher, photoUrl: tempTeacherPhoto } : { ...teacher, photoUrl: tempTeacherPhoto });
              }} className="p-8 space-y-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                      {tempTeacherPhoto ? (
                        <img src={tempTeacherPhoto} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <Briefcase size={32} className="text-slate-300" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                      <Camera size={24} className="text-white" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const base64 = await fileToBase64(file);
                            setTempTeacherPhoto(base64);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Profile Photo</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input name="name" defaultValue={editingTeacher?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                    <input name="subject" defaultValue={editingTeacher?.subject} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input name="email" type="email" defaultValue={editingTeacher?.email} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</label>
                    <select name="department" defaultValue={editingTeacher?.department} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none">
                      {departments.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</label>
                    <input name="experience" defaultValue={editingTeacher?.experience} placeholder="e.g. 5 years" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsTeacherModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  {editingTeacher && (
                    <button 
                      type="button" 
                      onClick={() => {
                        handleDeleteTeacher(editingTeacher.id);
                      }} 
                      className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">Save Teacher</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Assignment Modal */}
      <AnimatePresence>
        {isAssignmentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">{editingAssignment ? "Edit Assignment" : "Add Assignment"}</h3>
                <button onClick={() => setIsAssignmentModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());
                handleSaveAssignment(editingAssignment ? { ...editingAssignment, ...data } : data);
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</label>
                  <input name="title" defaultValue={editingAssignment?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                    <input name="subject" defaultValue={editingAssignment?.subject} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Due Date</label>
                    <input name="dueDate" type="date" defaultValue={editingAssignment?.dueDate} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</label>
                    <select name="grade" defaultValue={editingAssignment?.grade || (grades[0] || "10th")} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none">
                      {grades.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</label>
                    <select name="status" defaultValue={editingAssignment?.status || "Pending"} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none">
                      <option>Pending</option>
                      <option>Submitted</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsAssignmentModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  {editingAssignment && (
                    <button 
                      type="button" 
                      onClick={() => {
                        handleDeleteAssignment(editingAssignment.id);
                      }} 
                      className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">Save Assignment</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Activity Modal */}
      <AnimatePresence>
        {isActivityModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">{editingActivity ? "Edit Activity" : "Add Activity"}</h3>
                <button onClick={() => setIsActivityModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());
                handleSaveActivity(editingActivity ? { ...editingActivity, ...data, progress: Number(data.progress) } : { ...data, progress: Number(data.progress) });
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</label>
                  <input name="title" defaultValue={editingActivity?.title} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</label>
                    <input name="date" type="date" defaultValue={editingActivity?.date} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</label>
                    <select name="type" defaultValue={editingActivity?.type || (activityTypes[0] || "Curriculum")} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      {activityTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</label>
                    <select name="status" defaultValue={editingActivity?.status || "Upcoming"} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      <option>Upcoming</option>
                      <option>Active</option>
                      <option>Planning</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress (%)</label>
                    <input name="progress" type="number" min="0" max="100" defaultValue={editingActivity?.progress || 0} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsActivityModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  {editingActivity && (
                    <button 
                      type="button" 
                      onClick={() => {
                        handleDeleteActivity(editingActivity.id);
                      }} 
                      className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">Save Activity</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Timetable Slot Modal */}
      <AnimatePresence>
        {isTimetableModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Edit Timetable Slot - {editingTimetableSlot?.day}</h3>
                <button onClick={() => setIsTimetableModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());
                if (editingTimetableSlot) {
                  handleSaveTimetableSlot(editingTimetableSlot.day, editingTimetableSlot.slotIndex, data);
                }
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Slot</label>
                  <input name="time" defaultValue={editingTimetableSlot?.slot.time} required placeholder="e.g. 09:00 - 10:00" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                  <input name="subject" defaultValue={editingTimetableSlot?.slot.subject} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teacher</label>
                  <input name="teacher" defaultValue={editingTimetableSlot?.slot.teacher} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsTimetableModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  {editingTimetableSlot && (
                    <button 
                      type="button" 
                      onClick={() => {
                        handleDeleteTimetableSlot(editingTimetableSlot.day, editingTimetableSlot.slotIndex);
                      }} 
                      className="flex-1 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">Save Slot</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMarksModalOpen && editingMarksStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Edit Marks - {editingMarksStudent.name}</h3>
                  <p className="text-xs text-slate-500">Update subject-wise scores for the current term</p>
                </div>
                <button onClick={() => setIsMarksModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const marks = subjects.map(sub => ({
                  subject: sub,
                  score: Number(formData.get(sub)),
                  isAbsent: formData.get(`${sub}_absent`) === "on"
                }));
                const performance = formData.get("performance") as string;
                const academicYear = formData.get("academicYear") as string;
                const month = formData.get("month") as string;
                handleUpdateMarks(editingMarksStudent.id, marks, performance, academicYear, month);
              }} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Year</label>
                    <select 
                      name="academicYear" 
                      defaultValue={selectedAcademicYear}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    >
                      {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month</label>
                    <select 
                      name="month" 
                      defaultValue={selectedMonth}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    >
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {subjects.map(sub => {
                    const existingMark = editingMarksStudent.marks?.find((m: any) => 
                      m.subject === sub && m.academicYear === selectedAcademicYear && m.month === selectedMonth
                    );
                    return (
                      <div key={sub} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sub} Score</label>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                name={`${sub}_absent`} 
                                defaultChecked={existingMark?.isAbsent}
                                className="w-3 h-3 rounded border-slate-200 text-rose-500 focus:ring-rose-500/20" 
                              />
                              <span className="text-[10px] text-slate-400 font-bold group-hover:text-rose-500 transition-colors">Absent</span>
                            </label>
                            {existingMark && (
                              <button 
                                type="button"
                                onClick={() => handleDeleteMark(editingMarksStudent.id, sub)}
                                className="text-[10px] text-rose-500 hover:underline font-bold"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                        <input 
                          name={sub} 
                          type="number" 
                          min="0" 
                          max="100" 
                          defaultValue={existingMark?.score || 0} 
                          required 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none disabled:opacity-50 disabled:bg-slate-100" 
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance / Rating</label>
                  <input 
                    name="performance" 
                    type="text" 
                    defaultValue={editingMarksStudent.performance} 
                    placeholder="e.g. Excellent, Good, Needs Improvement"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                  />
                  <p className="text-[10px] text-slate-400 italic">Leave empty to auto-calculate based on marks.</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsMarksModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">Update Marks</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSystemConfigModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">System Settings</h3>
                  <p className="text-xs text-slate-500">Configure subjects, grades, departments, and activities</p>
                </div>
                <button onClick={() => setIsSystemConfigModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newPassMark = Number(formData.get("passMark"));
                const subjectsStr = formData.get("subjects") as string;
                const gradesStr = formData.get("grades") as string;
                const departmentsStr = formData.get("departments") as string;
                const activityTypesStr = formData.get("activityTypes") as string;
                
                const newSubjects = subjectsStr.split(",").map(s => s.trim()).filter(s => s !== "");
                const newGrades = gradesStr.split(",").map(s => s.trim()).filter(s => s !== "");
                const newDepartments = departmentsStr.split(",").map(s => s.trim()).filter(s => s !== "");
                const newActivityTypes = activityTypesStr.split(",").map(s => s.trim()).filter(s => s !== "");
                
                handleUpdateSystemConfig(newSubjects, newPassMark, newGrades, newDepartments, newActivityTypes);
              }} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Passing Mark (Threshold)</label>
                  <input 
                    name="passMark" 
                    type="number" 
                    min="0" 
                    max="100" 
                    defaultValue={passMark} 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none" 
                  />
                  <p className="text-[10px] text-slate-400 italic">Students scoring below this will be marked as "Fail"</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">School Infrastructure (Places)</h4>
                  <div className="flex flex-wrap gap-2">
                    {places.map(p => (
                      <div key={p.id} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
                        {p.name}
                        <button 
                          type="button"
                          onClick={() => handleDeletePlace(p.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      id="new-place-input"
                      type="text" 
                      placeholder="Add new place (e.g. Room 101)" 
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          if (input.value.trim()) {
                            handleAddPlace(input.value.trim());
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('new-place-input') as HTMLInputElement;
                        if (input.value.trim()) {
                          handleAddPlace(input.value.trim());
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subjects (Comma Separated)</label>
                  <textarea 
                    name="subjects" 
                    defaultValue={subjects.join(", ")} 
                    required 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" 
                    placeholder="Math, Science, English..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grades (Comma Separated)</label>
                  <textarea 
                    name="grades" 
                    defaultValue={grades.join(", ")} 
                    required 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" 
                    placeholder="10th, 11th, 12th..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Departments (Comma Separated)</label>
                  <textarea 
                    name="departments" 
                    defaultValue={departments.join(", ")} 
                    required 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" 
                    placeholder="Science, Humanities, Arts..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Activity Types (Comma Separated)</label>
                  <textarea 
                    name="activityTypes" 
                    defaultValue={activityTypes.join(", ")} 
                    required 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none" 
                    placeholder="Curriculum, Sports, Arts..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsSystemConfigModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-colors">Save Settings</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Update Profile</h3>
                <button onClick={() => setIsProfileModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const data = Object.fromEntries(formData.entries());
                handleUpdateProfile(data);
              }} className="p-8 space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                      {(localPhotoUrl || user?.photoUrl) ? (
                        <img 
                          src={localPhotoUrl || user?.photoUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                          onError={() => setLocalPhotoUrl("")}
                        />
                      ) : (
                        <Plus size={24} className="text-slate-300" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white">
                      <Plus size={16} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input name="name" defaultValue={user?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input name="email" type="email" defaultValue={user?.email} required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Photo URL</label>
                  <input 
                    name="photoUrl" 
                    defaultValue={user?.photoUrl} 
                    onChange={(e) => setLocalPhotoUrl(e.target.value)}
                    placeholder="https://picsum.photos/seed/user/200" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsProfileModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button 
                    type="submit" 
                    disabled={profileUpdateSuccess}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2",
                      profileUpdateSuccess ? "bg-emerald-50 text-emerald-600 shadow-none" : "bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600"
                    )}
                  >
                    {profileUpdateSuccess ? (
                      <>
                        <CheckCircle size={18} />
                        Updated!
                      </>
                    ) : "Update Profile"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chart Edit Modal */}
      <AnimatePresence>
        {isChartEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingChartTarget === "reports" ? "Edit Report Settings" : "Edit Analytics Chart"}
                </h3>
                <button onClick={() => setIsChartEditModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-6">
                {editingChartTarget !== "reports" && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chart Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["bar", "line", "pie"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setChartType(type as any)}
                          className={cn(
                            "py-2 rounded-xl text-xs font-bold border transition-all capitalize",
                            chartType === type 
                              ? "bg-indigo-50 border-indigo-200 text-indigo-600" 
                              : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {editingChartTarget === "reports" ? "Default Format" : "Time Range"}
                  </label>
                  <select 
                    value={analyticsTimeRange}
                    onChange={(e) => setAnalyticsTimeRange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  >
                    {editingChartTarget === "reports" ? (
                      <>
                        <option value="PDF">PDF</option>
                        <option value="XLSX">Excel (XLSX)</option>
                        <option value="CSV">CSV</option>
                      </>
                    ) : (
                      <>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="Current Term">Current Term</option>
                        <option value="Academic Year">Academic Year</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      if (editingChartTarget === "attendance") handleGenerateAnalytics();
                      if (editingChartTarget === "academic") handleGenerateAcademicGrowth();
                      setIsChartEditModalOpen(false);
                    }}
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                  >
                    {editingChartTarget === "reports" ? "Save Settings" : "Apply & Generate"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Generation Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Generate New Report</h3>
                <button onClick={() => setIsReportModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={handleGenerateReport} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Report Name</label>
                  <input name="name" required placeholder="e.g. Q3 Attendance Summary" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                    <select name="category" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      <option value="Academic">Academic</option>
                      <option value="Attendance">Attendance</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Enrollment">Enrollment</option>
                      <option value="Academic Performance">Academic Performance</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Format</label>
                    <select name="type" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      <option value="PDF">PDF</option>
                      <option value="XLSX">Excel (XLSX)</option>
                      <option value="CSV">CSV</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Year</label>
                    <select name="academicYear" defaultValue={selectedAcademicYear} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      {academicYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Month</label>
                    <select name="month" defaultValue={selectedMonth} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsReportModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">Generate</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Academic Year Modal */}
      <AnimatePresence>
        {isAcademicYearModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Academic Year</h3>
                <button onClick={() => setIsAcademicYearModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const val = (e.target as any).year.value;
                setAcademicYear(val);
                setIsAcademicYearModalOpen(false);
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Year</label>
                  <select name="year" defaultValue={academicYear} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none">
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsAcademicYearModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">Update</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Threshold Modal */}
      <AnimatePresence>
        {isThresholdModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-xl font-bold text-slate-900">Attendance Threshold</h3>
                <button onClick={() => setIsThresholdModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const val = parseInt((e.target as any).threshold.value);
                setAttendanceThreshold(val);
                setIsThresholdModalOpen(false);
              }} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Threshold (%)</label>
                  <input type="number" name="threshold" defaultValue={attendanceThreshold} min="0" max="100" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsThresholdModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmationModalOpen && confirmationConfig && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{confirmationConfig.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{confirmationConfig.message}</p>
              </div>
              <div className="p-6 bg-slate-50 flex gap-3">
                <button 
                  onClick={() => setIsConfirmationModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmationConfig.onConfirm}
                  className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
