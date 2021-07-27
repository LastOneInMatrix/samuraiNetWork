import React, {ChangeEvent, useEffect, useReducer, useState} from 'react';
import style from "../ProfileInfo/ProfileInfo.module.css";
import {getUserStatus} from "../../../API/requestAPI";

type StatusComPropsType = {
    status: string;
    userID: string;
    updateStatusThunk: (status: string) => void;
}
export const StatusCom = (props: StatusComPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [localStatus, setLocalStatus] = useState<string>(props.status)

    const changeMode = (mode: string) => (e: React.MouseEvent<HTMLDivElement> & React.FocusEvent<HTMLInputElement>) => {
        if (mode === 'on') {
            setEditMode(true);
        } else {
            setEditMode(false);
            props.updateStatusThunk(localStatus)
        }
    }
    const changeText = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value);
    };
    useEffect(() =>{
        // setLocalStatus(props.status);
    })
    return <>
        {
            !editMode &&
            <div onDoubleClick={changeMode('on')}>
                <h3 className={style.title}>{props.status || 'No Status'}</h3>
            </div>
        }
        {
            editMode &&
            <div>
                <input onChange={changeText} autoFocus={true} onBlur={changeMode('of')} value={localStatus}/>
            </div>
        }

    </>
}