import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {fetchCurrency} from "../../store/action-creators/currency";
import CurrencyInput from "./CurrencyInput";
import styles from './currencySelection.module.scss';

const CurrencySelection: React.FC = () => {
    const {currency} = useTypedSelector(state => state);
    const {fetchCurrency} = useActions();
    if(!currency.currency.find(el => el.ccy === 'UAH')) {
        currency.currency.push({ccy:'UAH', base_ccy: 'USD', buy: '1', sale: '1'});
    }

    const [amount1, setAmount1] = useState<number>(1);
    const [amount2, setAmount2] = useState<number>(1);
    const [currency1, setCurrency1] = useState<string>("USD");
    const [currency2, setCurrency2] = useState<string>('USD');

    useEffect(() => {
        fetchCurrency();
    }, [])

    if (currency.loading) {
        return <h1 className={styles.loader}></h1>
    }

    if (currency.error) {
        return <h1 className={styles.currency__error}>{currency.error}</h1>
    }

    const setBuyCurrency = (newCurrency:string) => {
        if(newCurrency === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency2);
            setAmount2(amount1/Number(currencyChange?.sale));
        } else if(currency2 === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency1);
            setAmount2(amount1 * Number(currencyChange?.sale));
        } else {
            const currencyChange1 = currency.currency.find(el => el.ccy === currency2);
            const currencyChange2 = currency.currency.find(el => el.ccy === newCurrency);
            setAmount2(amount1 * Number(currencyChange1?.sale)/Number(currencyChange2?.sale));
        }
        setCurrency1(newCurrency)
    }

    const setSaleCurrency = (newCurrency:string) => {
        if(newCurrency === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency1);
            setAmount1(amount2/Number(currencyChange?.sale));
        } else {
            const currencyChange1 = currency.currency.find(el => el.ccy === currency1);
            const currencyChange2 = currency.currency.find(el => el.ccy === newCurrency);
            setAmount1(amount2 * Number(currencyChange1?.sale)/Number(currencyChange2?.sale));
        }
        setCurrency2(newCurrency);
    }

    const setBuyAmount = (newAmount:number) => {
        if(currency2 === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency1);
            setAmount2(newAmount * Number(currencyChange?.sale));
        } else if(currency1 === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency2);
            setAmount2(newAmount / Number(currencyChange?.sale));
        } else {
            const currencyChange1 = currency.currency.find(el => el.ccy === currency2);
            const currencyChange2 = currency.currency.find(el => el.ccy === currency1)
            setAmount2(newAmount * Number(currencyChange1?.sale)/Number(currencyChange2?.sale));
        }
        setAmount1(newAmount);
    }

    const setSaleAmount = (newAmount:number) => {
        if( currency1 === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency2);
            setAmount1(newAmount * Number(currencyChange?.sale));
        } else if(currency2 === 'UAH') {
            const currencyChange = currency.currency.find(el => el.ccy === currency1);
            setAmount1(newAmount / Number(currencyChange?.sale));
        } else {
            const currencyChange1 = currency.currency.find(el => el.ccy === currency1);
            const currencyChange2 = currency.currency.find(el => el.ccy === currency2);
            setAmount1(newAmount * Number(currencyChange1?.sale)/Number(currencyChange2?.sale));
        }
        setAmount2(newAmount);
    }

    return (
        <div className={styles.currency}>
            <h3>{amount1} {currency1} is equivalent to {amount2} {currency2}</h3>
            <CurrencyInput
                setToAmount={setBuyAmount}
                setToCurrency={setBuyCurrency}
                currencies={currency}
                amount={amount1}
                currency={currency1}
            />
            <div>&#8645;</div>
            <CurrencyInput
                setToAmount={setSaleAmount}
                setToCurrency={setSaleCurrency}
                currencies={currency}
                amount={amount2}
                currency={currency2}
            />
        </div>
    );
};

export default CurrencySelection;