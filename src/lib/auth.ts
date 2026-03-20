import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'qlchitieu_jwt_secret_2026'
);

const EXPIRES_IN = '7d';
const COOKIE_NAME = 'qlct_token';

// ─── Sign ────────────────────────────────────────────────────
export async function signToken(payload: Record<string, unknown>): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(SECRET);
}

// ─── Verify ──────────────────────────────────────────────────
export async function verifyToken(token: string) {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: number; email: string; vai_tro: string };
}

// ─── Get current user from request ──────────────────────────
export async function getAuthUser(req: NextRequest) {
    const token =
        req.cookies.get(COOKIE_NAME)?.value ||
        req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) return null;

    try {
        return await verifyToken(token);
    } catch {
        return null;
    }
}

// ─── Set token cookie ─────────────────────────────────────────
export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

// ─── Clear token cookie ───────────────────────────────────────
export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

// ─── API response helpers ─────────────────────────────────────
export function ok(data: unknown, status = 200) {
    return Response.json({ success: true, data }, { status });
}

export function err(message: string, status = 400) {
    return Response.json({ success: false, message }, { status });
}
