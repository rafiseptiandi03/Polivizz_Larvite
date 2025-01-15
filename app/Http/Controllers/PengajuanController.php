<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PengajuanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = Pengajuan::with('user');

        if ($user->role !== 'admin') {
            $query->where('id_mahasiswa', $user->id);
        }

        $pengajuan = $query->orderby('created_at','desc')->get();

        return response()->json($pengajuan);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'keterangan' => 'required|string',
            'bukti' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        $fileName = null;
        if ($request->hasFile('bukti')) {
            $fileName = $request->file('bukti')->hashName(); // Untuk nama file unik
            $request->file('bukti')->storeAs('bukti', $fileName, 'public');
        }

        $pengajuan = Pengajuan::create([
            'id_mahasiswa' => Auth::id(),
            'keterangan' => $request->keterangan,
            'bukti' => $fileName,
        ]);

        return response()->json($pengajuan, 201);
    }

    public function update(Request $request, $id)
    {
        $pengajuan = Pengajuan::findOrFail($id);

        $validated = $request->validate([
            'keterangan' => 'required|string',
        ]);

        $pengajuan->keterangan = $validated['keterangan'];
        $fileName = null;
        if ($request->hasFile('bukti')) {
            $fileName = $request->file('bukti')->hashName(); // Untuk nama file unik
            $request->file('bukti')->storeAs('bukti', $fileName, 'public');

            $pengajuan->bukti = $fileName;
        }
        $pengajuan->save();

        return response()->json($pengajuan);
    }
    public function updateApproval(Request $request, $id)
    {
        $pengajuan = Pengajuan::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $pengajuan->status = $validated['status'];
        $pengajuan->save();

        return response()->json($pengajuan);
    }

    public function destroy($id)
    {
        $pengajuan = Pengajuan::findOrFail($id);

        if (Auth::user()->role !== 'admin' && $pengajuan->id_mahasiswa !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $pengajuan->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
