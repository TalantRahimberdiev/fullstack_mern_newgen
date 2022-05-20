
import axios from 'axios'
import { useEffect, useState } from 'react'

import { MakingTable } from '../makingTable'

export default function ReadFullList() {

   const [list, setList] = useState()

   //--------------------READ_FULL_LIST------------------------------------------------------------------------------------
   useEffect(() => {
      const getList = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/listOfCourses`)
            setList(response.data)
         }
         catch (error) { throw new Error(`TR: couldn't get list`) }
      }
      getList()
   }, [])

   //------------------------------------------------------------------------------------------------------------

   return (
      <>
         <h1 style={{ textAlign: 'center' }}>полный список</h1>
         {
            list && MakingTable(list)
         }
      </>
   )
}
