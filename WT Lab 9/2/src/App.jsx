import React from 'react';
import StudentCard from './StudentCard';

function App() {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  };

  // Student data array
  const students = [
    { id: 1, name: "Parth Kanzariya", dept: "Computer Science", marks: 85 },
    { id: 2, name: "Abhay Dave", dept: "Electrical Engineering", marks: 78 },
    { id: 3, name: "Ashutosh Aahir", dept: "Mechanical Engineering", marks: 92 },
    { id: 4, name: "Raj Nakumn", dept: "Physics", marks: 88 }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Student Directory</h1>
      <div style={containerStyle}>
        {/* Mapping through data to reuse the StudentCard component */}
        {students.map((student) => (
          <StudentCard 
            key={student.id} 
            name={student.name} 
            department={student.dept} 
            marks={student.marks} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;