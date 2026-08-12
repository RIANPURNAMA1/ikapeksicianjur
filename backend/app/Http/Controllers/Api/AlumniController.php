<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Pendaftaran::query()
            ->where('kategori', 'alumni')
            ->orderByDesc('created_at');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('prefektur', 'like', "%{$search}%")
                    ->orWhere('perusahaan', 'like', "%{$search}%")
                    ->orWhere('usaha', 'like', "%{$search}%");
            });
        }

        if ($status = $request->string('status')->trim()->toString()) {
            $query->where('status_saat_ini', $status);
        }

        $items = $query->paginate(15);

        return response()->json([
            'alumni' => collect($items->items())->map(fn (Pendaftaran $p) => $this->map($p)),
            'meta' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
            ],
            'stats' => [
                'total' => Pendaftaran::where('kategori', 'alumni')->count(),
                'bekerja' => Pendaftaran::where('kategori', 'alumni')->where('status_saat_ini', 'Bekerja')->count(),
                'wirausaha' => Pendaftaran::where('kategori', 'alumni')->where('status_saat_ini', 'Wirausaha')->count(),
                'pencari_kerja' => Pendaftaran::where('kategori', 'alumni')->where('status_saat_ini', 'Pencari Kerja')->count(),
            ],
        ]);
    }

    private function map(Pendaftaran $p): array
    {
        return [
            'id' => $p->id,
            'nama' => $p->nama,
            'whatsapp' => $p->whatsapp,
            'email' => $p->email,
            'provinsi' => $p->provinsi,
            'kabupaten' => $p->kabupaten,
            'kecamatan' => $p->kecamatan,
            'desa' => $p->desa,
            'pekerjaan' => $p->pekerjaan,
            'jalur' => $p->jalur,
            'angkatan' => $p->angkatan,
            'durasi' => $p->durasi,
            'prefektur' => $p->prefektur,
            'tahun_kepulangan' => $p->tahun_kepulangan,
            'status_saat_ini' => $p->status_saat_ini,
            'pekerjaan_saat_ini' => $p->pekerjaan_saat_ini,
            'perusahaan' => $p->perusahaan,
            'usaha' => $p->usaha,
            'harapan' => $p->harapan,
            'harapan_lainnya' => $p->harapan_lainnya,
            'created_at' => $p->created_at?->format('d M Y, H:i'),
        ];
    }
}
