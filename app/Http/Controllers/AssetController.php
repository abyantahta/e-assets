<?php

namespace App\Http\Controllers;

use App\Services\WsaService;
use Illuminate\Http\Request;
use Exception;
use App\Models\Asset;
use App\Models\Category;
use App\Models\Depreciation;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use session;
use Illuminate\Support\Str;
// use DB;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;
set_time_limit(600);
class AssetController extends Controller
{
    //
    public function store(Request $request)
    {
        $loadingToggle = request("loadingToggle");
            $itemwsa = (new WsaService())->wsaasset();

        if (($itemwsa === false)) {
            return redirect()->back()->with('success', [
                "toggle" => !$loadingToggle,
                "status" => "error",
                "message" => "Can't load data, WSA Problem"
            ]);
        } else {
            // dd($itemwsa[0][0]);
            // DB::begintransaction();
            try {
                foreach ($itemwsa[0] as $datas) {
                    $items = Item::firstOrNew(['no_asset' => $datas->t_fa_id]);
                    // dd($datas->t_fabd_accamt,$datas->t_fa_puramt);
                    $items->name  = $datas->t_fa_desc1;
                    $items->cost  = $datas->t_fa_puramt;
                    $items->depreciation  = $datas->t_fabd_accamt;
                    $items->nbv  = ($datas->t_fa_puramt - $datas->t_fabd_accamt);
                    $items->disposal_date  = ($datas->t_fa_disp_dt == "") ?  null : Carbon::parse($datas->t_fa_disp_dt);
                    $items->service_date  = Carbon::parse($datas->t_fa_startdt);
                    // $items->encrypted_no_asset  = Crypt::encryptString($datas->t_fa_id);
                	$items->encrypted_no_asset = $this->handleHashing($datas->t_fa_id);
                    $items->lokasi  = $datas->t_fa_faloc_id;


                    // Depreciation::create()
                    // $depreciations_data->no_asset = $datas->t_fa_id;

                    switch ($datas->t_fa_facls_id) {
                        case "TOOLING":
                            // dd('heyoo');
                            $category = Category::select('id','lifetime')->where('name','=','Tooling')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                            break;
                        case "TOOLING2":
                            $category = Category::select('id','lifetime')->where('name','=','Tooling')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;

                            break;
                        case "TOOLING3":
                            $category = Category::select('id')->where('name','=','Tooling')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / 36;

                            // $items->depreciation_per_month = ($datas->t_fa_puramt) / $lifetime[0]->lifetime;
                            break;
                        case "BUILDING":
                            $category = Category::select('id','lifetime')->where('name','=','Building')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                            break;
                        case "VEHICLE":
                            $category = Category::select('id','lifetime')->where('name','=','Vehicle')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                            break;
                        case "OFC-EQP":
                            $category = Category::select('id','lifetime')->where('name','=','Office Equipment')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                            break;
                        case "MACHINE":
                            $category = Category::select('id','lifetime')->where('name','=','Machine')->get();
                            $items->category_id  = $category[0]->id;
                            $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                            break;
                        default:
                        // dd($$datas->t_fa_facls_id);
                        $category = Category::select('id','lifetime')->where('name','=','Vehicle')->get();
                        $items->category_id  = $category[0]->id;
                        $items->depreciation_per_month = ($datas->t_fa_puramt) / $category[0]->lifetime;
                }
                $running_date = Carbon::parse($datas->t_fa_startdt);
                $depreciation = 0;
                // dd($depreciation, $)
                    while($depreciation < $items->cost ){
                        $depreciations_data = Depreciation::create([
                            'no_asset'=> $datas->t_fa_id,
                            'category_id' => $items->category_id,
                            'month' => $running_date->month,
                            'year' => $running_date->year,
                            'depreciation' => $depreciation
                        ]);
                        
                        $depreciation += $items->depreciation_per_month;
                        $running_date->addMonth();
                        $depreciations_data->save();
                    }

                    // dd($GR_month,$GR_year);
                    $items->save();
                    //   } // if FG / SA / 
                }
                // DB::commit();

            } catch (Exception $e) {
                // DB::rollback();
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

	private function handleHashing($plaintext){
    
    $hashed = Hash::make($plaintext);

    while (Str::contains($hashed,"/")) {
       $hashed = Hash::make($plaintext);
    };
    if(Str::contains($hashed,"_")){
    	dd("halo");
    };

    return $hashed;
	}
}
