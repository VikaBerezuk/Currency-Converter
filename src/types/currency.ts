export interface CurrencyState {
    currency: {
        ccy:string,
        base_ccy:string,
        buy:string,
        sale:string}[];
    loading: boolean;
    error: null | string;
}
export enum CurrencyActionTypes {
    FETCH_CURRENCY = 'FETCH_CURRENCY',
    FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS',
    FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR',
}
interface FetchCurrencyAction {
    type: CurrencyActionTypes.FETCH_CURRENCY;
}
interface FetchCurrencySuccessAction {
    type: CurrencyActionTypes.FETCH_CURRENCY_SUCCESS;
    payload: any[]
}
interface FetchCurrencyErrorAction {
    type: CurrencyActionTypes.FETCH_CURRENCY_ERROR;
    payload: string;
}
export type CurrencyAction = FetchCurrencyAction | FetchCurrencyErrorAction | FetchCurrencySuccessAction
