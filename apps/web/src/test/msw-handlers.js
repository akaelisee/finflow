import { http, HttpResponse } from 'msw';
const API_URL = 'http://localhost:3000';
export const handlers = [
    http.post(`${API_URL}/api/auth/login`, () => HttpResponse.json({
        user: { id: '1', email: 'demo@finflow.app', name: 'Demo User', createdAt: '', updatedAt: '' },
        accessToken: 'mock-token',
    })),
    http.post(`${API_URL}/api/auth/register`, () => HttpResponse.json({
        user: { id: '1', email: 'demo@finflow.app', name: 'Demo User', createdAt: '', updatedAt: '' },
        accessToken: 'mock-token',
    })),
    http.get(`${API_URL}/api/auth/me`, () => HttpResponse.json({ id: '1', email: 'demo@finflow.app', name: 'Demo User', createdAt: '', updatedAt: '' })),
    http.get(`${API_URL}/api/accounts`, () => HttpResponse.json([])),
    http.get(`${API_URL}/api/transactions`, () => HttpResponse.json([])),
    http.get(`${API_URL}/api/categories`, () => HttpResponse.json([])),
    http.get(`${API_URL}/api/budgets`, () => HttpResponse.json([])),
];
