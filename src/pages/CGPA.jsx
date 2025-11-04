import React, { useState } from "react";
import "./CGPA.css";

export default function CGPA() {
  const [subjects, setSubjects] = useState([
    { name: "", grade: "", credit: "" },
  ]);
  const [result, setResult] = useState(null);

  // Handle name change
  const handleNameChange = (index, value) => {
    const updated = [...subjects];
    updated[index].name = value;
    setSubjects(updated);
  };

  // Handle grade change
  const handleGradeChange = (index, value) => {
    const updated = [...subjects];
    updated[index].grade = value;
    setSubjects(updated);
  };

  // Handle credit hour change
  const handleCreditChange = (index, value) => {
    const updated = [...subjects];
    updated[index].credit = value;
    setSubjects(updated);
  };

  // Add new subject
  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", grade: "", credit: "" }]);
  };

  // Remove subject
  const handleRemoveSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  // Calculate weighted CGPA
  const handleCalculate = () => {
    // 🎓 UCP Grading Policy
    const points = {
      A: 4.0,
      "A-": 3.67,
      "B+": 3.33,
      B: 3.0,
      "B-": 2.67,
      "C+": 2.33,
      C: 2.0,
      "C-": 1.67,
      "D+": 1.33,
      D: 1.0,
      F: 0.0,
    };

    const validSubjects = subjects.filter(
      (s) => s.grade && s.credit && !isNaN(s.credit)
    );

    if (validSubjects.length === 0) {
      setResult("Please enter valid grades and credit hours.");
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    validSubjects.forEach((s) => {
      const gpa = points[s.grade];
      const credit = parseFloat(s.credit);
      totalPoints += gpa * credit;
      totalCredits += credit;
    });

    if (totalCredits === 0) {
      setResult("Total credit hours cannot be zero.");
      return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    setResult(cgpa);
  };

  // Reset everything
  const handleReset = () => {
    setSubjects([{ name: "", grade: "", credit: "" }]);
    setResult(null);
  };

  return (
    <div className="cgpa-page fade-in">
      <h2>CGPA Calculator</h2>
      <p>Enter your subject details, grades, and credit hours below:</p>

      <div className="subjects-list">
        {subjects.map((subject, index) => (
          <div key={index} className="subject-row">
            {/* Subject Name */}
            <input
              type="text"
              placeholder={`Subject ${index + 1} name`}
              value={subject.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="subject-input"
            />

            {/* Grade Selection */}
            <select
              value={subject.grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              className="subject-select"
            >
              <option value="">Select Grade</option>
              <option value="A">A (4.00) – 90–100%</option>
              <option value="A-">A- (3.67) – 86–89%</option>
              <option value="B+">B+ (3.33) – 81–85%</option>
              <option value="B">B (3.00) – 77–80%</option>
              <option value="B-">B- (2.67) – 72–76%</option>
              <option value="C+">C+ (2.33) – 68–71%</option>
              <option value="C">C (2.00) – 63–67%</option>
              <option value="C-">C- (1.67) – 58–62%</option>
              <option value="D+">D+ (1.33) – 54–57%</option>
              <option value="D">D (1.00) – 50–53%</option>
              <option value="F">F (0.00) – Below 50%</option>
            </select>

            {/* Credit Hours */}
            <input
              type="number"
              min="1"
              placeholder="Credit Hrs"
              value={subject.credit}
              onChange={(e) => handleCreditChange(index, e.target.value)}
              className="credit-input"
            />

            {/* Remove Button */}
            <button
              className="remove-btn"
              onClick={() => handleRemoveSubject(index)}
              disabled={subjects.length === 1}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="cgpa-buttons">
        <button className="btn-primary" onClick={handleAddSubject}>
          + Add Subject
        </button>
        <button className="btn-primary" onClick={handleCalculate}>
          Calculate CGPA
        </button>
        <button className="btn-danger" onClick={handleReset}>
          Reset
        </button>
      </div>

      {result && (
        <h3 className="cgpa-result">
          {isNaN(result) ? result : `Your Weighted CGPA: ${result}`}
        </h3>
      )}
    </div>
  );
}
