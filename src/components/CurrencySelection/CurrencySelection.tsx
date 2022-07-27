import React from 'react';
import CurrencyInput from "./CurrencyInput";
import styles from './currencySelection.module.scss';
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import {useCurrencies} from "../../hooks/useCurrencies";

const CurrencySelection: React.FC = () => {
    const {currency, currency1, currency2, amount1, amount2,
        setSaleCurrency, setSaleAmount, setBuyCurrency, setBuyAmount} = useCurrencies();

    return (
        <div className={styles.currency}>
            {currency.loading && <Loader/>}
            {currency.error && <ErrorMessage error={currency.error}/>}
            {currency.currency.length > 1 &&
                <>
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
                </>}
        </div>
    );
};

export default CurrencySelection;