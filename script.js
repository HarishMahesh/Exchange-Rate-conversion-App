async function getCurrencyList()
{
    const fromSelect = document.getElementById('ccy-from')
    const toSelect = document.getElementById('ccy-to')
    let currencyList;
    let data;
    try{
    data = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
    currencyList = await data.json()
    }catch{
        alert('server issue pls try after some time')
    }

    let list = '<option value="0">---Select any currency---</option>'
    for (i in currencyList)
    {
        list += `<option value="${i}">${i} - ${currencyList[i]}</option>`
    }

    fromSelect.innerHTML = list;
    toSelect.innerHTML = list;
}

async function displayOutput()
{
    const inputAmt = document.getElementById('Amount-field').value;
    if(inputAmt)
    {
        const fromCurrency = document.getElementById('ccy-from').value;
        const toCurrency = document.getElementById('ccy-to').value;
        const outputField = document.querySelector('.output-display');
        if(fromCurrency !== '0' && toCurrency !== '0')
        {
            let apiEndpoint = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`;
            let data;
            let exchangeRateObj
            try{
            data = await fetch(apiEndpoint);
            exchangeRateObj = await data.json();
            }catch{
                alert('server issue pls try after some time')
            }
            const exchangeRate = exchangeRateObj[toCurrency];
            let result = inputAmt * +exchangeRate;
            console.log(result);
            outputField.value = `${inputAmt} ${fromCurrency} = ${result} ${toCurrency}`
        }
        else
        {
            alert('Please select both from and to currency')
        }
    }
    else
    {
        alert('Amount field is mandatory');
    }
    
}

getCurrencyList();


