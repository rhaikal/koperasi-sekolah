<!DOCTYPE html>
<html lang="en">
<head>
    <title>Loans</title>
</head>
<body>
    <table>
        <tr>
            <th colspan="4" style="text-align: center; background-color: #FED7AA; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b><i>Loan Summary</i></b></th>
        </tr>
        <tr>
            <th colspan="2"><b>Total Loans </b></th>
            <td colspan="2" style="border-left: 1px solid #71717A">{{ $loans->count(); }}</td>
        </tr>
    </table>
    <table>
        <thead>
            <tr>
                <th colspan="8" style="text-align: center; background-color: #FED7AA; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b><i>Loans Data</i></b></th>
            </tr>
            <tr>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A;"><b>Id</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="3"><b>Borrower Name</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="2"><b>Ammount</b></th>
                <th style="background-color: #D4D4D8; border-top: 1px solid #71717A; border-bottom: 1px solid #71717A; border-left: 1px solid #71717A" colspan="2"><b>Term of payment</b></th>
            </tr>
        </thead>
        <tbody>
        @foreach($loans as $loan)
            <tr>
                <td>{{ $loan->id }}</td>
                <td style="border-left: 1px solid #71717A" colspan="3">{{ $loan->user->name }}</td>
                <td colspan="2" style="text-align: left; border-left: 1px solid #71717A">Rp. {{ number_format($loan->ammount, null, ',', '.') }}</td>
                <td colspan="2" style="text-align: left; border-left: 1px solid #71717A">{{ date('d-m-Y', strtotime($loan->term_of_payment)) }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
</html>
