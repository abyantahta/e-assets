<?php

namespace App\Exports;

use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class ExportUrl implements FromView
{

    public function view(): View
    {
        // $items = Item::select()
        $query = Item::query()->get();
        // dd($query);
        return view('exportUrl', [
            "items" => $query,
        ]);
    }
}
