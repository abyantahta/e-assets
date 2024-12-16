<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Support\Str;
use App\Http\Resources\ItemResource;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Container\Attributes\Storage;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Transaction::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        // dd($query);
        if (request("no_asset")) {
            $query->where("no_asset", "like", "%" . request("no_asset") . "%");
        }
        if (request("category_id")) {
            $query->where('category_id', request("category_id"));
        }
        $transactions = $query->orderBy($sortField, $sortDirection)->paginate(10);
        // dd($transactions);
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
        $data = $request->validated();
        // dd($data);
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image_path'] ?? null;
        // dd($data);
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
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
        // dd($data);
        $image = $data['image_path'] ?? null;
        // $data['updated_by'] = Auth::id();
        // dd($image);
        if ($image) {
            if ($transaction->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($transaction->image_path));
            }
            $data['image_path'] = $image->store('transaction/' . Str::random(), 'public');
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
}
