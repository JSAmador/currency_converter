new Vue({

    el: "#conversor",
    data: {
        currencies: {},
        from: 'EUR',
        to: 'USD',
        current: 'EUR',
        amount: null,
        result: 0,
        date: moment()
    },
    mounted() {
        this.getLocalCurrencies();
        
    },
    computed: {
        formatCurrencies() {
            return Object.keys(this.currencies)
        },
        convertResult() {
            return (Number(this.amount)*this.result)
        },
        fromCurrency() {
            return '1 ' + this.from + ' equals';
        },
        toCurrency() {
            return ' ' + this.to;
        },
        conversionDate() {
            return this.date;
        }
    },
    methods : { 
        
        getLocalCurrencies() {
            let currencies = localStorage.getItem("currencies");
            this.currencies = currencies ? JSON.parse(currencies) : this.updateCurrencies();
          
        },
        convertCurrency() {
            this.result = (this.from === this.current) ? this.currencies[this.to] : this.updateCurrencies();
            
        },
        updateCurrencies() {
            var url = 'https://api.exchangeratesapi.io/latest?base='+this.from;
            axios.get(url)
            .then(response => {
                this.currencies = response.data.rates;
                this.currencies[response.data.base] = 1;
                this.current = response.data.base;
                this.result = this.currencies[this.to];
                this.date = moment(response.data.date);
                localStorage.setItem('currencies', JSON.stringify(response.data.rates));
            });
        }
       
    }
});