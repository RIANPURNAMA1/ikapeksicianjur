<?php

use App\Models\Berita;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('berita', function (Blueprint $table) {
            $table->string('slug', 255)->nullable()->after('judul');
        });

        foreach (Berita::all() as $berita) {
            $base = Str::slug($berita->judul) ?: 'berita';
            $slug = $base;
            $i = 2;
            while (Berita::where('slug', $slug)->where('id', '!=', $berita->id)->exists()) {
                $slug = $base.'-'.$i++;
            }
            $berita->update(['slug' => $slug]);
        }

        Schema::table('berita', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('berita', function (Blueprint $table) {
            $table->dropUnique('berita_slug_unique');
            $table->dropColumn('slug');
        });
    }
};
