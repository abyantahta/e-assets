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
        // dd('halo');
        // return
        $transactions = Transaction::query()->get();
        // $transactionsGet = new TransactionResource($transactions);
        // dd($transa)
        return view('exportFullSTO', [
            "transactions" => TransactionResource::collection($transactions)->toJson(),
        ]);
    }
}
