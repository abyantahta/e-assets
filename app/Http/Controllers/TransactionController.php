<?php

namespace App\Http\Controllers;

use App\Models\Item;
use File;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Intervention\Image\Image;
use App\Exports\ExportFullSTO;
use App\Http\Resources\ItemResource;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TransactionResource;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Spatie\Activitylog\Models\Activity;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Transaction::select('transactions.*', 'items.id AS it_id', 'items.created_at AS it_created_at')->leftJoin('items', 'items.no_asset', '=', 'transactions.item_id'); 
        $sortField = request("sort_field", "transactions.created_at");
        $sortDirection = request("sort_direction", "desc");
        if (request("no_asset")) {
            $query->where("items.no_asset", "like", "%" . request("no_asset") . "%")->get();
        }
        if (request("category_id")) {
            $query->where("items.category_id",  request("category_id") )->get();
        }
        if(request("dateStart") && request("dateEnd")){
            $start = Carbon::parse(request("dateStart"));
            $end = Carbon::parse(request("dateEnd"));
            if(request("dateStart") == request("dateEnd")){
                $query->whereDate("transactions.created_at",$start)->get();
            }else{
                $query->whereBetween('transactions.created_at', [$start,$end])->get();
            }
        }else if(request("dateStart")){
            $start = Carbon::parse(request("dateStart"));
            $query->whereDate("transactions.created_at",$start)->get();
        }
        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10);
        // dd($transactions);
        return inertia("Transactions/Index", [
            "transactions" => TransactionResource::collection($transactions),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }
    public function cobacoba(){
        $transaction = Transaction::all();
        dd($transaction->toJson());
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        //
    }
        
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        // activity()
        $data = $request->validated();
        $image = $data['image_path'] ?? null;
        if ($image) {
            $filename = Str::random(20) . $image->getClientOriginalName();
            $foldername = Str::random(10);
            Storage::disk('public')->makeDirectory('transactions/'.$foldername);
            $imgManager = new ImageManager(new Driver());
            $thumbImage = $imgManager->read($image);
            $thumbImage->scaleDown(width:750);
            $thumbImage->scaleDown(height:400);
            $thumbImage->save(storage_path('app/public/transactions/'.$foldername.'/'.$filename));
            $data['image_path'] = 'transactions/'.$foldername.'/'.$filename;

        }
        $data['updated_by'] = null;
        Transaction::create($data);
        $activity = Activity::all()->last();
        $activity->description;
        $activity->subject;
        $activity->changes;
        // $activity->log_name = $data["item_id"]."was created";
        return to_route('items.index')
        ->with('success', 'Transaction was created');
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($encrypted_no_asset)
    {
        $no_asset = Crypt::decryptString($encrypted_no_asset);
        // dd($no_asset);
        // $no_asset = substr($id, -9);
        $item = Item::query()->where('no_asset', $no_asset)->get();
        return inertia("Transactions/Show", [
            "item" => ItemResource::collection($item),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        
        return inertia("Transactions/Edit", [
            "transaction" => TransactionResource::make($transaction),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $data = $request->validated();
        // dd($data);
        $image = $data['image_path'] ?? null;
        if ($image) {
            if ($transaction->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($transaction->image_path));
            }
            $filename = Str::random(20) . $image->getClientOriginalName();
            $foldername = Str::random(10);
            Storage::disk('public')->makeDirectory('transactions/' . $foldername);
            $imgManager = new ImageManager(new Driver());
            $thumbImage = $imgManager->read($image);
            $thumbImage->scaleDown(width: 750);
            $thumbImage->scaleDown(height: 400);
            $thumbImage->save(storage_path('app/public/transactions/' . $foldername . '/' . $filename));
            $data['image_path'] = 'transactions/' . $foldername . '/' . $filename;
        } else {
            unset($data['image_path']);
        }
        $transaction->update($data);
        $activity = Activity::all()->last();
        $activity->description;
        $activity->subject;
        $activity->changes;
        return to_route('transactions.index')
        ->with('success', "Transaction \"$transaction->name\" was updated");
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        $activity = Activity::all()->last();
        $activity->description;
        $activity->subject;
        $activity->changes;
        if ($transaction->image_path){
            Storage::disk('public')->deleteDirectory(dirname($transaction->image_path));
        }
        return to_route('transactions.index')
        ->with('success', "Transaction was deleted");
        //
    }
    public function exportSTO(){
        $dateStart = request("dateStart");
        $dateEnd = request("dateEnd");
        $category_id = request("category_id");
        return Excel::download(new ExportFullSTO($category_id,$dateStart,$dateEnd), 'users.xlsx');
    }
    public function dailyReportPage(){
        // dd('kesini');
        return inertia("Transactions/DailyReport", [
        ]);
    }
    public function dailyreport(){
        // $pic = [
        //     'name' => request("PIC"),
        //     'role' => $this->role(request("PIC"))
        // ];
        // $divisionInCharge = [
        //     'name' => request("divisionInCharge"),
        //     'role' => $this->role(request("divisionInCharge"))
        // ];
        // $stoAdmin = [
        //     'name' => request("stoAdmin"),
        //     'role' => $this->role(request("stoAdmin"))
        // ];
        // $date = request("date");
        //     // 'role' => $this->role(request("stoAdmin"))
        
        // $kategori = request("kategori");
        // $transactions = Transaction::query()->whereDate("created_at",$date)->get();

        // $pdf = Pdf::loadView('generateDailyReport',[
        //     "transactions" => TransactionResource::collection($transactions)->toJson(),
        //     "pic" => $pic,
        //     "divisionInCharge" => $divisionInCharge,
        //     "stoAdmin" => $stoAdmin,
        //     "kategori" => $kategori,
        //     "date" => $date,
        // ])->setOption(['dpi=>150'])->setPaper('a4', 'landscape')->setWarnings(false);

        $pdf = Pdf::loadHTML('coba');
        return $pdf->stream('app.pdf');

        // return $pdf->download('pdfkuh.pdf');
        // exit();
    }

        private function role($name)
    {
        $translate = [
            'Amrullah' => 'IT Section Head',
            'Pietra Shafira' => 'HRGA Section Head',
            'Muhammad Khoirifan' => 'Asset Management',
            'Agung Samudra' => 'Admin Dept.Head',
        ];

        return $translate[$name] ?? $name;
    }
}
