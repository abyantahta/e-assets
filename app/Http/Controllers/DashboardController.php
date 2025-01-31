<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;
// use DB;
use Illuminate\Support\Facades\DB as FacadesDB;

class DashboardController extends Controller
{
    public function index(){
        $items = Item::select("no_asset","service_date","disposal_date","nbv","categories.name AS category")->leftJoin('categories', 'categories.id', '=', 'items.category_id')->get();
        $categories = Category::select("name")->get();
        // dd($categories);
        $activeItems = $items->whereNull('disposal_date');
        $deactiveItems = $items->whereNotNull('disposal_date');
        $totalNBVAssets = $activeItems->sum('nbv');
        // $toolingItems = 
        // dd($activeItems[0]);
        
        // dd($sumOfNBV);

        // PIE CHART
        $numberOfItems = $items->count();
        $num_of_activeItems = $activeItems->count();        
        $num_of_deactiveItems = $items->whereNotNull('disposal_date')->count();

        //PRESENTASE JENIS ASET AKTIF
        $numOfTooling = $activeItems->where('category','Tooling')->count();
        $numOfBuilding = $activeItems->where('category','Building')->count();
        $numOfVehicle = $activeItems->where('category','Vehicle')->count();
        $numOfOEQ = $activeItems->where('category','Office Equipment')->count();
        $numOfMachine = $activeItems->where('category','Machine')->count();
        $itemsByCategories = [
            "label"=> [$categories[0]->name,$categories[1]->name,$categories[2]->name,$categories[3]->name,$categories[4]->name],
            "data" => [$numOfTooling,$numOfBuilding,$numOfVehicle,$numOfOEQ,$numOfMachine]
        ];

        //ACTIVEASSETS

        //DEACTIVEASSETS
        // $group = $deactiveItems->groupBy(function ($val) {
        //     return Carbon::parse($val->disposal_date)->format('m');
        // });
        // dd($group);
        return inertia("Dashboard",[
            "numberOfItems" => $numberOfItems,
            "numberOfActiveItems" => $num_of_activeItems,
            "numberOfDeactiveItems" => $num_of_deactiveItems,
            "itemsByCategories" => $itemsByCategories,
            "totalNBVAssets" => $totalNBVAssets
            // "items" => ItemResource::collection($items),
            // "queryParams" => request()->query() ?: null,
            // "success" => session('success'),
        ]);
    }
    //
}
