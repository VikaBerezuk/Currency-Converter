import {CurrencyAction, CurrencyActionTypes} from "../../types/currency";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchCurrency = () => {
    return async (dispatch: Dispatch<CurrencyAction>) => {
        try {
            dispatch({type: CurrencyActionTypes.FETCH_CURRENCY})
            const response = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            setTimeout(() => {
                dispatch({type: CurrencyActionTypes.FETCH_CURRENCY_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: CurrencyActionTypes.FETCH_CURRENCY_ERROR,
                payload: 'An error occurred while loading data'
            })
        }
    }
}

