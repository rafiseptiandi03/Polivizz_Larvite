<?php

namespace App\Http\Controllers;

use App\Models\Kebun;
use Illuminate\Http\Request;

class KebunController extends Controller
{
    public function index()
    {
        try {
            $kebunData = Kebun::all();
            return response()->json($kebunData, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengambil data perkebunan'], 500);
        }
    }

    public function show($id)
    {
        $kebun = Kebun::find($id);

        if (!$kebun) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($kebun, 200);
    }

    public function store(Request $request)
    {
        \Log::info('Data diterima di store:', $request->all());
        $request->validate([
            'namalahan' => 'required|max:100',
            'jenistanaman' => 'required|max:100',
            'statuspertumbuhan' => 'required|in:baik,sedang,buruk',
        ]);

        try {
            $kebun = Kebun::create($request->all());
            return response()->json($kebun, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menyimpan data perkebunan'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $kebun = Kebun::find($id);

        if (!$kebun) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'namalahan' => 'required|max:100',
            'jenistanaman' => 'required|max:100',
            'statuspertumbuhan' => 'required|in:baik,sedang,buruk',
        ]);

        try {
            $kebun->update($request->only(['namalahan', 'jenistanaman', 'statuspertumbuhan']));
            return response()->json(['message' => 'Data berhasil diperbarui'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal memperbarui data perkebunan'], 500);
        }
    }

    public function destroy($id)
    {
        $kebun = Kebun::find($id);

        if (!$kebun) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        try {
            $kebun->delete();
            return response()->json(['message' => 'Data berhasil dihapus'], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghapus data perkebunan'], 500);
        }
    }
}
