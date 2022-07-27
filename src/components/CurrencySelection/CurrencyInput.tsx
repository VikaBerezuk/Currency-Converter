import React, {FC} from 'react';
import {CurrencyState} from "../../types/currency";

const CurrencyInput: FC <{currencies:CurrencyState, currency: string, amount: number,
            setToAmount: (arg0: number) => void, setToCurrency:(arg0: string) => void}> =
    ({amount,currency, setToAmount, setToCurrency, currencies}) => (
    <div>
        <input type='number' value={amount} onChange={(event) => setToAmount(+event.target.value)}/>
        <select value={currency} onChange={(event) => setToCurrency(event.target.value)}>
            {currencies.currency?.map(currency => (
                <option key={currency.ccy} value={currency.ccy}>{currency.ccy}</option>
            ))}
        </select>
    </div>
);

export default CurrencyInput;