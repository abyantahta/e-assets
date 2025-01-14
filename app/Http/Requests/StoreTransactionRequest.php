<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "item_id" => ['required', 'exists:items,no_asset'],
            'image_path' => ['nullable', 'image', 'mimes:png,jpeg,jpg'],
            "lokasi" => ['required', 'string'],
            "kondisi" => ['required', 'string'],
            "pic" => ['required', 'string'],
            "created_by" => ['required', 'exists:users,id'],
            "updated_by" => ['nullable', 'exists:users,id'],
            "keterangan"=> ['nullable', 'string']
            //
        ];
    }
}
