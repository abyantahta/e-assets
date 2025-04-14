<?php

namespace App\Console\Commands;

use App\Models\CutoffHistory;
use App\Models\Item;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CutOff extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cut-off';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // DB::table('reports')->insert([
        //     'total' => rand(100,1000),
        //     'created_at' => now()
        // ]);
        // dd('halo');
        $cutoff = CutoffHistory::all()->last();

        
        $cutoff_counter = ($cutoff) ? ($cutoff->cutoff_counter) : 0;
        if($cutoff){
            $totalActiveItems = Item::where('disposal_date',null)->where('isNew',false)->count();
            $sto_count = Item::where('disposal_date',null)->where('isNew',false)->where('isSTO',true)->count();
            $sto_progress = ($sto_count/$totalActiveItems);
            
            $cutoff->sto_progress = $sto_progress;
            $cutoff->save();
        }
        $transactions = Transaction::where('cutoff_counter',$cutoff_counter)->get();
        Log::info('halo');
        foreach ($transactions as $transaction){
            $transaction->isEditable = false;
            $transaction->save();
    }

        // dd($cutoff_counter);
        CutoffHistory::create([
            'cutoff_counter' => $cutoff_counter+1,
            'cutoff_date' => Carbon::now(),
            'sto_progress'=> 0
        ]);
        $items = Item::all();
        
        foreach ($items as $item){
            $item->isSTO = false;
            $item->isNew = false;
            $item->save();
        }
        // dd($item);
        
        //
    }
}
