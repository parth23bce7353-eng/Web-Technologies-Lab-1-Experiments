import React, { useState } from 'react';

// Sub-component for individual list items to maintain logic separation
const ListItem = ({ item, onDelete }) => {
  return (
    <li style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', width: '250px' }}>
      <span>{item.text}</span>
      <button onClick={() => onDelete(item.id)} style={{ color: 'red' }}>
        Remove
      </button>
    </li>
  );
};

const ListManager = () => {
  // State for the list of items (Array State)
  const [items, setItems] = useState([]);
  // State for the input field
  const [inputValue, setInputValue] = useState('');

  // Add new item logic
  const addItem = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newItem = {
      id: Date.now(), // Unique identifier for key management
      text: inputValue
    };

    setItems([...items, newItem]); // Functional state update
    setInputValue(''); // Clear input after adding
  };

  // Remove item logic
  const removeItem = (id) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Dynamic Task List</h2>

      {/* Input Section */}
      <form onSubmit={addItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
        />
        <button type="submit" style={{ marginLeft: '10px' }}>Add Item</button>
      </form>

      {/* Conditional Rendering for empty list scenarios */}
      {items.length === 0 ? (
        <p style={{ color: 'gray' }}>Your list is empty. Add something above!</p>
      ) : (
        <ul>
          {/* Dynamic rendering using map() */}
          {items.map((item) => (
            <ListItem 
              key={item.id} // Key attribute for React reconciliation
              item={item} 
              onDelete={removeItem} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListManager;