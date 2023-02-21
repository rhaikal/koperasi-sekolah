<!DOCTYPE html>
<html>
    <head>
        <title>Invoice</title>
        <style>
            *{
                font-family: Nunito, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }

            header {
                padding: 1.5rem;
                border-bottom: 1px solid #E4E4E7 !important;
            }

            h1 {
                color: #18181B;
                font-weight: 700;
                letter-spacing: -0.025rem;
                font-size: 2.25rem !important;
                line-height: 2.5rem !important;
                padding: 0px !important;
                margin: 0px !important;
            }

            main {
                padding-left: 2rem;
                padding-right: 2rem;
            }

            .grid {
                clear: both;
                position: relative;
                margin-top: 1.25rem;
                margin-bottom: 3rem;
            }

            .grid div:first-child {
                position: absolute;
                left: 0;
                width: 192pt;
            }

            .grid div:last-child {
                margin-left: 200pt
            }

            p {
                margin: 5px;
                color: #52525B;
                font-size: 0.875rem;
            }


            table{
                width: 100%;
                border-collapse: collapse;
            }


            thead{
                background-color: #FAFAFA;
                border: 1px solid #E5E7EB !important;
                border-left: 0px !important;
                border-right: 0px !important;
            }

            tbody tr:last-child{
                border-top: 1px solid #E5E7EB !important;
            }

            th{
                padding: 12px 24px 12px 24px;
                font-size: 0.75rem;
                line-height: 1rem;
            }

            td{
                padding: 12px 24px 12px 24px;
                font-size: 0.75rem;
                line-height: 1rem;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>#{{ $order->short_id }}</h1>
        </header>
        <main>
            <div class="grid">
                <div class="col-span">
                    <p>Name : {{ $order->user->name }}</p>
                    <p>Email : {{ $order->user->email }}</p>
                    <p>Number phone : {{ $order->user->no_phone }}</p>
                </div>
                <div class="col-span">
                    <p>Date : {{ $order->invoice->created_at }}</p>
                    <p>Payment method : {{ $order->invoice->method }}</p>
                </div>
            </div>
            <table>
                <thead align="left">
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($order->products as $product)
                        <tr>
                            <td>{{ $product->name }}</td>
                            <td>{{ number_format($product->price, null, ',', '.') }}</td>
                            <td>{{ $product->pivot->quantity }}</td>
                            <td>{{ number_format($product->pivot->subtotal_price, null, ',', '.') }}</td>
                        </tr>
                    @endforeach
                    <tr>
                        <td align="right" colspan="3" style="font-weight: 700;">Total :</td>
                        <td>Rp. {{ number_format($order->total_price, null, ',', '.') }}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </body>
</html>
