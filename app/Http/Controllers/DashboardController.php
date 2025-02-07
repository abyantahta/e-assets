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
    public function index()
    {

        
        $items = Item::select("no_asset", "service_date", "disposal_date", "nbv", "categories.name AS category")->leftJoin('categories', 'categories.id', '=', 'items.category_id');
        if (request("years")) {
            $years = request("years");
            $years = [$years];
            // dd($years);
            $items = $items->whereYearIn($years);
            // $query->where("no_asset", "like", "%" . request("no_asset") . "%");
        }
        if (request("category_id")) {
            $category_id = request("category_id");
            // $years = [$years];
            // dd($years);
            $items = $items->where("category_id",$category_id);
            // $query->where("no_asset", "like", "%" . request("no_asset") . "%");
        }

        // $years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
        $categories = Category::select("name")->get();
        $items_number = (clone $items)->count();
        $activeItems_query = (clone $items)->whereNull('disposal_date');
        $deactiveItems_query = (clone $items)->whereNotNull('disposal_date');

        $activeItems = (clone $activeItems_query)->count();
        $deactiveItems = (clone $items)->whereNotNull('disposal_date')->count();

        //TOTAL NBV
        $totalNBVAssets = (clone $items)->whereNull('disposal_date')->sum('nbv');

        //DEPRESIASI
        $depreciation = floor((clone $activeItems_query)->sum('depreciation'));
        // dd($depreciation);        
        
        //DEPRESIASI PER BULAN
        $depreciation_per_month = (clone $items)->sum('depreciation_per_month');
        // dd($depreciation_per_month);



        //PENAMBAHAN ASET MONTHLY
        $penambahan_januari = (clone $items)->whereMonth('service_date', 1)->count();
        $penambahan_februari = (clone $items)->whereMonth('service_date', 2)->count();
        $penambahan_maret = (clone $items)->whereMonth('service_date', 3)->count();
        $penambahan_april = (clone $items)->whereMonth('service_date', 4)->count();
        $penambahan_mei = (clone $items)->whereMonth('service_date', 5)->count();
        $penambahan_juni = (clone $items)->whereMonth('service_date', 6)->count();
        $penambahan_juli = (clone $items)->whereMonth('service_date', 7)->count();
        $penambahan_agustus = (clone $items)->whereMonth('service_date', 8)->count();
        $penambahan_september = (clone $items)->whereMonth('service_date', 9)->count();
        $penambahan_oktober = (clone $items)->whereMonth('service_date', 10)->count();
        $penambahan_november = (clone $items)->whereMonth('service_date', 11)->count();
        $penambahan_desember = (clone $items)->whereMonth('service_date', 12)->count();
        $months_label = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AUG", "SEP", "OKT", "NOV", "DES"];
        $penambahan_aset_monthly = [$penambahan_januari, $penambahan_februari, $penambahan_maret, $penambahan_april, $penambahan_mei, $penambahan_juni, $penambahan_juli, $penambahan_agustus, $penambahan_september, $penambahan_oktober, $penambahan_november, $penambahan_desember];

        //DISPOSAL ASET MONTHLY
        $disposal_januari = (clone $items)->whereMonth('disposal_date', 1)->count();
        $disposal_februari = (clone $items)->whereMonth('disposal_date', 2)->count();
        $disposal_maret = (clone $items)->whereMonth('disposal_date', 3)->count();
        $disposal_april = (clone $items)->whereMonth('disposal_date', 4)->count();
        $disposal_mei = (clone $items)->whereMonth('disposal_date', 5)->count();
        $disposal_juni = (clone $items)->whereMonth('disposal_date', 6)->count();
        $disposal_juli = (clone $items)->whereMonth('disposal_date', 7)->count();
        $disposal_agustus = (clone $items)->whereMonth('disposal_date', 8)->count();
        $disposal_september = (clone $items)->whereMonth('disposal_date', 9)->count();
        $disposal_oktober = (clone $items)->whereMonth('disposal_date', 10)->count();
        $disposal_november = (clone $items)->whereMonth('disposal_date', 11)->count();
        $disposal_desember = (clone $items)->whereMonth('disposal_date', 12)->count();
        $months_label = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AUG", "SEP", "OKT", "NOV", "DES"];
        $disposal_aset_monthly = [$disposal_januari, $disposal_februari, $disposal_maret, $disposal_april, $disposal_mei, $disposal_juni, $disposal_juli, $disposal_agustus, $disposal_september, $disposal_oktober, $disposal_november, $disposal_desember];

        //PRESENTASE JENIS ASET AKTIF
        $numOfTooling = (clone $activeItems_query)->where('category_id', '1')->count();
        // dd($numOfTooling);
        $numOfBuilding = (clone $activeItems_query)->where('category_id', '2')->count();
        $numOfVehicle = (clone $activeItems_query)->where('category_id', '3')->count();
        $numOfOEQ = (clone $activeItems_query)->where('category_id', '4')->count();
        $numOfMachine = (clone $activeItems_query)->where('category_id', '5')->count();
        $itemsByCategories = [
            "label" => [$categories[0]->name, $categories[1]->name, $categories[2]->name, $categories[3]->name, $categories[4]->name],
            "data" => [$numOfTooling, $numOfBuilding, $numOfVehicle, $numOfOEQ, $numOfMachine]
        ];

        //PRESENTASE JENIS ASET AKTIF
        $tooling_cost = ((clone $activeItems_query)->where('category_id', '1')->sum('cost')) / 1;
        $building_cost = ((clone $activeItems_query)->where('category_id', '2')->sum('cost')) / 1;
        $vehicle_cost = ((clone $activeItems_query)->where('category_id', '3')->sum('cost')) / 1;
        $oeq_cost = ((clone $activeItems_query)->where('category_id', '4')->sum('cost')) / 1;
        $machine_cost = ((clone $activeItems_query)->where('category_id', '5')->sum('cost')) / 1;
        $costPerCategories = [
            "label" => [$categories[0]->name, $categories[1]->name, $categories[2]->name, $categories[3]->name, $categories[4]->name],
            "data" => [$tooling_cost, $building_cost, $vehicle_cost, $oeq_cost, $machine_cost]
        ];
        //PRESENTASE JENIS ASET AKTIF
        $tooling_nbv = ((clone $activeItems_query)->where('category_id', '1')->sum('nbv')) / 1;
        $building_nbv = ((clone $activeItems_query)->where('category_id', '2')->sum('nbv')) / 1;
        $vehicle_nbv = ((clone $activeItems_query)->where('category_id', '3')->sum('nbv')) / 1;
        $oeq_nbv = ((clone $activeItems_query)->where('category_id', '4')->sum('nbv')) / 1;
        $machine_nbv = ((clone $activeItems_query)->where('category_id', '5')->sum('nbv')) / 1;


        $nbv_cost_category = [
            [
                "name" => 'Tooling',
                "data" => [$tooling_cost, $tooling_nbv]
            ],            [
                "name" => 'Building',
                "data" => [$building_cost, $building_nbv]
            ],            [
                "name" => 'Vehicle',
                "data" => [$vehicle_cost, $vehicle_nbv]
            ],            [
                "name" => 'Office Equipment',
                "data" => [$oeq_cost, $oeq_nbv]
            ],            [
                "name" => 'Machine',
                "data" => [$machine_cost, $machine_nbv]
            ],
        ];
        // $nbvPerCategories = [
        //     "label" => [$categories[0]->name, $categories[1]->name, $categories[2]->name, $categories[3]->name, $categories[4]->name],
        //     "data" => [$tooling_nbv, $building_nbv, $vehicle_nbv, $oeq_nbv, $machine_nbv]
        // ];


        //STACKED NBV 


        //ACTIVEASSETS

        //DEACTIVEASSETS
        // $group = $deactiveItems->groupBy(function ($val) {
        //     return Carbon::parse($val->disposal_date)->format('m');
        // });
        // dd($group);
        return inertia("Dashboard", [
            "numberOfItems" => $items_number,
            "numberOfActiveItems" => $activeItems,
            "numberOfDeactiveItems" => $deactiveItems,
            "itemsByCategories" => $itemsByCategories,
            "totalNBVAssets" => $totalNBVAssets,
            "penambahan_aset_monthly" => $penambahan_aset_monthly,
            "disposal_aset_monthly" => $disposal_aset_monthly,
            "months_label" => $months_label,
            "cost_per_categories" => $costPerCategories,
            "nbv_cost_category" => $nbv_cost_category,
            "depreciation"=> $depreciation,
            "depreciation_per_month"=> $depreciation_per_month,
            "queryParams" => request()->query() ?: null,
            // "items" => ItemResource::collection($items),
            // "queryParams" => request()->query() ?: null,
            // "success" => session('success'),
        ]);
    }
    //
}
