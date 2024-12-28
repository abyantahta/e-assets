<?php

namespace App\Models;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $guarded = [];
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }
    protected $with = ['item','createdBy','updatedBy'];
    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
