export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const ADMIN_TOKEN_KEY = "ikapeksi_admin_token";
export const ADMIN_USER_KEY = "ikapeksi_admin_user";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface ApiErrorBody {
  message?: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function storeAuth(token: string, user: AdminUser): void {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
  window.localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_USER_KEY);
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => ({}))) as ApiErrorBody & {
    errors?: Record<string, string[]>;
  } & T;

  if (!res.ok) {
    let message = body.message ?? "Terjadi kesalahan pada server.";

    if (body.errors) {
      const first = Object.values(body.errors).find(
        (list): list is string[] => Array.isArray(list) && list.length > 0
      );
      if (first) {
        message = first[0];
      }
    }

    throw new ApiError(message, res.status);
  }

  return body;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(res);
}

export async function apiUpload<T>(path: string, file: File): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: form,
  });

  return handleResponse<T>(res);
}

export function resolveAssetUrl(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//.test(url)) return url;
  return `${API_BASE_URL}${url}`;
}
