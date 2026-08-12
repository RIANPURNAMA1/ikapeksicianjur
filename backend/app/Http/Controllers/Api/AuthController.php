<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Autentikasi admin dan mengembalikan token + data user.
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Email atau kata sandi salah.'], 401);
        }

        $token = Str::random(64);
        $user->forceFill(['api_token' => $token])->save();

        return response()->json([
            'message' => 'Login berhasil.',
            'token' => $token,
            'user' => $this->userPayload($user),
        ]);
    }

    /**
     * Menonaktifkan token yang sedang dipakai (logout).
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $this->resolveUser($request);

        if ($user) {
            $user->forceFill(['api_token' => null])->save();
        }

        return response()->json(['message' => 'Logout berhasil.']);
    }

    /**
     * Mengembalikan data admin yang sedang login (validasi token).
     */
    public function me(Request $request): JsonResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return response()->json(['message' => 'Tidak terautentikasi.'], 401);
        }

        return response()->json(['user' => $this->userPayload($user)]);
    }

    /**
     * Mengambil user dari bearer token pada Authorization header.
     */
    private function resolveUser(Request $request): ?User
    {
        $token = $request->bearerToken();

        if (! $token) {
            return null;
        }

        return User::where('api_token', $token)->first();
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
