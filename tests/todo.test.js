const request = require('supertest');
const app = require('../app');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'assignment3',
  password: 'Training#2024',
  port: 5432,
});

client.connect();

beforeEach(async () => {
  await client.query('DELETE FROM Todos');
});

afterAll(async () => {
  await client.end();
});

describe('GET /todo', () => {
  it('should retrieve all todos successfully', async () => {
    const response = await request(app).get('/todo');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0); // After clearing the database, expect an empty array
  });
});
