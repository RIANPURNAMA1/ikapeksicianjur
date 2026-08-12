<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $table = 'berita';

    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'isi',
        'gambar',
        'status',
        'tanggal',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}
