import React from 'react';
import NotaryExamApp from './components/NotaryExamApp';

function App() {
  return (
    <div 
      className="App" 
      style={{
        background: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        color: '#44403c'
      }}
    >
      <div style={{
        maxWidth: '28rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1rem'
      }}>
        <NotaryExamApp />
      </div>
    </div>
  );
}

export default App;