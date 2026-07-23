const pool = require('./db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connexion réussie ! Heure du serveur :', result.rows[0].now);
  } catch (err) {
    console.error('Erreur de connexion :', err.message);
  } finally {
    pool.end();
  }
}

testConnection();