import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {BooksList} from "../components/BooksList";

export const BooksPage = () => {
    const [books, setBooks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchBooks = useCallback(async () => {
        try {
            const fetched = await request('api/book', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setBooks(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <BooksList books={books}/>}
        </>
    )
}