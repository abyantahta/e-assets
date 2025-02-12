<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depreciation extends Model
{
    /** @use HasFactory<\Database\Factories\DepreciationFactory> */
    protected $guarded = [];
    use HasFactory;
}
