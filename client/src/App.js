
import MainCourse from './courses/mainCourse'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function App() {
	return (
		<BrowserRouter>
			<Container disableGutters maxWidth='lg' sx={{ minHeight: '100vh' }}>
				<Routes>
					<Route path='/*' element={<MainCourse />} />
				</Routes>
			</Container>
		</BrowserRouter>
	)
}





