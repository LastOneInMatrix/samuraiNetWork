import React, {} from 'react';
import style from './content.module.css';
import {ProfileInfoContainer} from "./ProfileInfo/ProfileInfoContainer";
import {ConnectedPropsType} from "./ContentContainer";
import {Preloader} from "../../Common/Preloader/Preloader";






export const Content = (props: ConnectedPropsType) => {
     if (!props.userProfileInfo) {
         return <Preloader/>
     }
    return <div className={style.main}>
        <ProfileInfoContainer
            updateStatusThunk={props.updateStatusThunk}
            status={props.status}
            userId={props.match.params.userId}
            userInfo={props.userProfileInfo}
                              title={'Posts'}
                              placeholder={'inter..'}
                              img={'https://explore.zoom.us/docs/image/postattendee/postattendee-onzoom.jpg'}/>
    </div>
};
