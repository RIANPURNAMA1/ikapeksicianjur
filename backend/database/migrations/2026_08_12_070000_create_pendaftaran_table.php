<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->string('kategori');
            $table->string('nama');
            $table->string('whatsapp');
            $table->string('email')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('desa')->nullable();
            $table->string('pekerjaan')->nullable();

            $table->string('jalur')->nullable();
            $table->string('angkatan')->nullable();
            $table->string('durasi')->nullable();
            $table->string('prefektur')->nullable();
            $table->string('tahun_kepulangan')->nullable();
            $table->string('status_saat_ini')->nullable();
            $table->string('pekerjaan_saat_ini')->nullable();
            $table->string('perusahaan')->nullable();
            $table->string('usaha')->nullable();

            $table->string('lpk')->nullable();
            $table->string('bidang')->nullable();
            $table->string('status_proses')->nullable();
            $table->string('target_keberangkatan')->nullable();
            $table->string('target_prefektur')->nullable();

            $table->string('nama_usaha')->nullable();
            $table->string('bidang_usaha')->nullable();
            $table->string('produk')->nullable();
            $table->string('tahun_berdiri')->nullable();
            $table->string('jumlah_karyawan')->nullable();
            $table->string('nib')->nullable();
            $table->string('halal')->nullable();
            $table->string('pirt')->nullable();
            $table->string('bpom')->nullable();
            $table->string('kapasitas')->nullable();
            $table->string('omzet')->nullable();
            $table->string('pemasaran')->nullable();
            $table->string('ekspor')->nullable();
            $table->json('kebutuhan')->nullable();

            $table->json('harapan')->nullable();
            $table->string('harapan_lainnya')->nullable();
            $table->boolean('agreed')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
