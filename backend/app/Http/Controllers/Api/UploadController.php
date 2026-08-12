<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:4096'],
        ]);

        $path = $request->file('file')->store('uploads', 'public');

        return response()->json([
            'message' => 'Gambar berhasil diunggah.',
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
        ], 201);
    }
}
