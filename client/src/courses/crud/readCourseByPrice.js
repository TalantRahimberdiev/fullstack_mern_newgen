
import { useState, useEffect } from 'react'
import { TextField, Box, Button } from '@mui/material'
import axios from 'axios'

import { MakingTable } from '../makingTable'

export default function ReadCourseByPrice() {
	const [list, setList] = useState()
	const [min, setMin] = useState('')
	const [max, setMax] = useState('')
	const [matches, setMatches] = useState()

	//--------------------READ_SUITABLE_LIST------------------------------------------------------------------------------------
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

	function checkPrices() {
		setMatches(list.filter(bb => bb['priceFrom'] >= +min && bb['priceTill'] <= +max))
	}

	return (
		<div>
			<p style={{ textAlign: 'center' }}>по цене</p>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<TextField
					value={min}
					onChange={(event) => setMin(event.target.value)}
					sx={{ width: '23vw' }}
					autoComplete='off'
					label="min price..."
					variant="standard"
				/>
				<TextField
					value={max}
					onChange={(event) => setMax(event.target.value)}
					sx={{ width: '23vw' }}
					autoComplete='off'
					label="max price..."
					variant="standard"
				/>
			</Box>
			{
				list && MakingTable(list)
			}
			<Button
				sx={{ marginLeft: '45vw' }}
				onClick={() => checkPrices()}
			>get</Button>
			{
				matches && MakingTable(matches)
			}
		</div>
	)
}
