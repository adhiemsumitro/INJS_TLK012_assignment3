const { Client } = require('pg');

const registerUser = async (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'assignment3',
    password: 'Training#2024',
    port: 5432,
  });

  try {
    await client.connect();

    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send({ error: 'Invalid email format' });
    }

    const query = 'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING id';
    const values = [email, password];
    const result = await client.query(query, values);
    res.status(201).send({ message: 'User successfully registered', id: result.rows[0].id });

  } catch (err) {
    console.log(err);  // Debugging line to see the error
    res.status(500).send({ error: 'Database error' });
  } finally {
    await client.end();  // Close the connection
  }
};

module.exports = { registerUser };
