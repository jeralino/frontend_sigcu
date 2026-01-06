// src/services/authService.js

// --- CAMBIO IMPORTANTE ---
// Forzamos la dirección de producción de Render.
// Si quieres volver a trabajar en local en el futuro, solo descomenta la línea de abajo y comenta la de Render.

// const API_BASE = 'http://localhost:4000/api'; // Para desarrollo local
const API_BASE = 'https://backend-sigcu.onrender.com/api'; // Para producción en Render

export async function register(payload) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function login(payload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
}