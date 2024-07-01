<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    /**
     * Membuat store baru untuk user yang sedang login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $request->validate([
            'store_name' => 'required|string|max:255',
        ]);

        $store = Store::create([
            'user_id' => Auth::id(),
            'store_name' => $request->store_name,
        ]);

        return response()->json($store, 201);
    }

    /**
     * Mendapatkan store milik user yang sedang login.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        $store = Auth::user()->store;

        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        return response()->json($store);
    }
}
