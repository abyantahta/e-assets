<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\TestStatus\Deprecation;

class Item extends Model
{
    protected $guarded = [];
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'item_id');
    }
    public function depreciations()
    {
        return $this->hasMany(Deprecation::class, 'item_id');
    }
    public function scopeWhereYearIn($query, array $years)
{
    foreach ($years as $year) {
        $query->orWhereYear('service_date', $year);
    }
    return $query;
}
}
