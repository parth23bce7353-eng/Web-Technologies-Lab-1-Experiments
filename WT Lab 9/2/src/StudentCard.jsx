import React from 'react';

// Functional component receiving 'props'
const StudentCard = (props) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    width: '250px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#333' }}>{props.name}</h2>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>Marks:</strong> {props.marks}%</p>
    </div>
  );
};

export default StudentCard;