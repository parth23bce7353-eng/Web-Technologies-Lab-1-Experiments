import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     
  // --- 2. Side Effect (API Call) ---
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); 
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
        setError(null); 
      } 
      catch (err) {
        setError(err.message);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 
  if (loading) {
    return (
      <div style={styles.center}>
        <div className="spinner"></div>
        <p>Fetching data from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.center, color: '#d9534f' }}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} style={styles.button}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>React Data Fetcher</h1>
        <p>Side effects and asynchronous operations</p>
      </header>

      <div style={styles.grid}>
        {posts.map((post) => (
          <article key={post.id} style={styles.card}>
            <span style={styles.idBadge}>Post #{post.id}</span>
            <h3 style={styles.title}>{post.title}</h3>
            <p style={styles.body}>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column'
  },
  idBadge: {
    fontSize: '0.8rem',
    color: '#888',
    fontWeight: 'bold',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 10px 0',
    color: '#333',
    textTransform: 'capitalize'
  },
  body: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.5'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center'
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white'
  }
};

export default App;