<!DOCTYPE html>
<html lang="en">
<head>
    <title>Product</title>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th colspan="5" style="text-align: center; background-color: #FED7AA; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b><i>Product Data</i></b></th>
            </tr>
            <tr>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="3"><b>Nama Barang</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="1"><b>Terjual</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="1"><b>Stock</b></th>
            </tr>
        </thead>
        <tbody>
        @foreach($products as $product)
            <tr>
                <td style="border-left: 1px solid #71717A" colspan="3">{{ $product->name }}</td>
                <td colspan="1" style="text-align: left; border-left: 1px solid #71717A">{{ $product->sold }}</td>
                <td colspan="1" style="text-align: left; border-left: 1px solid #71717A">{{ $product->stock }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
</html>
