import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem = {
      id: Date.now(), // Unique ID for React Keys
      text: inputValue
    };

    setItems([...items, newItem]);
    setInputValue("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>My List</h1>
      
      <form onSubmit={addItem} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add something..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit">Add</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      {items.length === 0 ? (
        <p>The list is currently empty.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px', 
              borderBottom: '1px solid #ddd' 
            }}>
              {item.text}
              <button onClick={() => removeItem(item.id)} style={{ color: 'red' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;