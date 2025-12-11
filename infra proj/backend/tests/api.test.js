const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
    describe('GET /', () => {
        it('should return health check message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('AI E-commerce API is running');
        });
    });

    describe('GET /api/search', () => {
        it('should return mock search results', async () => {
            const res = await request(app).get('/api/search?q=test');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should handle missing query parameter', async () => {
            const res = await request(app).get('/api/search');
            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /api/recommend', () => {
        it('should return recommendations', async () => {
            const res = await request(app)
                .post('/api/recommend')
                .send({
                    userProfile: { age: 25, interests: ['tech'] },
                    products: [{ id: 1, name: 'Product A' }]
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('choices');
        });
    });

    describe('POST /api/chat', () => {
        it('should return chat response', async () => {
            const res = await request(app)
                .post('/api/chat')
                .send({
                    messages: [{ role: 'user', content: 'Hello' }]
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('choices');
        });
    });
});
