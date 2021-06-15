import React from "react";
import styles from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";



export type DialogItemPropsType = {
    name: string;
    id: number;
    isActive?: boolean;
    setActiveDialog?: (a: string) => void;
}

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let {isActive, id, name, setActiveDialog} = props;
    let activeStyle: string = '';

    switch (isActive) {
        case true:
            activeStyle = styles.active;
            break;
        case false:
            activeStyle = '';
            break;
    }
    return (
        <div className={styles.dialog + ' ' + activeStyle}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
             <strong>{id}</strong>
        </div>
    )
}