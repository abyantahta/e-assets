<?php

namespace App\Exports;

use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class ExportFullSTO implements FromView
{
    protected $category_id;
    protected $dateEnd;
    protected $dateStart;
    public function __construct($category_id = null, $dateStart = null, $dateEnd = null)
    {
        $this->category_id = $category_id;
        $this->dateStart = $dateStart;
        $this->dateEnd = $dateEnd;
    }
    public function view(): View
    {
        if (!empty($this->dateEnd) && !empty($this->dateStart) && !empty($this->category_id)) {
            $query = Transaction::select('transactions.*', 'items.id AS it_id')->leftJoin('items', 'items.id', '=', 'transactions.item_id')->whereBetween('transactions.created_at', [Carbon::parse($this->dateStart), Carbon::parse($this->dateEnd)])->where('category_id', $this->category_id)->get();
        } else if (!empty($this->dateEnd) && !empty($this->dateStart)) {
            // dd('ketiga');
            if ($this->dateStart == $this->dateEnd) {
                $query = Transaction::query()->whereDate('transactions.created_at', Carbon::parse($this->dateStart))->get();
            } else {

                $query = Transaction::select()->whereBetween('transactions.created_at', [Carbon::parse($this->dateStart), Carbon::parse($this->dateEnd)])->get();
            }
        } else if (!empty($this->dateStart) && !empty($this->category_id)) {
            $query = Transaction::select('transactions.*', 'items.id AS it_id')->leftJoin('items', 'items.id', '=', 'transactions.item_id')->whereDate('transactions.created_at', Carbon::parse($this->dateStart))->where('category_id', $this->category_id)->get();
        } else if ($this->dateStart) {
            $query = Transaction::query()->whereDate('transactions.created_at', Carbon::parse($this->dateStart))->get();
        } else if ($this->category_id) {
            $query = Transaction::select('transactions.*', 'items.id AS it_id')->leftJoin('items', 'items.id', '=', 'transactions.item_id')->where('category_id', $this->category_id)->get();
        } else {
            $query = Transaction::all();
        }
        return view('exportFullSTO', [
            "transactions" => TransactionResource::collection($query)->toJson(),
        ]);
    }
}


// <?php

// namespace App\Exports;

// use App\Http\Resources\TransactionResource;
// use App\Models\Transaction;
// use Maatwebsite\Excel\Concerns\FromCollection;
// use Maatwebsite\Excel\Concerns\FromView;
// use Illuminate\Contracts\View\View;

// class ExportFullSTO implements FromView
// {
//     protected $category_id;
//     protected $dateEnd;
//     protected $dateStart;
//     public function __construct($category_id, $dateStart, $dateEnd)
//     {
//         $this->category_id = $category_id;
//         $this->dateStart = $dateStart;
//         $this->dateEnd = $dateEnd;
//     }
//     public function view() :View {
//         // dd($this->category_id, $this->dateEnd, $this->dateStart);
//         // $transactions = Transaction::select('transactions.*', 'items.id AS it_id')->leftJoin('items', 'items.id', '=', 'transactions.item_id'); 
//         $transactions = Transaction::query();
//         // if($this->category_id){
//         //     $transactions->where('category_id', $this->category_id);
//         // }
        // if($this->dateEnd && $this->dateStart){
        //     $transactions->whereBetween('transactions.created_at', [$this->dateStart,$this->dateEnd])->get();
        // }else if($this->dateStart){
        //     $transactions->where('created_at', $this->dateStart)->get();
        // }else{
        //     $transactions->get();
        // }
//         // dd($transactions);
//         return view('exportFullSTO', [
//             "transactions" => TransactionResource::collection($transactions)->toJson(),
//         ]);
//     }
// }
