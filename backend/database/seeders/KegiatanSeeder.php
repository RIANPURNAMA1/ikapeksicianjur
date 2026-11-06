<?php

namespace Database\Seeders;

use App\Models\Kegiatan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KegiatanSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'judul' => 'Seleksi Magang IM Japan Kabupaten Bandung Barat',
                'deskripsi' => '<p>Pengurus IKAPEKSI Cianjur ikut serta menjadi bagian panitia seleksi nasional IM Japan yang diselenggarakan oleh Disnaker Kabupaten Bandung Barat.</p>',
                'gambar' => 'https://picsum.photos/seed/kegiatan-seleksi/800/600',
                'lokasi' => 'Kabupaten Bandung Barat',
            ],
            [
                'judul' => 'Rapat Kerja Daerah IKAPEKSI Jawa Barat',
                'deskripsi' => '<p>Pertemuan Rapat Kerja Daerah bersama DPD IKAPEKSI Jawa Barat untuk mengembangkan program kerja strategis dan potensi di Kabupaten Cianjur.</p>',
                'gambar' => 'https://picsum.photos/seed/kegiatan-raker/800/600',
                'lokasi' => 'Jawa Barat',
            ],
            [
                'judul' => 'Audiensi bersama Disnakertrans Kabupaten Cianjur',
                'deskripsi' => '<p>Silaturahmi dan memperkenalkan DPC IKAPEKSI Kabupaten Cianjur sekaligus penyampaian program kerja.</p>',
                'gambar' => 'https://picsum.photos/seed/kegiatan-audiensi/800/600',
                'lokasi' => 'Kabupaten Cianjur',
            ],
        ];

        foreach ($items as $item) {
            Kegiatan::updateOrCreate(
                ['slug' => Str::slug($item['judul'])],
                [
                    'judul' => $item['judul'],
                    'deskripsi' => $item['deskripsi'],
                    'gambar' => $item['gambar'],
                    'lokasi' => $item['lokasi'],
                    'tanggal' => null,
                    'status' => 'terbit',
                ]
            );
        }
    }
}
