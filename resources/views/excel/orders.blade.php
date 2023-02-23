<!DOCTYPE html>
<html lang="en">
<head>
    <title>Orders</title>
</head>
<body>
    <table>
        <tr>
            <th colspan="4" style="text-align: center; background-color: #818CF8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b><i>Order Summary</i></b></th></tr>
        <tr>
            <th colspan="2"><b>Revenue </b></th>
            <td colspan="2" style="border-left: 1px solid #71717A; text-align: right;">Rp. {{ number_format($orders->sum('total_price'), null, ',', '.'); }}</td>
        </tr>
        <tr>
            <th colspan="2"><b>Total Orders </b></th>
            <td colspan="2" style="border-left: 1px solid #71717A">{{ $orders->count(); }}</td>
        </tr>
    </table>
    <table>
        <thead>
            <tr>
                <th colspan="16" style="text-align: center; background-color: #818CF8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b><i>Orders Data</i></b></th>
            </tr>
            <tr>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;" colspan="6"><b>Id</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="3"><b>Customer Name</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A"><b>Method</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="2"><b>Total Price</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="2"><b>Status</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="2"><b>Payment date</b></th>
            </tr>
        </thead>
        <tbody>
        @foreach($orders as $order)
            <tr>
                <td colspan="6">{{ $order->id }}</td>
                <td style="border-left: 1px solid #71717A" colspan="3">{{ $order->user->name }}</td>
                <td style="border-left: 1px solid #71717A">{{ $order->invoice->method }}</td>
                <td colspan="2" style="text-align: left; border-left: 1px solid #71717A">Rp. {{ number_format($order->total_price, null, ',', '.') }}</td>
                <td colspan="2" style="text-align: left; border-left: 1px solid #71717A">
                    @switch($order->status)
                        @case('2')
                            Paid
                            @break
                        @default
                            Complete
                    @endswitch
                </td>
                <td>{{ date('d-m-Y', strtotime($order->payment->payment_date)) }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
</html>
