import React from 'react';

const StudentProfile = () => {
  // Functional Requirement: Store details in JavaScript variables
  const student = {
    name: "Parth Kanzariya",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    regno : "23BCE7353"
  };

  return (
    // Functional Requirement: Group details inside HTML elements via JSX
    <div style={styles.card}>
      <h2 style={styles.header}>Student Profile</h2>
      <hr />
      <div style={styles.details}>
        {/* Functional Requirement: Render variables using curly braces */}
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Year:</strong> {student.year}</p>
        <p><strong>Registration Number:</strong> {student.regno}</p>
      </div>
    </div>
  );
};

// Basic internal styling for better presentation
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '300px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333'
  },
  details: {
    lineHeight: '1.6'
  }
};

// Functional Requirement: Export the component
export default StudentProfile;