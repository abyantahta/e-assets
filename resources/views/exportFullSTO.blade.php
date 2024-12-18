{{-- {{ dd($transactions) }} --}}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @php
        $transactionsDecode = json_decode($transactions);
        // dd($transactionsDecode);
    @endphp;
    
    <table>
    <thead>
        <tr>
            <th>No</th>
            <th>Image</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($transactionsDecode as $transaction)
        <tr>
            <td>1</td>
            <td style="width: 64px">
                {{-- <img src={{ $t->image_path }} alt=""> --}}
                {{-- 2 --}}
                <h1>{{ $transaction->item_id->category_id->name }}</h1>
                <img style="width: 100%" src="{{ url($transaction->image_path) }}" alt="">
                {{-- <img src="/storage/task/cNpDkozKOIGXuZG0/2ZX4QoJHNdchFPWnVPhucHnwEu8hFLE4QtNzpkL5.jpg" alt=""> --}}
                {{-- <h1>{{ $transaction->user_id->name }}</h1> --}}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
</body>
</html>
