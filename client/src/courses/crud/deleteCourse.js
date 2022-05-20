
import { TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MakingTable } from '../makingTable'


export default function DeleteCourse() {

   const [token, setToken] = useState('')
   const [course, setCourse] = useState()
   const [courses, setCourses] = useState()

   //-----------------------GET LIST OF COURSES-------------------------------------------------------------

   const getCourses = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/listOfCourses`)
         setCourses(response.data)
      }
      catch (error) { throw new Error(<p>TR:could'nt get courses</p>) }
   }

   //-----------------------GET MATCHING COURSE-------------------------------------------------------------

   const getCourse = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/requestedCourse/${token}`)
         setCourse(response.data)
      }
      catch (error) { throw new Error(<p>TR:could'nt get suitable course</p>) }
   }

   //-------------------------DELETE MATCHING COURSE-----------------------------------------------------------

   const deleteTovar = () => {
      axios.delete(`http://localhost:7000/deleteCourse/${token}`)
      setCourse()
      alert(' course deleted successfully')
      setToken('')
      getCourses()
   }

   useEffect(() => {
      if (token) {
         getCourse()
      }
   }, [token])

   useEffect(() => {
      getCourses()
   }, [])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>удалить курс</h1>
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
               value={token}
               onChange={(event) => setToken(event.target.value)}
               sx={{ width: '23vw' }}
               autoComplete='off'
               label="введите № курса..."
               variant="standard" />
         </Box>
         <>
            {!token && courses && MakingTable(courses)}
            {token && course && MakingTable(course)}
            {
               token &&
               <Button
                  onClick={() => deleteTovar()}
                  sx={{ height: '4vh', mx: 'auto',width:'15vw',marginLeft:'37.5vw' }}
                  size='small'
                  variant='outlined'
                  color='error'>
                  delete
               </Button>
            }
         </>
      </div >
   )
}
