<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class KegiatanController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Kegiatan::query()->orderByDesc('tanggal')->orderByDesc('id');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
                    ->orWhere('lokasi', 'like', "%{$search}%");
            });
        }

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status', $status);
        }

        $items = $query->paginate(10);

        return response()->json([
            'kegiatan' => collect($items->items())->map(fn (Kegiatan $k) => $this->card($k)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'stats' => [
                'total' => Kegiatan::count(),
                'terbit' => Kegiatan::where('status', 'terbit')->count(),
                'draft' => Kegiatan::where('status', 'draft')->count(),
            ],
        ]);
    }

    public function publik(Request $request): JsonResponse
    {
        $query = Kegiatan::where('status', 'terbit')->orderByDesc('tanggal')->orderByDesc('id');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
                    ->orWhere('lokasi', 'like', "%{$search}%");
            });
        }

        $perPage = min(max((int) $request->integer('per_page', 6), 1), 50);
        $items = $query->paginate($perPage);

        return response()->json([
            'kegiatan' => collect($items->items())->map(fn (Kegiatan $k) => $this->card($k)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
        ]);
    }

    public function publikShow(string $kegiatan): JsonResponse
    {
        $model = Kegiatan::where('status', 'terbit')
            ->where(function ($q) use ($kegiatan) {
                $q->where('id', $kegiatan)->orWhere('slug', $kegiatan);
            })
            ->first();

        if (! $model) {
            abort(404, 'Kegiatan tidak ditemukan.');
        }

        return response()->json(['kegiatan' => $this->card($model)]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->makeUniqueSlug($data['judul']);

        $kegiatan = Kegiatan::create($data);

        return response()->json([
            'message' => 'Kegiatan berhasil dibuat.',
            'kegiatan' => $this->card($kegiatan),
        ], 201);
    }

    public function show(Kegiatan $kegiatan): JsonResponse
    {
        return response()->json(['kegiatan' => $this->card($kegiatan)]);
    }

    public function update(Request $request, Kegiatan $kegiatan): JsonResponse
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->makeUniqueSlug($data['judul'], $kegiatan->id);

        $kegiatan->update($data);

        return response()->json([
            'message' => 'Kegiatan berhasil diperbarui.',
            'kegiatan' => $this->card($kegiatan),
        ]);
    }

    public function destroy(Kegiatan $kegiatan): JsonResponse
    {
        $kegiatan->delete();

        return response()->json(['message' => 'Kegiatan berhasil dihapus.']);
    }

    private function makeUniqueSlug(string $judul, ?int $ignoreId = null): string
    {
        $base = Str::slug($judul) ?: 'kegiatan';
        $slug = $base;
        $i = 2;

        while (Kegiatan::where('slug', $slug)->where('id', '!=', $ignoreId)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'deskripsi' => ['required', 'string'],
            'gambar' => ['nullable', 'string', 'max:500'],
            'lokasi' => ['nullable', 'string', 'max:255'],
            'tanggal' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['draft', 'terbit'])],
        ]);
    }

    private function card(Kegiatan $k): array
    {
        return [
            'id' => $k->id,
            'slug' => $k->slug,
            'judul' => $k->judul,
            'deskripsi' => $k->deskripsi,
            'excerpt' => mb_substr(trim(strip_tags($k->deskripsi)), 0, 160),
            'gambar' => $k->gambar,
            'lokasi' => $k->lokasi,
            'status' => $k->status,
            'tanggal' => $k->tanggal?->format('d M Y'),
            'tanggal_iso' => $k->tanggal?->toDateString(),
            'created_at' => $k->created_at?->format('d M Y, H:i'),
        ];
    }
}
