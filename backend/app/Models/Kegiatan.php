<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $table = 'kegiatan';

    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'gambar',
        'lokasi',
        'tanggal',
        'status',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}
