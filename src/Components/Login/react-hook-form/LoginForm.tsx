import React, {useState} from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { setUserLoginDataThunk} from "../../../State/loginFormReducer";
import {AppStateType} from "../../../State/redux-store";
import {Redirect} from "react-router-dom";
import style from './LoginForm.module.css'



type FormDataType = {
    email: string,
    password: string,
    rememberMe: true
}
type LoginFormPropsType = {

}

export default function LoginForm(props: LoginFormPropsType) {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const {email, password, rememberMe} = useSelector((state: AppStateType) => state.loginReducer);
    const authorization = useSelector((state: AppStateType) => state.authReducer.authorization);
    const errorMessages = useSelector((state: AppStateType) => state.loginReducer.errorMessage);



    
    if(authorization) {
        return <Redirect to={'Profile'}/>
    }
    const onSubmit = (data: FormDataType) => {
        const {email, password, rememberMe} = data
        dispatch(setUserLoginDataThunk(email, password, rememberMe));
    };
    console.log(errorMessages)
    return (
        <>
            <form className={style.form}onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <b>Login</b>
                    <input style={{border: errors.password ? '2px solid red' : ''}} {...register('email', {required: true})} defaultValue={email} />
                    <pre>{errors.email && 'email field required'}</pre>
                </div>
                <div>
                    <b>Password</b>
                    <input  style={{border: errors.password ? '2px solid red' : '', marginTop: '5px'}} {...register("password", {required: true})} defaultValue={password} type='password' />
                    <pre>{errors.password && 'password field required'}</pre>
                </div>
                <input {...register("rememberMe")} type='checkbox' />
                <input type="submit" />
            </form>
            {errorMessages && <span style={{border: '1px red solid', color: 'red'}}>{errorMessages}</span>}
        </>

    );
}

// Connect your component with redux
