import React, {ComponentType} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../State/redux-store";

export type MstpType = {
    authorization: boolean;
}
const mstp = (state: AppStateType): MstpType => ({
    authorization: state.authReducer.authorization
})
export function WithAuthRedirect<T>(Component: ComponentType<T>) {


    const RedirectComponent = (props: MstpType) => {
        const {authorization, ...restProps} = props
        if (!authorization) return <Redirect to={'login'}/>
            return <Component value={99} {...restProps as T} />
    }

    const ConnectedRedirectComponent = connect(mstp)(RedirectComponent)
    return ConnectedRedirectComponent;
}