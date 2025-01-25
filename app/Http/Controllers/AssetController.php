<?php

namespace App\Http\Controllers;

use App\Services\WsaService;
use Illuminate\Http\Request;
use Exception;
use App\Models\Asset;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use session;
// use DB;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class AssetController extends Controller
{
    //
    public function store(Request $request)
    {
        // dd('halo');
        $loadingToggle = request("loadingToggle");
        // try{
            $itemwsa = (new WsaService())->wsaasset();
            // dd($itemwsa);
        // }catch(Exception $e){
        //     return redirect()->back()->with('error', [$loadingToggle,"Items failed to load, WSA Problem"]);
        // }
        // dd($itemwsa[0][0]);
        
        if (($itemwsa === false)) {
            // alert()->error('error','Item not loaded, WSA problem');
            // dd('lewat sini');

            return redirect()->back()->with('success', [
                "toggle" => !$loadingToggle,
                "status" => "error",
                "message" => "Can't load data, WSA Problem"
            ]);
        } else {
            // dd($itemwsa[0][7000],$itemwsa[0][8000],$itemwsa[0][9000]);
            DB::begintransaction();
            try {
                foreach ($itemwsa[0] as $datas) {
                    //if($datas->t_pt_prod_line == 'FG' || $datas->t_pt_prod_line ==  'SA' || $datas->t_pt_prod_line ==  'FG64' && $datas->t_pt_status == 'AC'){
                        // dd(Carbon::parse($datas->t_fa_disp_dt));
                    $items = Item::firstOrNew(['no_asset' => $datas->t_fa_id]);
                    // $items->pt_desc1  = $datas->t_pt_desc1 . ' ' . $datas->t_pt_desc2;
                    // $items->name  = $datas->t_fa_disp_dt;
                    $items->name  = $datas->t_fa_desc1;
                    $items->cost  = $datas->t_fa_puramt;
                    $items->nbv  = ($datas->t_fa_puramt - $datas->t_fabd_accamt);
                    // $items->service_date  = ($datas->t_fa_disp_dt == "") ? null : Carbon::parse($datas->t_fa_disp_dt);
                    $items->disposal_date  = ($datas->t_fa_disp_dt == "") ?  null : Carbon::parse($datas->t_fa_disp_dt);
                    $items->service_date  = Carbon::parse($datas->t_fa_startdt);
                    $items->encrypted_no_asset  = Crypt::encryptString($datas->t_fa_id);
                    $items->lokasi  = $datas->t_fa_faloc_id;
                    // $items->category_id  = 1;
                    switch ($datas->t_fa_facls_id) {
                        case "TOOLING":
                            $items->category_id  = 1;
                            break;
                        case "TOOLING2":
                            $items->category_id  = 1;
                            break;
                        case "TOOLING3":
                            $items->category_id  = 1;
                            break;
                        case "BUILDING":
                            $items->category_id  = 2;
                            break;
                        case "VEHICLE":
                            $items->category_id  = 3;
                            break;
                        case "OFC-EQP":
                            $items->category_id  = 4;
                            break;
                        case "MACHINE":
                            $items->category_id  = 5;
                            break;
                        default:
                        $items->category_id  = 5;

                    }
                    // BUILDING 
                    // OFC-EQP 
                    // MACHINE
                    // TOOLING
                    // TOOLING2
                    // TOOLING3
                    // VEHICLE


                    // $items->fab_fabk_id  = $datas->t_fab_fabk_id;
                    //
                    $items->save();
                    //   } // if FG / SA / 
                }
                DB::commit();

            } catch (Exception $e) {
                DB::rollback();
                // dd($e);
                // alert()->error('error', 'Item not loaded');
                return redirect()->back()->with('success', [!$loadingToggle,"Items failed to load"]);
            }
        }
        return redirect()->back()->with('success', [
            "toggle" => !$loadingToggle,
            "status" => "success",
            "message" => "Items successfully loaded"
        ]);

        //
    }
}
