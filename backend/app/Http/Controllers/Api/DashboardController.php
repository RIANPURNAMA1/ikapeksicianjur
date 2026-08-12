<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $year = now()->year;

        $perMonth = Pendaftaran::query()
            ->selectRaw('MONTH(created_at) as bulan, COUNT(*) as jumlah')
            ->whereYear('created_at', $year)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('jumlah', 'bulan');

        $bulanNama = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        $grafik = collect(range(1, 12))->map(fn (int $m) => [
            'bulan' => $bulanNama[$m - 1],
            'jumlah' => (int) ($perMonth[$m] ?? 0),
        ]);

        $terbaru = Pendaftaran::query()
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn (Pendaftaran $p) => [
                'id' => $p->id,
                'kategori' => $p->kategori,
                'nama' => $p->nama,
                'whatsapp' => $p->whatsapp,
                'email' => $p->email,
                'provinsi' => $p->provinsi,
                'kabupaten' => $p->kabupaten,
                'kecamatan' => $p->kecamatan,
                'desa' => $p->desa,
                'nama_usaha' => $p->nama_usaha,
                'created_at' => $p->created_at?->format('d M Y, H:i'),
            ]);

        $stats = [
            'total_pendaftar' => Pendaftaran::count(),
            'alumni' => Pendaftaran::where('kategori', 'alumni')->count(),
            'calon_alumni' => Pendaftaran::where('kategori', 'calon-alumni')->count(),
            'umkm_binaan' => Pendaftaran::where('kategori', 'umkm-binaan')->count(),
            'pendaftar_bulan_ini' => Pendaftaran::whereYear('created_at', $year)
                ->whereMonth('created_at', now()->month)
                ->count(),
            'pendaftar_hari_ini' => Pendaftaran::whereDate('created_at', today())->count(),
            'total_pengguna' => User::count(),
        ];

        return response()->json([
            'stats' => $stats,
            'grafik' => $grafik,
            'terbaru' => $terbaru,
        ]);
    }
}
