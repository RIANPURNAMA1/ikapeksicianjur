<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table = 'pendaftaran';

    protected $fillable = [
        'kategori',
        'nama',
        'whatsapp',
        'email',
        'provinsi',
        'kabupaten',
        'kecamatan',
        'desa',
        'pekerjaan',
        'jalur',
        'angkatan',
        'durasi',
        'prefektur',
        'tahun_kepulangan',
        'status_saat_ini',
        'pekerjaan_saat_ini',
        'perusahaan',
        'usaha',
        'lpk',
        'bidang',
        'status_proses',
        'target_keberangkatan',
        'target_prefektur',
        'nama_usaha',
        'bidang_usaha',
        'produk',
        'tahun_berdiri',
        'jumlah_karyawan',
        'nib',
        'halal',
        'pirt',
        'bpom',
        'kapasitas',
        'omzet',
        'pemasaran',
        'ekspor',
        'kebutuhan',
        'harapan',
        'harapan_lainnya',
        'agreed',
    ];

    protected $casts = [
        'kebutuhan' => 'array',
        'harapan' => 'array',
        'agreed' => 'boolean',
    ];
}
