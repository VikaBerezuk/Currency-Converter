import React from 'react';
import styles from "./currencySelection.module.scss";

interface ErrorMessageProps {
    error: string
}

const ErrorMessage = ({error}: ErrorMessageProps) => {
    return (
        <h1 className={styles.currency__error}>{error}</h1>
    );
};

export default ErrorMessage;