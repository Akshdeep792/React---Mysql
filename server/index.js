import express from "express"
import mysql from "mysql"
const app = express()
import cors from 'cors'
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
})
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.json({ message: "Hello from backend" })
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    // console.log(req)
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)"
    const values = [req.body.title, req.body.description, req.body.cover, req.body.price]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    console.log(req.params)
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book is deleted successfully")
    })
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    // console.log(req.params)
    const q = "UPDATE books SET `title` =?, `description` = ?,`price` = ?, `cover` = ? WHERE id = ?"

    const values = [req.body.title, req.body.description, req.body.cover, req.body.price]
    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book is updated successfully")
    })
})
app.listen(8800, () => {
    console.log("Server is live")
})