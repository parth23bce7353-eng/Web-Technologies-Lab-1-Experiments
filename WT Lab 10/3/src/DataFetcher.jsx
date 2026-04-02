import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  // 1. State management for data, loading, and errors
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. The side effect for fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Start loading state
        setIsLoading(true);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Update state with fetched data
        setData(result);
        setError(null);
      } catch (err) {
        // Handle API errors
        setError(err.message);
      } finally {
        // Stop loading regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 3. Empty dependency array ensures this runs only once on mount

  // 4. Conditional Rendering for Loading State
  if (isLoading) {
    return <div style={styles.center}>Loading posts...</div>;
  }

  // 5. Conditional Rendering for Error State
  if (error) {
    return <div style={{ ...styles.center, color: 'red' }}>Error: {error}</div>;
  }

  // 6. Dynamic List Rendering
  return (
    <div style={styles.container}>
      <h2>Latest Posts</h2>
      <ul style={styles.list}>
        {data.map((post) => (
          <li key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic Styling
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  list: { listStyle: 'none', padding: 0 },
  card: { 
    border: '1px solid #ddd', 
    marginBottom: '10px', 
    padding: '15px', 
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  center: { textAlign: 'center', marginTop: '50px', fontSize: '1.2rem' }
};

export default DataFetcher;