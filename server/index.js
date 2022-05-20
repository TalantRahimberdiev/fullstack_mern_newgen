
//--------------BASIC SETUP------------------------------------------------------------------------

const mysql = require('mysql2')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
   user: 'root',
   host: 'localhost',
   password: 'rt240793',
   database: 'materials'
})

//----------------CREATE COURSE---------------------------------------------------------------------

app.post(`/createCourse`, (req, res) => {

   const name = req.body.name
   const priceFrom = req.body.priceFrom
   const priceTill = req.body.priceTill
   const date = req.body.date
   const month = req.body.month
   const year = req.body.year

   db.query(`INSERT INTO course(name, priceFrom, priceTill, date,month,year) VALUE(?,?,?,?,?,?)`, [name, priceFrom, priceTill, date, month, year], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//--------------FULL LIST ---------------------------------------------------------------------

app.get(`/listOfCourses`, (req, res) => {
   db.query(`SELECT * FROM course;`, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

//--------------GET SELECTED COURSE-------------------------------------------------------

app.get(`/requestedCourse/:token`, (req, res) => {
   db.query(`SELECT name, priceFrom, priceTill FROM course WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})


//--------------DELETE COURSE---------------------------------------------------------------------

app.delete(`/deleteCourse/:token`, (req, res) => {
   db.query(`DELETE FROM course WHERE id=?;`, req.params.token, (err, result) => {
      if (err) console.log(err)
   })
})

//--------------UPDATE COURSE---------------------------------------------------------------------

app.post(`/updateCourse`, (req, res) => {

   const name = req.body.name
   const priceFrom = req.body.priceFrom
   const priceTill=req.body.priceTill

   const token = req.body.token

   db.query(`UPDATE course SET name=?, priceFrom=?, priceTill=? WHERE id=?;`, [name, priceFrom, priceTill, token], (err, result) => {
      if (err) console.log(err)
      else res.send(result)
   })
})

app.listen(7000, () => console.log('great server runs on port 7000'))

