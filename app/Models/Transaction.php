<?php

namespace App\Models;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Transaction extends Model
{
    protected $guarded = [];
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory, LogsActivity;
    // use LogsActivity;

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
    protected $with = ['item','createdBy','updatedBy'];
    protected $logName = 'sto_transactions';
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->logOnly(['item_id','lokasi','keterangan','pic','kondisi']);
        // Chain fluent methods for configuration options
    }
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id','id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }    
    public function userPIC()
    {
        return $this->belongsTo(User::class, 'pic');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
