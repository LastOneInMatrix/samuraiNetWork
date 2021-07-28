import React from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { setUserLoginDataThunk} from "../../../State/loginFormReducer";
import {AppStateType} from "../../../State/redux-store";
import {Redirect} from "react-router-dom";


type FormDataType = {
    email: string,
    password: string,
    rememberMe: true
}
type LoginFormPropsType = {

}

export default function LoginForm(props: LoginFormPropsType) {
    const { register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {email, password, rememberMe} = useSelector((state: AppStateType) => state.loginReducer);
    const authorization = useSelector((state: AppStateType) => state.authReducer.authorization);
    console.log(authorization)
    // Submit your data into Redux store
    
    if(authorization) {
        return <Redirect to={'Profile'}/>
    }
    const onSubmit = (data: FormDataType) => {
        const {email, password, rememberMe} = data
        dispatch(setUserLoginDataThunk(email, password, rememberMe));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <b>Login</b>
                <input {...register('email')} defaultValue={email} />
            </div>
            <div>
                <b>Passw</b>
                <input style={{margin: '15px 0px'}} {...register("password")} defaultValue={password} type='password' />
            </div>
                <input {...register("rememberMe")} type='checkbox' />
            <input type="submit" />
        </form>
    );
}

// Connect your component with redux
