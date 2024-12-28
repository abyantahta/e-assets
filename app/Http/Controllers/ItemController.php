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
        // dd
        $query = Item::query();
        // dd(request("isdisposal"));
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("no_asset")) {
            $query->where("no_asset", "like", "%" . request("no_asset") . "%");
            // request("page")=1;
        }
        if (request("category_id")) {
            $query->where('category_id', request("category_id"));
        }
        if (request("isDisposal")==1) {
            $query->where('isDisposition', request("isDisposal"));
        }else if(request("isDisposal")==2){
            $query->where('isDisposition',0);
            // dd($query->get());
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
    // public function itemhistory($id){
    //     dd($id);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = Item::query()->where('id',$id)->get();
        $transactions = Transaction::query()->where('item_id', $id)->get();
        // dd(Crypt::decrypt($id));
        // ;
        // dd($transactions);
        // $itemRes = ItemResource::collection($item);
        // dd($itemRes);
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
