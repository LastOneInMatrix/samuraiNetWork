import React from "react";
import styles from "../Dialogs.module.css";

export type MessagePropsType = {
    message: string;
    id: string;
}
type ArrayMessages = Array<MessagePropsType>


export const Message = (props:MessagePropsType) => {
    let {message} = props;
    return <div className={styles.message}>{message}</div>
}