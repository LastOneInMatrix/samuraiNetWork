import React, {ChangeEvent, useState} from 'react';
import style from "../ProfileInfo/ProfileInfo.module.css";

type StatusComPropsType = {
    status: string
}
export const StatusCom = (props: StatusComPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [localStatus, setLocalStatus] = useState<string>(props.status)

    const changeMode = (mode: string) => (e: React.MouseEvent<HTMLDivElement> & React.FocusEvent<HTMLInputElement>) => {
        mode === 'on' ? setEditMode(true) : setEditMode(false)
    }
    const changeText = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setLocalStatus(e.currentTarget.value);
    }

    return <>
        {
            !editMode &&
            <div onDoubleClick={changeMode('on')}>
                <h3 className={style.title}>{localStatus}</h3>
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