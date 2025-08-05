import React, { useState, useEffect } from 'react';

function DataTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/content.json');
        if (!response.ok) throw new Error('Failed to load data');
        const content = await response.json();
        setData(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ background: 'blue', color: 'white', padding: '20px', textAlign: 'center' }}>
        📊 Loading Google Sheets data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'orange', color: 'white', padding: '20px', textAlign: 'center' }}>
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div style={{ background: 'green', color: 'white', padding: '20px', textAlign: 'center' }}>
      ✅ Google Sheets Data Loaded! 
      <br />
      📚 {data?.meta.totalFlashcards} flashcards, {data?.meta.totalChapters} chapters
    </div>
  );
}

export default DataTest;
