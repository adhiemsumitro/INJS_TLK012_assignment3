const { Client } = require('pg');

const getTodos = async (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assignment3',
    password: 'Training#2024',
    port: 5432,
  });

  try {
    await client.connect();

    const query = 'SELECT * FROM Todos';
    const result = await client.query(query);
    res.status(200).json(result.rows);

  } catch (err) {
    res.status(500).send({ error: 'Database error' });
  } finally {
    await client.end();  // Close the connection
  }
};

module.exports = { getTodos };
