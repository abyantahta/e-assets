<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Support\Facades\Crypt;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Item::query();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("no_asset")) {
            $query->where("no_asset", "like", "%" . request("no_asset") . "%");
        }
        if (request("category_id")) {
            $query->where('category_id', request("category_id"));
        }
        if (request("isDisposal")==1) {
            $query->whereNull('disposal_date');
        }else if(request("isDisposal")==2){
            $query->whereNotNull('disposal_date');
            // $query->where('isDisposition',0);
        }
        $items = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();;
        return inertia("Items/Index",[
            "items" => ItemResource::collection($items),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StoreItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($encryptedId)
    {
        $no_asset = Crypt::decryptString($encryptedId);
        // dd($encryptedId,$id);
        $item = Item::query()->where('no_asset',$no_asset)->get();
        $transactions = Transaction::query()->where('item_id', $no_asset)->get();

        return inertia("Items/Show", [
            "item" => ItemResource::collection($item),
            "transactions" => TransactionResource::collection($transactions),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
