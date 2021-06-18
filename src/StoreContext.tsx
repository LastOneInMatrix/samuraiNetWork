import React from 'react';
import {AppStoreType} from "./State/redux-store";


const StoreContext = React.createContext({} as AppStoreType);

export type ProviderPropsType = {
    store: AppStoreType;
    children: React.ReactNode;
};


export const Provider = (props: ProviderPropsType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}
export default StoreContext;