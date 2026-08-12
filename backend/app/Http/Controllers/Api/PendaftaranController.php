<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PendaftaranController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Pendaftaran::query()->orderByDesc('created_at');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('provinsi', 'like', "%{$search}%")
                    ->orWhere('kabupaten', 'like', "%{$search}%")
                    ->orWhere('nama_usaha', 'like', "%{$search}%");
            });
        }

        if ($kategori = $request->string('kategori')->trim()->toString()) {
            $query->where('kategori', $kategori);
        }

        $items = $query->paginate(15);

        return response()->json([
            'pendaftaran' => collect($items->items())->map(fn (Pendaftaran $p) => $this->card($p)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'stats' => [
                'total' => Pendaftaran::count(),
                'alumni' => Pendaftaran::where('kategori', 'alumni')->count(),
                'calon_alumni' => Pendaftaran::where('kategori', 'calon-alumni')->count(),
                'umkm_binaan' => Pendaftaran::where('kategori', 'umkm-binaan')->count(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'kategori' => ['required', Rule::in(['alumni', 'calon-alumni', 'umkm-binaan'])],
            'nama' => ['required', 'string', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:32'],
            'email' => ['nullable', 'email', 'max:255'],
            'provinsi' => ['nullable', 'string', 'max:255'],
            'kabupaten' => ['nullable', 'string', 'max:255'],
            'kecamatan' => ['nullable', 'string', 'max:255'],
            'desa' => ['nullable', 'string', 'max:255'],
            'pekerjaan' => ['nullable', 'string', 'max:255'],
            'harapan' => ['nullable', 'array', 'max:3'],
            'harapan_lainnya' => ['nullable', 'string', 'max:255'],
            'agreed' => ['required', 'boolean'],
        ]);

        $payload = array_merge(
            $data,
            $this->categoryFields($request, $data['kategori'])
        );

        $pendaftaran = Pendaftaran::create($payload);

        return response()->json([
            'message' => 'Registrasi berhasil dikirim. Terima kasih telah mendaftar.',
            'pendaftaran' => $this->card($pendaftaran),
        ], 201);
    }

    public function show(Pendaftaran $pendaftaran): JsonResponse
    {
        return response()->json(['pendaftaran' => $pendaftaran]);
    }

    public function destroy(Pendaftaran $pendaftaran): JsonResponse
    {
        $pendaftaran->delete();

        return response()->json(['message' => 'Data pendaftaran berhasil dihapus.']);
    }

    private function card(Pendaftaran $p): array
    {
        return [
            'id' => $p->id,
            'kategori' => $p->kategori,
            'nama' => $p->nama,
            'whatsapp' => $p->whatsapp,
            'email' => $p->email,
            'provinsi' => $p->provinsi,
            'kabupaten' => $p->kabupaten,
            'kecamatan' => $p->kecamatan,
            'desa' => $p->desa,
            'pekerjaan' => $p->pekerjaan,
            'nama_usaha' => $p->nama_usaha,
            'harapan' => $p->harapan,
            'created_at' => $p->created_at?->format('d M Y, H:i'),
        ];
    }

    private function categoryFields(Request $request, string $kategori): array
    {
        $fields = match ($kategori) {
            'alumni' => [
                'jalur' => ['required', 'string', 'max:255'],
                'angkatan' => ['nullable', 'string', 'max:32'],
                'durasi' => ['nullable', 'string', 'max:32'],
                'prefektur' => ['nullable', 'string', 'max:255'],
                'tahun_kepulangan' => ['nullable', 'string', 'max:32'],
                'status_saat_ini' => ['required', 'string', 'max:255'],
                'pekerjaan_saat_ini' => ['nullable', 'string', 'max:255'],
                'perusahaan' => ['nullable', 'string', 'max:255'],
                'usaha' => ['nullable', 'string', 'max:255'],
            ],
            'calon-alumni' => [
                'jalur' => ['required', 'string', 'max:255'],
                'lpk' => ['nullable', 'string', 'max:255'],
                'bidang' => ['nullable', 'string', 'max:255'],
                'status_proses' => ['required', 'string', 'max:255'],
                'target_keberangkatan' => ['nullable', 'string', 'max:255'],
                'target_prefektur' => ['nullable', 'string', 'max:255'],
            ],
            'umkm-binaan' => [
                'nama_usaha' => ['required', 'string', 'max:255'],
                'bidang_usaha' => ['required', 'string', 'max:255'],
                'produk' => ['nullable', 'string', 'max:255'],
                'tahun_berdiri' => ['nullable', 'string', 'max:32'],
                'jumlah_karyawan' => ['nullable', 'string', 'max:255'],
                'nib' => ['nullable', 'string', 'max:32'],
                'halal' => ['nullable', 'string', 'max:32'],
                'pirt' => ['nullable', 'string', 'max:32'],
                'bpom' => ['nullable', 'string', 'max:32'],
                'kapasitas' => ['nullable', 'string', 'max:255'],
                'omzet' => ['nullable', 'string', 'max:255'],
                'pemasaran' => ['nullable', 'string', 'max:255'],
                'ekspor' => ['nullable', 'string', 'max:32'],
                'kebutuhan' => ['nullable', 'array'],
            ],
            default => [],
        };

        return $request->validate($fields);
    }
}
