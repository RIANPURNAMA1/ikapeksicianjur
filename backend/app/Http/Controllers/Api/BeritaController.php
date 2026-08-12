<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Berita::query()->orderByDesc('tanggal')->orderByDesc('id');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('isi', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status', $status);
        }

        $items = $query->paginate(10);

        return response()->json([
            'berita' => collect($items->items())->map(fn (Berita $b) => $this->card($b)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'stats' => [
                'total' => Berita::count(),
                'terbit' => Berita::where('status', 'terbit')->count(),
                'draft' => Berita::where('status', 'draft')->count(),
            ],
        ]);
    }

    public function publik(Request $request): JsonResponse
    {
        $query = Berita::where('status', 'terbit')->orderByDesc('tanggal')->orderByDesc('id');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('isi', 'like', "%{$search}%");
            });
        }

        if ($kategori = $request->string('kategori')->trim()->toString()) {
            $query->where('kategori', $kategori);
        }

        $perPage = min(max((int) $request->integer('per_page', 6), 1), 24);
        $items = $query->paginate($perPage);

        $kategoriList = Berita::where('status', 'terbit')
            ->whereNotNull('kategori')
            ->selectRaw('kategori, count(*) as total')
            ->groupBy('kategori')
            ->orderByDesc('total')
            ->orderBy('kategori')
            ->get();

        return response()->json([
            'berita' => collect($items->items())->map(fn (Berita $b) => $this->card($b)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'kategori_list' => $kategoriList
                ->map(fn ($k) => ['kategori' => $k->kategori, 'total' => (int) $k->total])
                ->values(),
        ]);
    }

    public function publikShow(string $berita): JsonResponse
    {
        $model = Berita::where('status', 'terbit')
            ->where(function ($q) use ($berita) {
                $q->where('id', $berita)->orWhere('slug', $berita);
            })
            ->first();

        if (! $model) {
            abort(404, 'Berita tidak ditemukan.');
        }

        return response()->json(['berita' => $this->card($model)]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->makeUniqueSlug($data['judul']);

        $berita = Berita::create($data);

        return response()->json([
            'message' => 'Berita berhasil dibuat.',
            'berita' => $this->card($berita),
        ], 201);
    }

    public function show(Berita $berita): JsonResponse
    {
        return response()->json(['berita' => $this->card($berita)]);
    }

    public function update(Request $request, Berita $berita): JsonResponse
    {
        $data = $this->validateData($request);
        $data['slug'] = $this->makeUniqueSlug($data['judul'], $berita->id);

        $berita->update($data);

        return response()->json([
            'message' => 'Berita berhasil diperbarui.',
            'berita' => $this->card($berita),
        ]);
    }

    public function destroy(Berita $berita): JsonResponse
    {
        $berita->delete();

        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }

    private function makeUniqueSlug(string $judul, ?int $ignoreId = null): string
    {
        $base = Str::slug($judul) ?: 'berita';
        $slug = $base;
        $i = 2;

        while (Berita::where('slug', $slug)->where('id', '!=', $ignoreId)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'kategori' => ['nullable', 'string', 'max:255'],
            'isi' => ['required', 'string'],
            'gambar' => ['nullable', 'string', 'max:500'],
            'status' => ['required', Rule::in(['draft', 'terbit'])],
            'tanggal' => ['required', 'date'],
        ]);
    }

    private function card(Berita $b): array
    {
        return [
            'id' => $b->id,
            'slug' => $b->slug,
            'judul' => $b->judul,
            'kategori' => $b->kategori,
            'isi' => $b->isi,
            'excerpt' => mb_substr(trim(strip_tags($b->isi)), 0, 160),
            'gambar' => $b->gambar,
            'status' => $b->status,
            'tanggal' => $b->tanggal?->format('d M Y'),
            'tanggal_iso' => $b->tanggal?->toDateString(),
            'created_at' => $b->created_at?->format('d M Y, H:i'),
        ];
    }
}
