import { useEffect, useState } from 'react';

const App = () => {
  const [apiStatus, setApiStatus] = useState<string>('Chargement…');

  useEffect(() => {
    fetch(`${import.meta.env['VITE_API_URL'] ?? 'http://localhost:3000'}/`)
      .then((r) => r.json())
      .then((data) => setApiStatus(JSON.stringify(data, null, 2)))
      .catch(() => setApiStatus('❌ API injoignable'));
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🚀 FinFlow</h1>
      <p>Étape 2 : setup monorepo + Docker Compose ✅</p>
      <h2>Réponse de l'API :</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
        {apiStatus}
      </pre>
    </main>
  );
};

export default App