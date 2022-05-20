
import { useState, useEffect } from "react"
import { Box, Button, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material'
import axios from "axios"

export default function CreateCourse() {

   const [name, setName] = useState('')
   const [priceFrom, setPriceFrom] = useState('')
   const [priceTill, setPriceTill] = useState('')
   const [date, setDate] = useState()
   const [month, setMonth] = useState()
   const [year, setYear] = useState()
   const listOfMonthes = 'January February March April May June July August September October November December'.split(' ')

   //-------------------CREATE-----------------------------------------

   const submit = async () => {

      try {
         await axios.post(`http://localhost:7000/createCourse`, { name, priceFrom, priceTill, date, month, year })
         alert(' course created successfully')
      }
      catch (error) { throw new Error('TR: !post  new course') }
   }

   useEffect(() => {
      setDate(new Date().getDate())
      setMonth(listOfMonthes[new Date().getMonth()])
      setYear(new Date().getFullYear())
   }, [])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Ввести курс</h1>
         <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', my: '5vh' }}>
            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw' }}
               label={`name of course...`}
               value={name}
               onChange={(event) => setName(event.target.value)}
            />
            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw' }}
               label={`price from...`}
               value={priceFrom}
               onChange={(event) => setPriceFrom(event.target.value)}
            />
            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw' }}
               label={`price till...`}
               value={priceTill}
               onChange={(event) => setPriceTill(event.target.value)}
            />

         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
               onClick={() => submit()}
               sx={{ height: '4vh', mx: 'auto' }}
               size='small'
               variant='outlined'
               color='success'>
               submit
            </Button>
         </Box>
      </div>
   )
}