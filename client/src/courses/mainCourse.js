
import { Link, Routes, Route } from "react-router-dom"
import { Button, Box } from '@mui/material'

import CreateCourse from "./crud/createCourse"
import UpdateCourse from "./crud/updateCourse"
import DeleteCourse from "./crud/deleteCourse"
import ReadFullList from "./crud/readFullList"

import AscendingPrice from "./crud/ascendingPrice"
import ReadCourseByPrice from "./crud/readCourseByPrice"


export default function MainCourse() {

   return (
      <div>
         <h3 style={{ textAlign: 'center' }}>NewGenVision</h3>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3%', borderBottom: '1px solid black' }}>
            <Link to='createCourse'>
               <Button size='small'>ввести курсы</Button>
            </Link>
            <Link to='readFullList'>
               <Button size='small'>полный список</Button>
            </Link>
            <Link to='updateCourse'>
               <Button size='small'>редактировать курс</Button>
            </Link>
            <Link to='deleteCourse'>
               <Button size='small'>удалить курс</Button>
            </Link>
         </Box>

         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3%', borderBottom: '1px solid black' }}>
            <Link to='ascendingPrice'>
               <Button size='small'>сортировка по возрастанию цен</Button>
            </Link>
            <Link to='readCourseByPrice'>
               <Button size='small'>фильтр по ценам</Button>
            </Link>
         </Box>

         <Routes>
            <Route path="createCourse" element={<CreateCourse />} />
            <Route path="readFullList" element={<ReadFullList />} />
            <Route path="updateCourse" element={<UpdateCourse />} />
            <Route path="deleteCourse" element={<DeleteCourse />} />
            <Route path="ascendingPrice" element={<AscendingPrice />} />
            <Route path="readCourseByPrice" element={<ReadCourseByPrice />} />
         </Routes>
      </div>
   )
}