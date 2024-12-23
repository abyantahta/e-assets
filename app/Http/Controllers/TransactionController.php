<?php

namespace App\Http\Controllers;

use App\Models\Item;
use File;
// use Spatie\Image\Image;
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
use Intervention\Image\Drivers\Gd\Driver;
// use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

// use Illuminate\Container\Attributes\Storage;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd('query');
        $query = Transaction::select('transactions.*', 'items.id AS it_id')->leftJoin('items', 'items.id', '=', 'transactions.item_id'); 
        $sortField = request("sort_field", "transactions.created_at");
        $sortDirection = request("sort_direction", "desc");
        if (request("no_asset")) {
            $query->where("items.no_asset", "like", "%" . request("no_asset") . "%")->get();
            // dd($query);
            $query->where("no_asset", "like", "%" . request("no_asset") . "%");
        }
        if (request("category_id")) {
            $query->where("items.category_id",  request("category_id") )->get();
            // $query->where('category_id', request("category_id"));
        }
        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10);
        // return view("generateDailyReport", [
        //     "transactions" => TransactionResource::collection($transactions)->toJson(),
        //     "queryParams" => request()->query() ?: null,
        //     "success" => session('success'),
        // ]);
        return inertia("Transactions/Index", [
            "transactions" => TransactionResource::collection($transactions),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }
    // [
    //         "transactions" => TransactionResource::collection($transactions),
    //     ]

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
        // dd();
        $data = $request->validated();
        // dd($data);
        // /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image_path'] ?? null;
        // dd($data);
        if ($image) {
            $filename = Str::random(20) . $image->getClientOriginalName();
            $foldername = Str::random(10);
            Storage::disk('public')->makeDirectory('transactions/'.$foldername);
            $imgManager = new ImageManager(new Driver());
            $thumbImage = $imgManager->read($image);
            // $thumbImage->scale(width:750);
            $thumbImage->scaleDown(width:750);
            $thumbImage->scaleDown(height:400);
            // $thumbImage->resize(height:350,width:750);
            $thumbImage->save(storage_path('app/public/transactions/'.$foldername.'/'.$filename));
            // $data['image_path'] =$thumbImage->save(storage_path('app/public/transactions/' . $foldername . '/' . $filename));
            // dd($data['image_path']);
            $data['image_path'] = 'transactions/'.$foldername.'/'.$filename;
            // dd($data['image_path']);

            // $data['image_path'] = $image->store('transactions/' . Str::random(), 'public');

        }
        // $data['item_id'] = 1;
        Transaction::create($data);

        return to_route('items.index')
        ->with('success', 'Transaction was created');
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $no_asset = substr($id, -9);
        // dd($no_asset);
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
        // dd($transaction);
        //
        
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
            // $thumbImage->scale(width:750);
            $thumbImage->scaleDown(width: 750);
            $thumbImage->scaleDown(height: 400);
            // $thumbImage->resize(height:350,width:750);
            $thumbImage->save(storage_path('app/public/transactions/' . $foldername . '/' . $filename));
            // $data['image_path'] =$thumbImage->save(storage_path('app/public/transactions/' . $foldername . '/' . $filename));
            // dd($data['image_path']);
            $data['image_path'] = 'transactions/' . $foldername . '/' . $filename;
            // $data['image_path'] = $image->store('transaction/' . Str::random(), 'public');
        } else {
            unset($data['image_path']);
        }
        $transaction->update($data);

        return to_route('transactions.index')
        ->with('success', "Transaction \"$transaction->name\" was updated");
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // $name = $transaction->name;
        $transaction->delete();
        if ($transaction->image_path){
            Storage::disk('public')->deleteDirectory(dirname($transaction->image_path));
        }
        return to_route('transactions.index')
        ->with('success', "Transaction was deleted");
        //
    }
    public function exportSTO(){
        // dd('auery');
        // dd(Excel::download(new ExportFullSTO, 'users.xlsx'));
        return Excel::download(new ExportFullSTO, 'users.xlsx');
    }
    public function dailyReportPage(){
        return inertia("Transactions/DailyReport", [
            // "transactions" => TransactionResource::collection($transactions),
            // "queryParams" => request()->query() ?: null,
            // "success" => session('success'),
        ]);
    }
    public function dailyreport(){
        // dd(request("PIC"), request("divisionInCharge"), request("stoAdmin"));
        $pic = [
            'name' => request("PIC"),
            'role' => $this->role(request("PIC"))
        ];
        $divisionInCharge = [
            'name' => request("divisionInCharge"),
            'role' => $this->role(request("divisionInCharge"))
        ];
        $stoAdmin = [
            'name' => request("stoAdmin"),
            'role' => $this->role(request("stoAdmin"))
        ];
        // dd($stoAdmin, $divisionInCharge, $pic);
        $transactions = Transaction::query()->get();
        $pdf = Pdf::loadView('generateDailyReport',[
            "transactions" => TransactionResource::collection($transactions)->toJson(),
            "pic" => $pic,
            "divisionInCharge" => $divisionInCharge,
            "stoAdmin" => $stoAdmin,
            // "queryParams" => request()->query() ?: null,
            // "success" => session('success'),
        ])->setOption(['dpi=>150'])->setPaper('a4', 'landscape');
        return $pdf->download('pdfkuh.pdf');
        // return view("generateDailyReport",[
        //     "transactions" => TransactionResource::collection($transactions)->toJson(),
        //     // "queryParams" => request()->query() ?: null,
        //     // "success" => session('success'),
        // ]);
    }

        private function role($name)
    {
        $translate = [
            'Amrullah' => 'IT Section Head',
            'Pietra Shafira' => 'HRGA Section Head',
            'Muhammad Khoirifan' => 'Asset Management',
            'Agung Samudra' => 'Admin Dept.Head',
            // Tambahkan pola lain di sini jika perlu
        ];

        return $translate[$name] ?? $name;
    }
}
