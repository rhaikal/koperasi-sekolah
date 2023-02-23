export function currencyFormat(currency) {
    return new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(currency)
}

export function dateFormat(date) {
    return new Date(date).toLocaleDateString('id-ID', {month: '2-digit', year:"numeric", day:'2-digit'});
}

export function inputCurrencyFormat(id) {
    const price = document.getElementById(id);
    if(price && price.value) {
        window.addEventListener("load", function (e) {
            price.value = "Rp. " + numberFormat(this.value);
        });

        price.addEventListener("keyup", function (e) {
            price.value = numberFormat(this.value);
            if (price.value) {
                price.addEventListener("blur", function (e) {
                    price.value = "Rp. " + numberFormat(this.value);
                });
            }
        });
    }
}

export function inputCurrencyDerange(currency) {
    let number
    if(currency) {
        if(Number.isInteger(currency)) currency = currency.toString()
        number = currency.replaceAll(".", "")
        const regExp = new RegExp('\\D+', 'gm')
        if(regExp.test(number)){
            number = number.replaceAll(regExp, "")
        }
    }

    return number
}

function numberFormat(number) {
    return number
        .replace(/[^,\d]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        .toString()
}
