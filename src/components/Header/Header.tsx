import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './header.module.scss';

const Header: FC = () => {
    const {currency} = useTypedSelector(state => state.currency);
    return (
        <header className={styles.header}>
            <div className={styles.header__title}>Currency Converter UAH</div>
            <div className={styles.header__item}>
                <div>EUR: {currency[1]?.buy} / {currency[1]?.sale}</div>
                <div>USD: {currency[0]?.buy} / {currency[0]?.sale}</div>
            </div>
        </header>
    );
};

export default Header;