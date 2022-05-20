
import { useState, useReducer, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import axios from 'axios'

export default function UpdateCourse() {

	const [token, setToken] = useState('')

	const initialState = {
		name: '',
		priceFrom: '',
		priceTill: ''
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case 'GETCOURSE': return { ...action.payload }
			case 'NAME': return { ...state, name: action.payload }
			case 'PRICEFROM': return { ...state, priceFrom: action.payload }
			case 'PRICETILL': return { ...state, priceTill: action.payload }
			case 'CLEAR': return { name: '', priceFrom: '', priceTill: '' }
			default: return state
		}
	}

	//-----------------------GET MATCHING COURSE-------------------------------------------------------------

	const getCourse = async () => {
		try {
			const response = await axios.get(`http://localhost:7000/requestedCourse/${token}`)
			dispatch({ type: 'GETCOURSE', payload: {...response.data[0]} })
		}
		catch (error) { throw new Error(<p>TR:could'nt get suitable course</p>) }
	}
	//------------------------UPDATE COURSE--------------------------------------------------------------------

	const update = async () => {
		try {
			const name = state.name
			const priceFrom = state.priceFrom
			const priceTill = state.priceTill

			await axios.post(`http://localhost:7000/updateCourse`, { name, priceFrom, priceTill, token })
			dispatch({ type: 'CLEAR' })
			alert('course updated successfully')
			setToken('')
		}
		catch (error) { throw new Error(<p>TR: couldn't post/update course</p>) }
	}

	useEffect(() => {
		if (token) {
			dispatch({ type: 'CLEAR' })
			getCourse()
		}
	}, [token])

	const cases=['NAME','PRICEFROM', 'PRICETILL']

	//---------------------------------------------------------------------------------------------------------------
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>редактировать данные курса</h1>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<TextField
					value={token}
					onChange={event => setToken(event.target.value)}
					sx={{ width: '23vw' }}
					autoComplete='off'
					label="введите № курса"
					variant="standard" />
			</Box>
			{
				state.name && (
					<div>
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{
								Object.entries(state).map((item, index) => {
									return (
										<TextField
											autoComplete='off'
											key={index}
											variant="standard"
											sx={{ width: '25vw', m: 'auto', my: '3vh' }}
											size='small'
											label={item[0]}
											value={item[1]}
											onChange={(event) => dispatch({ type: cases[index], payload: event.target.value })}
										/>
									)
								})
							}
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button onClick={() => update()} sx={{ height: '4vh', mx: 'auto' }} size='small' variant='outlined' color='success'>update</Button>
						</Box>
					</div>
				)
			}
		</div>
	)
}
