<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Show the profile.
     */
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'jurusan' => $user->profile->jurusan ?? 'Budidaya Tanaman Perkebunan',
            'npm' => $user->profile->npm ?? null,
            'tahunMasuk' => $user->profile->tahun_masuk ?? null,
            'prodi' => $user->profile->prodi ?? null,
            'alamat' => $user->profile->alamat ?? null,
            'agama' => $user->profile->agama ?? null,
            'noHp' => $user->profile->no_hp ?? null,
            'tempatLahir' => $user->profile->tempat_lahir ?? null,
            'tanggalLahir' => $user->profile->tanggal_lahir ?? null,
            'jenisKelamin' => $user->profile->jenis_kelamin ?? null,
            'profilePhoto' => $user->profile->profile_photo ?? null
                ? asset('storage/profile_photos/' . $user->profile->profile_photo)
                : null,
        ]);
    }

    /**
     * Update the profile.
     */
    public function update(Request $request)
    {

        try {
            $user = Auth::user();

            // Update user fields
            $user->name = $request->name;
            $user->email = $request->email;
            $user->save();

            // Find or create profile
            $profile = $user->profile ?? new Profile(['id_user' => $user->id]);

            // Update profile fields
            $profile->id_user = $user->id;
            $profile->name = $user->name;
            $profile->email = $user->email;
            $profile->jurusan = $request->jurusan ?? $profile->jurusan;
            $profile->alamat = $request->alamat;
            $profile->npm = $request->npm ?? null;
            $profile->tahun_masuk = $request->tahunMasuk ?? null;
            $profile->prodi = $request->prodi ?? null;
            $profile->agama = $request->agama;
            $profile->no_hp = $request->noHp ?? null;
            $profile->tempat_lahir = $request->tempatLahir;
            $profile->tanggal_lahir = $request->tanggalLahir;
            $profile->jenis_kelamin = $request->jenisKelamin;

            if ($request->hasFile('profilePhoto')) {
                // Delete old photo if exists
                if ($profile->profile_photo) {
                    Storage::delete('public/profile_photos/' . $profile->profile_photo);
                }
            
                // Store new photo and extract filename
                $filePath = $request->file('profilePhoto')->store('public/profile_photos');
                $fileName = basename($filePath); // Extract filename from the path
            
                $profile->profile_photo = $fileName; // Save only the filename to the database
            }

            $profile->save();

            return response()->json(['message' => 'Profile updated successfully!']);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }
}
