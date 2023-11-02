import styles from './modal.module.scss'
import { ReactElement, useState } from "react";

function Modal({ children, setModalPurpose, setResponse, isHeader }: { setResponse: Function, setModalPurpose: Function, children: ReactElement[], isHeader: boolean }) {

    return (
        <div className={styles.shadow}
            onClick={
                () => {
                    isHeader === true ?
                        setModalPurpose('mycoins') :
                        setModalPurpose('')
                    setResponse('')
                }
            }>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;