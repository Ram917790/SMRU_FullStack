const BASE = import.meta.env.VITE_API_BASE || "/api";
export async function API(path, init = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Request failed: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`API call failed for ${path}:`, error);
    throw error;
  }
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

async function get(path, { signal } = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal });
    if (!res.ok) {
      // Handle specific error cases
      if (res.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else if (res.status === 404) {
        throw new Error("Resource not found.");
      } else if (res.status >= 400) {
        throw new Error(`Request failed: ${res.status}`);
      }
    }
    return res.json();
  } catch (error) {
    console.error(`API GET failed for ${path}:`, error);
    throw error;
  }
}

export const api = { get, base: API_BASE };
