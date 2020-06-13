import React from "react";
import {Link} from "react-router-dom";

export const BooksList = ({books}) => {
    if(books.length === 0){
        return <p>Looks like you have no books to read yet</p>
    }
    return(
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {books.map((book, index) => {
                return(
                    <tr key={book._id}>
                        <td>{index+1}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td><Link to={`/detail/${book._id}`}>Open</Link></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

