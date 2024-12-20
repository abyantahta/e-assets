<?php

namespace App\Exports;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class ExportFullSTO implements FromView
{
    public function view() :View {
        $transactions = Transaction::query()->get();
        return view('exportFullSTO', [
            "transactions" => TransactionResource::collection($transactions)->toJson(),
        ]);
    }
}
