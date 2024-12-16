<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
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

        if (request("name")) {
            $query->where("{{ name }}", "like", "%" . request("name") . "%");
        }
        if (request("category_id")) {
            $query->where('category_id', request("category_id"));
        }
        $items = $query->orderBy($sortField, $sortDirection)->paginate(10);
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
        
        // dd(Crypt::decrypt($id));
        // ;
        // dd($item);
        // $itemRes = ItemResource::collection($item);
        // dd($itemRes);
        return inertia("Items/Show", [
            "item" => ItemResource::collection($item),
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
