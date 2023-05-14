import React from 'react'
import { useDispatch } from 'react-redux';
import { addCountry } from '../../app/euroSlice';

export default function({userId}) {
	const dispatch = useDispatch()
	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target.todo.value)
		dispatch(addCountry({userId, countryName: e.target.todo.value}))
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<input placeholder='New todo' name="todo" />
				<input type="submit" value="Add Todo" />
			</form>
		</>
	)
}
