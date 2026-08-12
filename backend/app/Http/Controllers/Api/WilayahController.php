<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WilayahController extends Controller
{
    private const BASE_URL = 'https://emsifa.github.io/api-wilayah-indonesia/api';

    public function provinces(): JsonResponse
    {
        return $this->proxy('/provinces.json', 'ikp_wilayah_provinces');
    }

    public function regencies(string $provinceId): JsonResponse
    {
        $this->assertNumeric($provinceId);

        return $this->proxy("/regencies/{$provinceId}.json", "ikp_wilayah_regencies_{$provinceId}");
    }

    public function districts(string $regencyId): JsonResponse
    {
        $this->assertNumeric($regencyId);

        return $this->proxy("/districts/{$regencyId}.json", "ikp_wilayah_districts_{$regencyId}");
    }

    public function villages(string $districtId): JsonResponse
    {
        $this->assertNumeric($districtId);

        return $this->proxy("/villages/{$districtId}.json", "ikp_wilayah_villages_{$districtId}");
    }

    private function assertNumeric(string $id): void
    {
        abort_unless(preg_match('/^\d+$/', $id) === 1, 404, 'ID wilayah tidak valid.');
    }

    private function proxy(string $path, string $cacheKey): JsonResponse
    {
        $data = Cache::rememberForever($cacheKey, function () use ($path) {
            $response = Http::timeout(20)->retry(2, 500)->get(self::BASE_URL.$path);

            if ($response->failed()) {
                return null;
            }

            return $response->json();
        });

        if ($data === null) {
            return response()->json(['message' => 'Data wilayah tidak ditemukan.'], 502);
        }

        return response()->json($data);
    }
}
