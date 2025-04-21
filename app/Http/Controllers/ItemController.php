<?php

namespace App\Http\Controllers;

use App\Exports\ExportUrl;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Support\Facades\Crypt;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Hash;

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
        }
        if (request("sto_status")==1) {
            $query->where('isSTO', true);
        }else if(request("sto_status")==2){
            $query->where('isSTO', false)->where('isNew',false)->whereNull('disposal_date');
        }else if(request("sto_status")==3){
            $query->where('isSTO', false)->where('isNew',true)->whereNull('disposal_date');
        }
        $items = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();;
        $categories = Category::all();
        return inertia("Items/Index",[
            "items" => ItemResource::collection($items),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
            "categories"=> $categories,
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
    	$output = explode('_',$encryptedId);
    	$key = $output[0];
    	$no_asset = $output[1];
    	
    try {
    	if (!(Hash::check($no_asset, $key))) {
        	abort(404);
		}
    } catch (\Exception $e) {
        abort(404);
    }
    
        $item = Item::query()->where('no_asset',$no_asset)->get();
        $transactions = Transaction::query()->where('item_id', $item[0]->id)->get();
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
    public function exportUrl(){
        return Excel::download(new ExportUrl(), 'items.xlsx');
    }
}
