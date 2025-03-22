<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Depreciation;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;
// use DB;
use Illuminate\Support\Facades\DB as FacadesDB;
// use PHPUnit\Framework\TestStatus\Deprecation;

class DashboardController extends Controller
{
    public function index()
    {
        $depreciationByMonth = Depreciation::query()->where('year', request('year') ?: Carbon::now()->year);
        // $depreciation_per_month = Depreciation::query()->get();
        // dd($depreciation_per_month);
        $items = Item::select("no_asset", "service_date", "disposal_date", "nbv", "categories.name AS category")->leftJoin('categories', 'categories.id', '=', 'items.category_id');
        if (request("years")) {
            $years = request("years");
            $years = [$years];
            $items = $items->whereYearIn($years);
        }
        if (request("category_id")) {
            $category_id = request("category_id");
            $items = $items->where("category_id",$category_id);
            $depreciationByMonth = $depreciationByMonth->where("category_id",$category_id);
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
        $penambahan_januari = round((((clone $items)->whereMonth('service_date', 1)->sum('cost'))/1000000000)*100)/100;
        $penambahan_februari = round((((clone $items)->whereMonth('service_date', 2)->sum('cost'))/1000000000)*100)/100;
        $penambahan_maret = round((((clone $items)->whereMonth('service_date', 3)->sum('cost'))/1000000000)*100)/100;
        $penambahan_april = round((((clone $items)->whereMonth('service_date', 4)->sum('cost'))/1000000000)*100)/100;
        $penambahan_mei = round((((clone $items)->whereMonth('service_date', 5)->sum('cost'))/1000000000)*100)/100;
        $penambahan_juni = round((((clone $items)->whereMonth('service_date', 6)->sum('cost'))/1000000000)*100)/100;
        $penambahan_juli = round((((clone $items)->whereMonth('service_date', 7)->sum('cost'))/1000000000)*100)/100;
        $penambahan_agustus = round((((clone $items)->whereMonth('service_date', 8)->sum('cost'))/1000000000)*100)/100;
        $penambahan_september = round((((clone $items)->whereMonth('service_date', 9)->sum('cost'))/1000000000)*100)/100;
        $penambahan_oktober = round((((clone $items)->whereMonth('service_date', 10)->sum('cost'))/1000000000)*100)/100;
        $penambahan_november = round((((clone $items)->whereMonth('service_date', 11)->sum('cost'))/1000000000)*100)/100;
        $penambahan_desember = round((((clone $items)->whereMonth('service_date', 12)->sum('cost'))/1000000000)*100)/100;
        $months_label = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AUG", "SEP", "OKT", "NOV", "DES"];
        $penambahan_aset_monthly = [$penambahan_januari, $penambahan_februari, $penambahan_maret, $penambahan_april, $penambahan_mei, $penambahan_juni, $penambahan_juli, $penambahan_agustus, $penambahan_september, $penambahan_oktober, $penambahan_november, $penambahan_desember];

        //DISPOSAL ASET MONTHLY
        $disposal_januari = round((((clone $items)->whereMonth('disposal_date', 1)->sum('cost'))/1000000000)*100)/100;
        $disposal_februari = round((((clone $items)->whereMonth('disposal_date', 2)->sum('cost'))/1000000000)*100)/100;
        $disposal_maret = round((((clone $items)->whereMonth('disposal_date', 3)->sum('cost'))/1000000000)*100)/100;
        $disposal_april = round((((clone $items)->whereMonth('disposal_date', 4)->sum('cost'))/1000000000)*100)/100;
        $disposal_mei = round((((clone $items)->whereMonth('disposal_date', 5)->sum('cost'))/1000000000)*100)/100;
        $disposal_juni = round((((clone $items)->whereMonth('disposal_date', 6)->sum('cost'))/1000000000)*100)/100;
        $disposal_juli = round((((clone $items)->whereMonth('disposal_date', 7)->sum('cost'))/1000000000)*100)/100;
        $disposal_agustus = round((((clone $items)->whereMonth('disposal_date', 8)->sum('cost'))/1000000000)*100)/100;
        $disposal_september = round((((clone $items)->whereMonth('disposal_date', 9)->sum('cost'))/1000000000)*100)/100;
        $disposal_oktober = round((((clone $items)->whereMonth('disposal_date', 10)->sum('cost'))/1000000000)*100)/100;
        $disposal_november = round((((clone $items)->whereMonth('disposal_date', 11)->sum('cost'))/1000000000)*100)/100;
        $disposal_desember = round((((clone $items)->whereMonth('disposal_date', 12)->sum('cost'))/1000000000)*100)/100;
        $months_label = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AUG", "SEP", "OKT", "NOV", "DES"];
        $disposal_aset_monthly = [$disposal_januari, $disposal_februari, $disposal_maret, $disposal_april, $disposal_mei, $disposal_juni, $disposal_juli, $disposal_agustus, $disposal_september, $disposal_oktober, $disposal_november, $disposal_desember];
        

        //DEPRESIASI ASET MONTHLY
        $depreciation_januari = round((((clone $depreciationByMonth)->where('month', 1)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_februari = round((((clone $depreciationByMonth)->where('month', 2)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_maret = round((((clone $depreciationByMonth)->where('month', 3)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_april = round((((clone $depreciationByMonth)->where('month', 4)->sum('depreciation'))/1000000000)*100)/100;
        // dd($depreciation_april);
        $depreciation_mei = round((((clone $depreciationByMonth)->where('month', 5)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_juni = round((((clone $depreciationByMonth)->where('month', 6)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_juli = round((((clone $depreciationByMonth)->where('month', 7)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_agustus = round((((clone $depreciationByMonth)->where('month', 8)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_september = round((((clone $depreciationByMonth)->where('month', 9)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_oktober = round((((clone $depreciationByMonth)->where('month', 10)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_november = round((((clone $depreciationByMonth)->where('month', 11)->sum('depreciation'))/1000000000)*100)/100;
        $depreciation_desember = round((((clone $depreciationByMonth)->where('month', 12)->sum('depreciation'))/1000000000)*100)/100;
        $months_label = ["JAN", "FEB", "MAR", "APR", "MEI", "JUNI", "JULI", "AUG", "SEP", "OKT", "NOV", "DES"];
        $depreciation_aset_monthly = [$depreciation_januari, $depreciation_februari, $depreciation_maret, $depreciation_april, $depreciation_mei, $depreciation_juni, $depreciation_juli, $depreciation_agustus, $depreciation_september, $depreciation_oktober, $depreciation_november, $depreciation_desember];

        $depreciationByMonths = [
            'label'=> $months_label,
            'data' => $depreciation_aset_monthly
        ];
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
            "depreciationByMonths"=> $depreciationByMonths,
            "queryParams" => request()->query() ?: null,
            // "items" => ItemResource::collection($items),
            // "queryParams" => request()->query() ?: null,
            // "success" => session('success'),
        ]);
    }
    //
}
