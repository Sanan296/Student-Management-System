// src/pages/Subjects.jsx
import React, { useState } from "react";
import "./Subjects.css";

const Subjects = () => {
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(null);

  const subjectsData = {
    CS: {
      1: ["Programming Fundamentals", "Calculus I", "ICT", "English", "Applied Physics"],
      2: ["OOP", "Discrete Mathematics", "Database Systems", "Pakistan Studies", "Linear Algebra"],
      3: ["Data Structures", "Operating Systems", "Software Engineering", "Communication Skills", "Statistics"],
      4: ["Web Development", "Computer Networks", "Numerical Computing", "Technical Writing", "Probability"],
      5: ["Algorithm Design", "AI Basics", "Database Administration", "Mobile Computing", "Computer Architecture"],
      6: ["Compiler Construction", "Machine Learning", "Data Warehousing", "Entrepreneurship", "Research Methods"],
      7: ["Parallel Computing", "Network Security", "Cloud Computing", "Professional Ethics", "UI/UX Design"],
      8: ["Final Year Project II", "Big Data", "Cyber Security", "Blockchain Basics", "Project Management"]
    },
    SE: {
      1: ["Programming Fundamentals", "Calculus I", "ICT", "English", "Applied Physics"],
      2: ["OOP", "Discrete Structures", "Database Systems", "Pakistan Studies", "Linear Algebra"],
      3: ["Data Structures", "Software Design", "Computer Architecture", "Communication Skills", "Statistics"],
      4: ["Software Requirements", "Human Computer Interaction", "Numerical Computing", "Technical Writing", "Probability"],
      5: ["Software Testing", "AI Basics", "Web Engineering", "Mobile Computing", "Software Construction"],
      6: ["Software Quality", "Machine Learning", "Project Management", "Entrepreneurship", "Research Methods"],
      7: ["Software Reuse", "Network Security", "Cloud Computing", "Professional Ethics", "UI/UX Design"],
      8: ["Final Year Project II", "Software Maintenance", "Cyber Security", "Blockchain Basics", "Agile Methods"]
    },
    AI: {
      1: ["Intro to AI", "Linear Algebra", "ICT", "English", "Programming Fundamentals"],
      2: ["OOP", "Probability", "Database Systems", "Pakistan Studies", "Discrete Math"],
      3: ["Data Structures", "Machine Learning I", "Operating Systems", "Communication Skills", "Statistics"],
      4: ["Deep Learning", "Computer Vision", "Web Development", "Technical Writing", "Numerical Analysis"],
      5: ["Reinforcement Learning", "Data Science", "AI Ethics", "Mobile Computing", "Algorithm Design"],
      6: ["NLP", "Cloud AI", "Robotics", "Entrepreneurship", "Research Methods"],
      7: ["Computer Graphics", "Network Security", "Big Data AI", "Professional Ethics", "AI Optimization"],
      8: ["Final Year Project II", "AI in Healthcare", "AI for IoT", "Blockchain Basics", "Project Management"]
    },
    IT: {
    1: ["Introduction to IT", "Programming Fundamentals", "Digital Logic Design", "Calculus I", "English"],
    2: ["Object-Oriented Programming", "Data Structures & Algorithms", "Database Systems I", "Operating Systems", "Pakistan Studies"],
    3: ["Computer Networks", "IT Project Management", "System Administration", "Linear Algebra", "Technical Writing"],
    4: ["Information Security", "Cloud Computing Basics", "Web Technologies (Frontend)", "Statistics", "IT Infrastructure"],
    5: ["Enterprise Resource Planning (ERP)", "Network Security", "System Integration", "Middleware Systems", "Professional Ethics"],
    6: ["Virtualization & Data Centers", "IT Audit & Assurance", "Advanced Networking", "Research Methods", "Elective I"],
    7: ["Disaster Recovery & Business Continuity", "Big Data Management", "IT Strategy & Governance", "Mobile Computing", "Elective II"],
    8: ["Final Year Project II", "Professional Practices", "IT Capstone Seminar", "E-Commerce Systems", "Elective III"]
},DS: {
    1: ["Calculus & Analytical Geometry", "Programming Fundamentals (Python/R)", "Linear Algebra", "English", "ICT"],
    2: ["Probability & Statistics", "Data Structures", "Database Systems", "Object-Oriented Programming", "Discrete Mathematics"],
    3: ["Introduction to Data Science", "Statistical Modeling", "Data Mining", "Numerical Analysis", "Differential Equations"],
    4: ["Machine Learning I (Supervised)", "Data Visualization", "Big Data Analytics (Hadoop)", "Technical Writing", "Operating Systems"],
    5: ["Machine Learning II (Deep Learning)", "Natural Language Processing (NLP)", "Time Series Analysis", "Algorithm Design", "AI Ethics"],
    6: ["Cloud Computing for DS", "Data Warehousing", "Optimization Techniques", "Research Methods", "Elective I"],
    7: ["Data Governance & Security", "Advanced Statistical Methods", "Distributed Systems", "Professional Practices", "Elective II"],
    8: ["Final Year Project II", "Business Intelligence", "DS Capstone Seminar", "Advanced Machine Learning", "Elective III"]
},CyberSecurity: {
    1: ["Introduction to Security", "Programming Fundamentals", "Digital Logic Design", "Calculus I", "English"],
    2: ["Computer Networks", "Operating Systems", "Network Security Fundamentals", "Object-Oriented Programming", "Discrete Mathematics"],
    3: ["Ethical Hacking & Penetration Testing", "Cryptography", "System Hardening (Linux/Windows)", "Data Structures", "Probability & Statistics"],
    4: ["Web Application Security", "Digital Forensics I", "Malware Analysis", "Technical Writing", "Database Systems"],
    5: ["Cloud Security", "Security Policy, Law & Compliance", "Incident Response & Handling", "Algorithm Design", "Wireless Security"],
    6: ["Security Audit & Testing", "Risk Management", "Advanced Cryptography", "Research Methods", "Elective I"],
    7: ["Blockchain Security", "Intrusion Detection/Prevention", "Advanced Digital Forensics", "Professional Practices", "Elective II"],
    8: ["Final Year Project II", "Security Capstone Seminar", "IoT Security", "Advanced Ethical Hacking", "Elective III"]
},GameDevelopment: {
    1: ["Programming Fundamentals (C++)", "Introduction to Game Design", "Linear Algebra", "Calculus I", "English"],
    2: ["Object-Oriented Programming", "Game Mathematics", "Data Structures", "Digital Logic Design", "Pakistan Studies"],
    3: ["Computer Graphics Programming", "Game Engine Architecture", "Advanced C++ for Games", "Operating Systems", "3D Modeling Basics"],
    4: ["Game Physics", "Artificial Intelligence for Games", "Web Development", "Technical Writing", "Numerical Analysis"],
    5: ["Real-Time Rendering Techniques", "Networked Game Development", "Level Design", "Algorithm Design", "Probability & Statistics"],
    6: ["Game Audio Programming", "UI/UX Design for Games", "Game Production & Management", "Research Methods", "Elective I"],
    7: ["Console/Mobile Game Development", "Simulation and Modeling", "Game Art Integration", "Professional Practices", "Elective II"],
    8: ["Final Game Project II", "GD Capstone Seminar", "Monetization & Marketing", "Advanced AI for Games", "Elective III"]
},CloudComputing: {
    1: ["Introduction to Programming", "Computer Networks", "Linux Administration", "Calculus I", "English"],
    2: ["Operating Systems", "Data Structures", "Virtualization & Containerization", "Object-Oriented Programming", "Discrete Mathematics"],
    3: ["Cloud Computing Concepts (IaaS/PaaS)", "AWS/Azure Fundamentals", "Cloud Storage & Databases", "System Administration", "Technical Writing"],
    4: ["DevOps Principles & Tools", "Serverless Computing", "Cloud Security & Compliance", "Scripting (Python/Bash)", "Web Development"],
    5: ["Cloud Solution Architecture", "Microservices & APIs", "Distributed Systems", "Algorithm Design", "Professional Ethics"],
    6: ["Cloud FinOps (Cost Mgmt)", "Big Data on Cloud", "Advanced Cloud Networking", "Research Methods", "Elective I"],
    7: ["Disaster Recovery & BCP", "Hybrid & Multi-Cloud Strategies", "Automation & Orchestration", "Mobile Computing", "Elective II"],
    8: ["Final Year Project II", "Cloud Certifications Seminar", "Advanced Cloud Security", "Networking Architectures", "Elective III"]
},CE: {
    1: ["Circuit Analysis", "Programming Fundamentals (C/C++)", "Digital Logic Design", "Calculus I", "English"],
    2: ["Electronic Devices & Circuits", "Data Structures", "Computer Organization & Assembly Language", "Differential Equations", "Pakistan Studies"],
    3: ["Signals and Systems", "Microprocessor Systems", "Computer Architecture", "Object-Oriented Programming", "Linear Algebra"],
    4: ["Operating Systems", "Embedded Systems", "VLSI Design I", "Technical Writing", "Probability & Statistics"],
    5: ["Control Systems", "Digital Signal Processing", "Real-Time Systems", "Computer Networks", "Algorithm Design"],
    6: ["VLSI Design II", "Hardware/Software Co-Design", "Advanced Computer Architecture", "Research Methods", "Elective I"],
    7: ["Robotics & Automation", "Parallel Computing", "Advanced Embedded Systems", "Professional Practices", "Elective II"],
    8: ["Final Year Project II", "CE Capstone Seminar", "System Modeling & Simulation", "Digital Image Processing", "Elective III"]
},IS: {
    1: ["Introduction to Business Management", "Programming Fundamentals", "Financial Accounting", "Calculus I", "English"],
    2: ["Database Systems", "Data Structures", "Systems Analysis & Design", "Marketing Principles", "Statistics"],
    3: ["Information Systems Management", "Business Process Modeling", "Web Development Fundamentals", "Object-Oriented Programming", "Technical Writing"],
    4: ["Enterprise Resource Planning (ERP)", "Operations Management", "Decision Support Systems", "Computer Networks", "Linear Algebra"],
    5: ["IT Strategy & Governance", "Supply Chain Management Systems", "Information Systems Audit", "Algorithm Design", "Business Intelligence"],
    6: ["Information Security & Risk Management", "Project Management", "E-Commerce Architectures", "Research Methods", "Elective I"],
    7: ["Business Intelligence & Data Warehousing", "Data Mining for IS", "Cloud Systems for Business", "Professional Practices", "Elective II"],
    8: ["Final Year Project II", "IS Capstone Seminar", "Big Data Analytics", "Change Management", "Elective III"]
}
  };

  return (
    <div className="subjects-container fade-in">
      <h2>Select Department</h2>

      <div className="dropdown-container">
        {/* <label>Select Department:</label> */}
        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setSelectedSemester(null);
          }}
        >
          <option value="">-- Choose Department --</option>
          <option value="CS">Computer Science (CS)</option>
          <option value="SE">Software Engineering (SE)</option>
          <option value="AI">Artificial Intelligence (AI)</option>
          <option value="IT">Information Technology (IT)</option>
          <option value="DS">Data Science (DS)</option>
          <option value="CyberSecurity">Cyber Security</option>
          <option value="GameDevelopment">Game Development</option>
          <option value="CloudComputing">Cloud Computing</option>
          <option value="CE">Computer Engineering (CE)</option>
          <option value="IS">Information Systems (IS)</option>
        </select>
      </div>

      {selectedDept && (
        <div className="semester-section">
          <h3>{selectedDept} Department – Select a Semester</h3>
          <div className="semester-buttons">
            {[...Array(8).keys()].map((i) => (
              <button
                key={i + 1}
                onClick={() => setSelectedSemester(i + 1)}
                className={selectedSemester === i + 1 ? "active-semester" : ""}
              >
                Semester {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSemester && selectedDept && (
        <div className="courses-section">
          <h4>
            {selectedDept} - Semester {selectedSemester} Courses
          </h4>
          <ul>
            {subjectsData[selectedDept][selectedSemester].map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subjects;
