import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div>
            <div className="row">
                <div className="col s6 push-s2">
                    <h1>Personal book list</h1>
                </div>
            </div>
            <div className="row">
                <div className="col s6 push-s2">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Authorization</span>
                            <div>
                                <div className="input-field">
                                    <input placeholder="Enter your email" id="email" type="text" className="validate"
                                           name="email" value={form.email} onChange={changeHandler}/>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input placeholder="Enter your password" id="password" type="password"
                                           className="validate" name="password" value={form.password}
                                           onChange={changeHandler}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHandler}
                                    disabled={loading}>Log In
                            </button>
                            <button className="btn grey black-text" onClick={registerHandler} disabled={loading}>Sign Up
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col s3 push-s2">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <p>This application is created for you to save the books that you desire to read as well as to keep track of progress in your current readings.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}