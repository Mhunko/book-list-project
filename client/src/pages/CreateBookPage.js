import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreateBookPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [book, setBook] = useState({
        title: '', author: '', description: '', linkTo: '', pages: 0, deadline: Date.now()
    })

    useEffect(() => {
        window.M.updateTextFields()
    })

    const pressHandler = async event => {
        console.log('handler')
        try {
            const data = await request('/api/book/add', 'POST', {...book}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            history.push(`/detail/${data._id}`)
        } catch (e) {

        }

    }

    const changeHandler = event => {
        setBook({...book, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <h1>Create Book</h1>
            <div className="row">
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div>
                        <div className="input-field">
                            <input placeholder="Enter your title" id="title" type="text" className="validate"
                                   name="title" value={book.title} onChange={changeHandler}/>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter your author" id="author" type="text"
                                   className="validate" name="author" value={book.author} onChange={changeHandler}/>
                            <label htmlFor="author">Author</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter your password" id="description" type="text"
                                   className="validate" name="description" value={book.description}
                                   onChange={changeHandler}/>
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter your linkTo" id="linkTo" type="url"
                                   className="validate" name="linkTo" value={book.linkTo} onChange={changeHandler}/>
                            <label htmlFor="linkTo">Link</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter your password" id="pages" type="number"
                                   className="validate" name="pages" value={book.pages} onChange={changeHandler}/>
                            <label htmlFor="pages">Number of pages</label>
                        </div>
                        <div className="input-field">
                            <input placeholder="Enter your deadline" id="deadline" type="date"
                                   className="validate" name="deadline" value={book.deadline} onChange={changeHandler}/>
                            <label htmlFor="deadline">Deadline</label>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" style={{marginRight: 10}}
                                    onClick={pressHandler}>Create book</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}