<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $guarded = [];
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;
    // protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'item_id');
    }
}
