import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    color: 'white'
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Interactive Counter</h1>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>
        {count}
      </div>
      <div>
        <button 
          onClick={handleDecrement} 
          style={{ ...buttonStyle, backgroundColor: '#f44336' }}
        >
          Decrease
        </button>
        <button 
          onClick={handleIncrement} 
          style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;