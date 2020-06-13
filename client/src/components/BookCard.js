import React, {useEffect, useState} from "react";
import moment from "moment";

export const BookCard = ({book}) => {
    const [days, setDays] = useState(0)
    const [ppd, setPpd] = useState(null)
    const [isDateSpecified, setIsDateSpecified] = useState(false)

    useEffect(() => {
        setIsDateSpecified(moment(book.date).format("dddd, MMMM Do YYYY")!== moment(book.deadline).format("dddd, MMMM Do YYYY"))
        if (book.date && book.deadline) {
            const formattedDate = moment(book.date)
            const formattedDeadline = moment(book.deadline)
            setDays((formattedDeadline.diff(formattedDate, 'days') + 1))
            if (book.pages) {
                setPpd(Math.round(book.pages / days))
            }
        }
    })


    return (
        <div>
            <h2>Book information - {book.title}</h2>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            {book.description && <p>Description: {book.description}</p>}
            {book.linkTo && <p>Link to your book is {book.linkTo}</p>}
            {book.pages!==0 && <p>Number of pages: {book.pages}</p>}
            {book.date && <p>You added this book to your list on {moment(book.date).format("dddd, MMMM Do YYYY")}</p>}
            {book.deadline && isDateSpecified && <p>Your book deadline is on {moment(book.deadline).format("dddd, MMMM Do YYYY")}</p>}
            {days && isDateSpecified && <p>You have {days} days to read {book.title}</p>}
            {ppd && <p>You have to read {ppd} pages per day to stay put with your goal</p>}
        </div>
    )
}