import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "db.json");

// Initial Database
const initialDb = {
  "users": [
    {
      "id": "U1",
      "email": "admin@school.com",
      "password": "password",
      "role": "admin",
      "name": "Admin User",
      "photoUrl": ""
    },
    {
      "id": "U2",
      "email": "teacher@school.com",
      "password": "password",
      "role": "teacher",
      "name": "Dr. Sarah Miller",
      "photoUrl": ""
    },
    {
      "id": "U3",
      "email": "student@school.com",
      "password": "password",
      "role": "student",
      "name": "Alice Johnson",
      "photoUrl": ""
    },
    {
      "id": "U4",
      "email": "dharanithasekar23@gmail.com",
      "password": "password",
      "role": "admin",
      "name": "Dharani",
      "photoUrl": "https://picsum.photos/seed/dharani/200"
    }
  ],
  "students": [
    {
      "id": "S1001",
      "name": "Abarna",
      "email": "abaruu@example.com",
      "grade": "10th",
      "attendance": 95,
      "phone": "+1 234 567 890",
      "address": "123 Maple St",
      "parentName": "Ram",
      "parentPhone": "9385589474",
      "marks": [
        {
          "subject": "Math",
          "score": 85
        },
        {
          "subject": "Science",
          "score": 90
        },
        {
          "subject": "English",
          "score": 88
        },
        {
          "subject": "History",
          "score": 92
        },
        {
          "subject": "Math",
          "score": 95,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Science",
          "score": 88,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "English",
          "score": 96,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "History",
          "score": 100,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Physics",
          "score": 58,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Chemistry",
          "score": 0,
          "isAbsent": true,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Fail"
        }
      ],
      "performance": "Excellent",
      "photoUrl": null
    },
    {
      "id": "S1002",
      "name": "Anushiya",
      "email": "anu@example.com",
      "grade": "10th",
      "attendance": 88,
      "phone": "+1 234 567 891",
      "address": "456 Oak Ave",
      "parentName": "Dhandapani",
      "parentPhone": "9442429182",
      "marks": [
        {
          "subject": "Math",
          "score": 70
        },
        {
          "subject": "Science",
          "score": 75
        },
        {
          "subject": "English",
          "score": 80
        },
        {
          "subject": "History",
          "score": 65
        }
      ],
      "performance": "Average",
      "photoUrl": null
    },
    {
      "id": "S1003",
      "name": "Abinaya",
      "email": "abieeee@example.com",
      "grade": "11th",
      "attendance": 92,
      "phone": "+1 234 567 892",
      "address": "789 Pine Rd",
      "parentName": "Sekar",
      "parentPhone": "9976022666",
      "marks": [
        {
          "subject": "Math",
          "score": 95
        },
        {
          "subject": "Science",
          "score": 88
        },
        {
          "subject": "English",
          "score": 90
        },
        {
          "subject": "History",
          "score": 85
        },
        {
          "subject": "Math",
          "score": 88,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Science",
          "score": 80,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "English",
          "score": 75,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "History",
          "score": 90,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Physics",
          "score": 100,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        },
        {
          "subject": "Chemistry",
          "score": 80,
          "isAbsent": false,
          "academicYear": "2025-26",
          "month": "March",
          "status": "Pass"
        }
      ],
      "performance": "Good",
      "photoUrl": null
    },
    {
      "id": "S1004",
      "name": "Dhanya",
      "email": "dhanzz@example.com",
      "grade": "12th",
      "attendance": 98,
      "phone": "+1 234 567 893",
      "address": "101 Amazon Way",
      "parentName": "Subramani",
      "parentPhone": "8903209424",
      "marks": [
        {
          "subject": "Math",
          "score": 100
        },
        {
          "subject": "Science",
          "score": 99
        },
        {
          "subject": "English",
          "score": 98
        },
        {
          "subject": "History",
          "score": 100
        }
      ],
      "performance": "Outstanding",
      "photoUrl": null
    },
    {
      "id": "S1005",
      "name": "Nandhitha",
      "email": "nandhu@example.com",
      "grade": "11th",
      "attendance": 85,
      "phone": "+1 234 567 894",
      "address": "202 Mission St",
      "parentName": "Sundara sekar",
      "parentPhone": "8012045585",
      "marks": [
        {
          "subject": "Math",
          "score": 65
        },
        {
          "subject": "Science",
          "score": 70
        },
        {
          "subject": "English",
          "score": 75
        },
        {
          "subject": "History",
          "score": 60
        }
      ],
      "performance": "Needs Improvement",
      "photoUrl": null
    },
    {
      "name": "Yazhini",
      "grade": "11th",
      "email": "yazhu@gmail.com",
      "parentName": "Ravi",
      "parentPhone": "9842631450",
      "photoUrl": null,
      "id": "S1006",
      "attendance": 100,
      "marks": [],
      "performance": "Good"
    },
    {
      "name": "Koushik",
      "grade": "12th",
      "email": "kousi@gmail.com",
      "parentName": "Sanmugam",
      "parentPhone": "9788847888",
      "photoUrl": null,
      "id": "S1008",
      "attendance": 100,
      "marks": [],
      "performance": "Good"
    },
    {
      "name": "Kayan",
      "grade": "11th",
      "email": "kayanesh@gmail.com",
      "parentName": "Madhu Prasath",
      "parentPhone": "9865932030",
      "photoUrl": null,
      "id": "S1008",
      "attendance": 100,
      "marks": [],
      "performance": "Good"
    },
    {
      "name": "Indhusree",
      "grade": "10th",
      "email": "indhu@gmail.com",
      "parentName": "Baby",
      "parentPhone": "8012345632",
      "photoUrl": null,
      "id": "S1009",
      "attendance": 100,
      "marks": [],
      "performance": "Good"
    },
    {
      "name": "Madhu Prasath",
      "grade": "12th",
      "email": "madhu@gmail.com",
      "parentName": "Ravi",
      "parentPhone": "8902304558",
      "photoUrl": null,
      "id": "S1010",
      "attendance": 100,
      "marks": [],
      "performance": "Good"
    }
  ],
  "teachers": [
    {
      "id": "T2001",
      "name": "Dr. Thivakaran",
      "email": "thiva@school.com",
      "subject": "Mathematics",
      "department": "Arts",
      "experience": "12 years",
      "photoUrl": null
    },
    {
      "id": "T2002",
      "name": "Mr. Sakthivel",
      "email": "sakthi@school.com",
      "subject": "Physics",
      "department": "Science",
      "experience": "8 years",
      "photoUrl": null
    },
    {
      "id": "T2003",
      "name": "Ms. Bala Subramaniam",
      "email": "balu@school.com",
      "subject": "History",
      "department": "Humanities",
      "experience": "15 years",
      "photoUrl": null
    },
    {
      "id": "T2004",
      "name": "Mr.Prabhakaran",
      "email": "prabha@school.com",
      "subject": "English",
      "department": "Languages",
      "experience": "10 years",
      "photoUrl": null
    },
    {
      "name": "Mrs.Karthika",
      "subject": "Mathematics",
      "email": "kathika@gmail.com",
      "department": "Arts",
      "experience": "8 years",
      "photoUrl": null,
      "id": "T2005"
    },
    {
      "name": "Miss.Malliga",
      "subject": "Tamil",
      "email": "malli@gmail.com",
      "department": "Languages",
      "experience": "15 years",
      "photoUrl": null,
      "id": "T2006"
    }
  ],
  "assignments": [
    {
      "id": "as1",
      "title": "Algebra Basics",
      "subject": "Math",
      "dueDate": "2026-03-25",
      "status": "Pending",
      "grade": "10th"
    },
    {
      "id": "as2",
      "title": "Newton's Laws",
      "subject": "Physics",
      "dueDate": "2026-03-28",
      "status": "Submitted",
      "grade": "11th"
    },
    {
      "id": "as3",
      "title": "French Revolution",
      "subject": "History",
      "dueDate": "2026-04-02",
      "status": "Pending",
      "grade": "12th"
    }
  ],
  "activities": [
    {
      "id": "a1",
      "title": "Science Fair",
      "date": "2026-04-15",
      "type": "Curriculum",
      "status": "Upcoming",
      "progress": 45
    },
    {
      "id": "a2",
      "title": "Math Olympiad",
      "date": "2026-03-25",
      "type": "Competition",
      "status": "Active",
      "progress": 80
    },
    {
      "id": "a3",
      "title": "Drama Workshop",
      "date": "2026-03-28",
      "type": "Arts",
      "status": "Upcoming",
      "progress": 10
    },
    {
      "id": "a4",
      "title": "Sports Day",
      "date": "2026-05-10",
      "type": "Sports",
      "status": "Planning",
      "progress": 0
    }
  ],
  "attendance": [
    {
      "id": "att-1",
      "studentId": "S1001",
      "date": "2026-03-20",
      "status": "Present"
    },
    {
      "id": "att-2",
      "studentId": "S1002",
      "date": "2026-03-20",
      "status": "Absent"
    },
    {
      "id": "att-1774366389919-S1001",
      "studentId": "S1001",
      "status": "Absent",
      "date": "2026-01-01"
    },
    {
      "id": "att-1774366389919-S1003",
      "studentId": "S1003",
      "status": "Present",
      "date": "2026-01-01"
    },
    {
      "id": "att-1774366389919-S1004",
      "studentId": "S1004",
      "status": "Present",
      "date": "2026-01-01"
    },
    {
      "id": "att-1774366389919-S1005",
      "studentId": "S1005",
      "status": "Present",
      "date": "2026-01-01"
    },
    {
      "id": "att-1774369005076-S1009",
      "studentId": "S1009",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1008",
      "studentId": "S1008",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1010",
      "studentId": "S1010",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1006",
      "studentId": "S1006",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1005",
      "studentId": "S1005",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1002",
      "studentId": "S1002",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1004",
      "studentId": "S1004",
      "status": "Present",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1003",
      "studentId": "S1003",
      "status": "Absent",
      "date": "2026-03-23"
    },
    {
      "id": "att-1774369005076-S1001",
      "studentId": "S1001",
      "status": "Absent",
      "date": "2026-03-23"
    }
  ],
  "timetable": [
    {
      "day": "Monday",
      "slots": [
        {
          "time": "09:00 - 10:00",
          "subject": "Math",
          "teacher": "Dr.Thivakaran"
        },
        {
          "time": "10:00 - 11:00",
          "subject": "Physics",
          "teacher": "Mr. Sakthivel"
        },
        {
          "time": "11:00 - 12:00",
          "subject": "History",
          "teacher": "Mr.Bala Subramaniam"
        },
        {
          "time": "13:00 - 14:00",
          "subject": "English",
          "teacher": "Mr.Praabhakaran"
        }
      ]
    },
    {
      "day": "Tuesday",
      "slots": [
        {
          "time": "09:00 - 10:00",
          "subject": "Physics",
          "teacher": "Mr. Sakthivel"
        },
        {
          "time": "10:00 - 11:00",
          "subject": "Math",
          "teacher": "Mrs.Karthika"
        },
        {
          "time": "11:00 - 12:00",
          "subject": "English",
          "teacher": "Mr.Prabhakaran"
        },
        {
          "time": "13:00 - 14:00",
          "subject": "History",
          "teacher": "Mr.Bala Subramaniam"
        }
      ]
    }
  ],
  "notifications": [
    {
      "id": "n1",
      "title": "New Assignment",
      "message": "Physics assignment due Friday",
      "date": "2026-03-21",
      "type": "assignment"
    },
    {
      "id": "n2",
      "title": "Parent Teacher Meeting",
      "message": "Scheduled for next Monday at 4 PM",
      "date": "2026-03-20",
      "type": "event"
    },
    {
      "id": "n3",
      "title": "Holiday Notice",
      "message": "School closed on Friday for Spring Break",
      "date": "2026-03-19",
      "type": "event"
    },
    {
      "id": "n4",
      "title": "Absence Alert",
      "message": "Student Bob Smith is absent today",
      "date": "2026-03-21",
      "type": "absence"
    }
  ],
  "reports": [
    {
      "id": "r1",
      "name": "Annual Academic Summary 2025",
      "date": "Mar 15, 2026",
      "size": "2.4 MB",
      "type": "PDF",
      "category": "Academic"
    },
    {
      "id": "r2",
      "name": "Q1 Attendance Analytics",
      "date": "Mar 10, 2026",
      "size": "1.1 MB",
      "type": "XLSX",
      "category": "Attendance"
    },
    {
      "id": "r3",
      "name": "Teacher Performance Review",
      "date": "Mar 05, 2026",
      "size": "850 KB",
      "type": "PDF",
      "category": "Faculty"
    },
    {
      "id": "r4",
      "name": "Student Enrollment Trends",
      "date": "Feb 28, 2026",
      "size": "3.2 MB",
      "type": "PDF",
      "category": "Enrollment"
    },
    {
      "id": "r5",
      "name": "Monthly Attendance Report - Feb",
      "date": "Mar 01, 2026",
      "size": "1.5 MB",
      "type": "PDF",
      "category": "Attendance"
    }
  ],
  "subjects": [
    "Math",
    "Science",
    "English",
    "History",
    "Physics",
    "Chemistry"
  ],
  "grades": [
    "10th",
    "11th",
    "12th"
  ],
  "departments": [
    "Science",
    "Humanities",
    "Languages",
    "Arts"
  ],
  "activityTypes": [
    "Curriculum",
    "Competition",
    "Arts",
    "Sports"
  ],
  "places": [
    {
      "id": "p1",
      "name": "Main Hall"
    },
    {
      "id": "p2",
      "name": "Science Lab"
    },
    {
      "id": "p3",
      "name": "Sports Ground"
    },
    {
      "id": "p4",
      "name": "Library"
    },
    {
      "id": "p5",
      "name": "Auditorium"
    }
  ],
  "passMark": 40,
  "settings": {
    "absenceAlerts": true,
    "assignmentDeadlines": true,
    "eventNotifications": true,
    "pushEnabled": true
  }
};

// Load DB from file or use initial
let db = initialDb;
if (fs.existsSync(DB_FILE)) {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    db = JSON.parse(data);
  } catch (e) {
    console.error("Failed to load DB, using initial", e);
  }
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error("Failed to save DB", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  // API Routes
  app.get("/api/config", (req, res) => {
    res.json({
      subjects: db.subjects,
      grades: db.grades,
      departments: db.departments,
      activityTypes: db.activityTypes,
      places: db.places,
      passMark: db.passMark
    });
  });

  app.post("/api/places", (req, res) => {
    const { name } = req.body;
    const newPlace = { id: `p${Date.now()}`, name };
    db.places.push(newPlace);
    saveDb();
    res.status(201).json(newPlace);
  });

  app.delete("/api/places/:id", (req, res) => {
    const { id } = req.params;
    db.places = db.places.filter(p => p.id !== id);
    saveDb();
    res.status(204).end();
  });

  app.put("/api/config", (req, res) => {
    const { subjects, grades, departments, activityTypes, passMark } = req.body;
    if (subjects) db.subjects = subjects;
    if (grades) db.grades = grades;
    if (departments) db.departments = departments;
    if (activityTypes) db.activityTypes = activityTypes;
    if (passMark !== undefined) db.passMark = Number(passMark);
    saveDb();
    res.json({ success: true, config: {
      subjects: db.subjects,
      grades: db.grades,
      departments: db.departments,
      activityTypes: db.activityTypes,
      passMark: db.passMark
    }});
  });
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, photoUrl: user.photoUrl } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/dashboard/stats", (req, res) => {
    res.json({
      totalStudents: db.students.length,
      totalTeachers: db.teachers.length,
      activeActivities: db.activities.filter(a => a.status === "Active").length,
      avgAttendance: 91.5
    });
  });

  // Students CRUD
  app.get("/api/students", (req, res) => res.json(db.students));
  app.post("/api/students", (req, res) => {
    const newStudent = { ...req.body, id: `S${1000 + db.students.length + 1}`, attendance: 100, marks: [], performance: "Good" };
    db.students.push(newStudent);
    saveDb();
    res.status(201).json(newStudent);
  });
  app.put("/api/students/:id", (req, res) => {
    const index = db.students.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
      db.students[index] = { ...db.students[index], ...req.body };
      saveDb();
      res.json(db.students[index]);
    } else res.status(404).json({ message: "Not found" });
  });
  app.delete("/api/students/:id", (req, res) => {
    const index = db.students.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
      db.students.splice(index, 1);
      saveDb();
      res.status(204).send();
    } else res.status(404).json({ message: "Not found" });
  });

  app.put("/api/students/:id/marks", (req, res) => {
    const { marks, performance, academicYear, month } = req.body;
    const index = db.students.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
      const student = db.students[index];
      if (!student.marks) student.marks = [];

      const newMarks = marks.map((m: any) => ({
        ...m,
        academicYear,
        month,
        status: m.score >= db.passMark ? "Pass" : "Fail"
      }));

      const otherMarks = student.marks.filter((m: any) => 
        !(m.academicYear === academicYear && m.month === month)
      );

      student.marks = [...otherMarks, ...newMarks];

      if (performance) {
        student.performance = performance;
      } else {
        const total = newMarks.reduce((acc: number, curr: any) => acc + curr.score, 0);
        const avg = total / newMarks.length;
        const hasFailed = newMarks.some((m: any) => m.status === "Fail");
        
        if (hasFailed) student.performance = "Needs Improvement (Failed)";
        else {
          if (avg >= 90) student.performance = "Outstanding";
          else if (avg >= 80) student.performance = "Excellent";
          else if (avg >= 70) student.performance = "Good";
          else if (avg >= 60) student.performance = "Average";
          else student.performance = "Pass";
        }
      }
      
      saveDb();
      res.json(student);
    } else res.status(404).json({ message: "Not found" });
  });

  app.delete("/api/students/:id/marks/:subject", (req, res) => {
    const { id, subject } = req.params;
    const index = db.students.findIndex(s => s.id === id);
    if (index !== -1) {
      db.students[index].marks = db.students[index].marks.filter((m: any) => m.subject !== subject);
      saveDb();
      res.json(db.students[index]);
    } else res.status(404).json({ message: "Not found" });
  });

  // Subjects & Pass Mark API
  app.get("/api/marks/config", (req, res) => {
    res.json({ subjects: db.subjects, passMark: db.passMark });
  });

  app.put("/api/marks/config", (req, res) => {
    const { subjects, passMark } = req.body;
    if (subjects) db.subjects = subjects;
    if (passMark !== undefined) db.passMark = passMark;
    saveDb();
    res.json({ subjects: db.subjects, passMark: db.passMark });
  });

  // Teachers CRUD
  app.get("/api/teachers", (req, res) => res.json(db.teachers));
  app.post("/api/teachers", (req, res) => {
    const newTeacher = { ...req.body, id: `T${2000 + db.teachers.length + 1}` };
    db.teachers.push(newTeacher);
    saveDb();
    res.status(201).json(newTeacher);
  });
  app.put("/api/teachers/:id", (req, res) => {
    const index = db.teachers.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      db.teachers[index] = { ...db.teachers[index], ...req.body };
      saveDb();
      res.json(db.teachers[index]);
    } else res.status(404).json({ message: "Not found" });
  });
  app.delete("/api/teachers/:id", (req, res) => {
    const index = db.teachers.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      db.teachers.splice(index, 1);
      saveDb();
      res.status(204).send();
    } else res.status(404).json({ message: "Not found" });
  });

  app.get("/api/assignments", (req, res) => res.json(db.assignments));
  app.post("/api/assignments", (req, res) => {
    const newAssignment = { ...req.body, id: `as-${Date.now()}` };
    db.assignments.push(newAssignment);
    saveDb();
    res.status(201).json(newAssignment);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const index = db.assignments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      db.assignments[index] = { ...db.assignments[index], ...req.body };
      saveDb();
      res.json(db.assignments[index]);
    } else res.status(404).json({ message: "Not found" });
  });
  app.delete("/api/assignments/:id", (req, res) => {
    const index = db.assignments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      db.assignments.splice(index, 1);
      saveDb();
      res.status(204).send();
    } else res.status(404).json({ message: "Not found" });
  });

  app.get("/api/activities", (req, res) => res.json(db.activities));
  app.post("/api/activities", (req, res) => {
    const newActivity = { ...req.body, id: `a-${Date.now()}`, progress: req.body.progress || 0 };
    db.activities.push(newActivity);
    saveDb();
    res.status(201).json(newActivity);
  });
  app.put("/api/activities/:id", (req, res) => {
    const index = db.activities.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      db.activities[index] = { ...db.activities[index], ...req.body };
      saveDb();
      res.json(db.activities[index]);
    } else res.status(404).json({ message: "Not found" });
  });
  app.delete("/api/activities/:id", (req, res) => {
    const index = db.activities.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      db.activities.splice(index, 1);
      saveDb();
      res.status(204).send();
    } else res.status(404).json({ message: "Not found" });
  });

  app.get("/api/attendance", (req, res) => res.json(db.attendance));
  
  app.delete("/api/notifications/:id", (req, res) => {
    const { id } = req.params;
    db.notifications = db.notifications.filter(n => n.id !== id);
    saveDb();
    res.json({ success: true });
  });

  app.get("/api/timetable", (req, res) => res.json(db.timetable));
  app.put("/api/timetable", (req, res) => {
    db.timetable = req.body;
    saveDb();
    res.json(db.timetable);
  });
  app.get("/api/notifications", (req, res) => {
    let filtered = db.notifications;
    if (!db.settings.absenceAlerts) filtered = filtered.filter(n => n.type !== "absence");
    if (!db.settings.assignmentDeadlines) filtered = filtered.filter(n => n.type !== "assignment");
    if (!db.settings.eventNotifications) filtered = filtered.filter(n => n.type !== "event");
    res.json(filtered);
  });

  app.post("/api/notifications", (req, res) => {
    const { title, message, type } = req.body;
    const newNotification = {
      id: `n${Date.now()}`,
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      type
    };
    db.notifications.unshift(newNotification);
    saveDb();
    res.status(201).json(newNotification);
  });

  app.get("/api/settings", (req, res) => res.json(db.settings));
  app.put("/api/settings", (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    saveDb();
    res.json(db.settings);
  });
  app.delete("/api/timetable/:day/:slotIndex", (req, res) => {
    const { day, slotIndex } = req.params;
    const idx = parseInt(slotIndex);
    const daySchedule = db.timetable.find(d => d.day === day);
    if (daySchedule) {
      daySchedule.slots.splice(idx, 1);
      saveDb();
      res.json(db.timetable);
    } else {
      res.status(404).json({ message: "Day not found" });
    }
  });

  app.get("/api/reports", (req, res) => {
    res.json(db.reports);
  });

  app.delete("/api/reports/:id", (req, res) => {
    const { id } = req.params;
    db.reports = db.reports.filter(r => r.id !== id);
    saveDb();
    res.json({ success: true });
  });

  app.get("/api/analytics/attendance", (req, res) => {
    const { grade } = req.query;
    
    if (grade === "All Classes") {
      // Get latest date
      const latestDate = [...new Set(db.attendance.map(a => a.date))].sort().pop();
      if (!latestDate) {
        return res.json(db.grades.map(g => ({ name: g, present: 0, absent: 0 })));
      }

      const analytics = db.grades.map(g => {
        const classStudents = db.students.filter(s => s.grade === g);
        const studentIds = new Set(classStudents.map(s => s.id));
        const dayAttendance = db.attendance.filter(a => a.date === latestDate && studentIds.has(a.studentId));
        const present = dayAttendance.filter(a => a.status === "Present").length;
        const absent = dayAttendance.filter(a => a.status === "Absent").length;
        return { name: g, present, absent, date: latestDate };
      });
      return res.json(analytics);
    }

    let filteredStudents = db.students;
    if (grade && grade !== "All Classes") {
      filteredStudents = db.students.filter(s => s.grade === grade);
    }

    const studentIds = new Set(filteredStudents.map(s => s.id));
    
    // Get last 5 days of attendance
    const dates = [...new Set(db.attendance.map(a => a.date))].sort().slice(-5);
    
    if (dates.length === 0) {
      // Fallback if no attendance data
      return res.json([
        { name: "Mon", present: 0, absent: 0 },
        { name: "Tue", present: 0, absent: 0 },
        { name: "Wed", present: 0, absent: 0 },
        { name: "Thu", present: 0, absent: 0 },
        { name: "Fri", present: 0, absent: 0 },
      ]);
    }

    const analytics = dates.map(date => {
      const dayAttendance = db.attendance.filter(a => a.date === date && studentIds.has(a.studentId));
      const present = dayAttendance.filter(a => a.status === "Present").length;
      const absent = dayAttendance.filter(a => a.status === "Absent").length;
      
      // Format date to day name
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      
      return { name: dayName, present, absent };
    });

    res.json(analytics);
  });

  app.get("/api/analytics/academic", (req, res) => {
    const { grade } = req.query;
    
    if (grade === "All Classes") {
      const analytics = db.grades.map(g => {
        const classStudents = db.students.filter(s => s.grade === g);
        if (classStudents.length === 0) return { name: g, score: 0 };
        
        const totalAvg = classStudents.reduce((acc: number, s: any) => {
          if (!s.marks || s.marks.length === 0) return acc;
          const studentAvg = (s.marks as any[]).reduce((sum: number, m: any) => sum + (m.score || 0), 0) / s.marks.length;
          return acc + studentAvg;
        }, 0) / classStudents.length;
        
        return { name: g, score: Math.round(totalAvg) };
      });
      return res.json(analytics);
    }

    let filteredStudents = db.students;
    if (grade && grade !== "All Classes") {
      filteredStudents = db.students.filter(s => s.grade === grade);
    }

    if (filteredStudents.length === 0) {
      return res.json([
        { month: 'Jan', score: 0 },
        { month: 'Feb', score: 0 },
        { month: 'Mar', score: 0 },
        { month: 'Apr', score: 0 },
        { month: 'May', score: 0 },
        { month: 'Jun', score: 0 },
      ]);
    }

    // Calculate average score across all subjects for the filtered students
    // In a real app, we'd have historical marks. Here we'll simulate some growth based on current marks.
    const avgScore = filteredStudents.reduce((acc: number, s: any) => {
      if (!s.marks || s.marks.length === 0) return acc;
      const studentAvg = (s.marks as any[]).reduce((sum: number, m: any) => sum + (m.score || 0), 0) / s.marks.length;
      return acc + studentAvg;
    }, 0) / filteredStudents.length;

    const analytics = [
      { month: 'Jan', score: Math.max(0, Math.round(avgScore - 10)) },
      { month: 'Feb', score: Math.max(0, Math.round(avgScore - 7)) },
      { month: 'Mar', score: Math.max(0, Math.round(avgScore - 4)) },
      { month: 'Apr', score: Math.max(0, Math.round(avgScore - 2)) },
      { month: 'May', score: Math.round(avgScore) },
      { month: 'Jun', score: Math.min(100, Math.round(avgScore + 3)) },
    ];

    res.json(analytics);
  });

  app.put("/api/profile", (req, res) => {
    const { id, name, email, photoUrl } = req.body;
    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      db.users[userIndex] = { ...db.users[userIndex], name, email, photoUrl };
      saveDb();
      res.json({ success: true, user: db.users[userIndex] });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });

  // AI Endpoints
  app.post("/api/ai/chat", (req, res) => {
    const { message } = req.body;
    let response = "I'm your EduSmart AI assistant. How can I help you today?";
    if (message.toLowerCase().includes("attendance")) {
      response = "The average attendance for this month is 91.5%. Alice Johnson has the highest attendance at 95%.";
    } else if (message.toLowerCase().includes("math")) {
      response = "Student Bob Smith needs improvement in Math (current score: 70). I suggest assigning extra practice problems on Algebra.";
    } else if (message.toLowerCase().includes("predict")) {
      response = "Based on current trends, we predict a 5% increase in overall academic performance by the end of the semester.";
    }
    res.json({ response });
  });

  app.get("/api/ai/insights", (req, res) => {
    res.json([
      { type: "warning", message: "Attendance dropping trend in 11th Grade (down 5% this week)." },
      { type: "suggestion", message: "Student Bob Smith needs improvement in Math. Suggest extra tutoring." },
      { type: "success", message: "Academic performance in Science is up by 12% across all grades." }
    ]);
  });

  app.get("/api/attendance", (req, res) => {
    const { date } = req.query;
    if (date) {
      res.json(db.attendance.filter((a: any) => a.date === date));
    } else {
      res.json(db.attendance);
    }
  });

  app.post("/api/attendance", (req, res) => {
    const { date, records } = req.body;
    if (records && Array.isArray(records)) {
      records.forEach((record: any) => {
        // Upsert logic: remove existing for this student on this date
        db.attendance = db.attendance.filter(a => !(a.studentId === record.studentId && a.date === date));
        
        db.attendance.push({
          id: `att-${Date.now()}-${record.studentId}`,
          studentId: record.studentId,
          status: record.status,
          date
        });
      });
      saveDb();
      res.status(201).json({ message: "Attendance recorded" });
    } else {
      const { studentId, status } = req.body;
      db.attendance = db.attendance.filter(a => !(a.studentId === studentId && a.date === date));
      db.attendance.push({ id: `att-${Date.now()}-${studentId}`, studentId, date, status });
      saveDb();
      res.status(201).json({ message: "Attendance recorded" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
