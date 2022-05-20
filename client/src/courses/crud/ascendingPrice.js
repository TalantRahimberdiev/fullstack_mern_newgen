
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

import { MakingTable } from '../makingTable'

export default function AscendingPrice() {

   const [list, setList] = useState()
   const [sorted, setSorted] = useState()

   //--------------------READ_FULL_LIST------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/listOfCourses`)
            setList(response.data)
            setSorted([...response.data].sort((a, b) => a['priceFrom'] - b['priceFrom']))
         }
         catch (error) { throw new Error(`TR: couldn't get list`) }
      }
      getList()
   }, [])

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>unsorted list</h1>
         {
            list && MakingTable(list)
         }
         <h1 style={{ textAlign: 'center' }}>sorted list</h1>
         {
            sorted && MakingTable(sorted)
         }
      </>
   )
}
