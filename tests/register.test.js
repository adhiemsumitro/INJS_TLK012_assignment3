const request = require('supertest');
const app = require('../app');
const { Client } = require('pg');

// Set up the PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'assignment3',
  password: 'Training#2024',
  port: 5432,
});

client.connect();

// Clear the users table before each test
beforeEach(async () => {
  await client.query('DELETE FROM Users');
});

// Close the database connection after all tests are done
afterAll(async () => {
  await client.end();
});

describe('POST /register', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User successfully registered');
    expect(response.body).toHaveProperty('id');
  });

  it('should fail to register a user without email and password', async () => {
    const response = await request(app).post('/register').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email and password are required');
  });

  it('should fail to register with an invalid email', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'invalid-email', password: 'password123' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });
});
