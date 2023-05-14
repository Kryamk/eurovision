import React, { useEffect } from 'react';
import Header from './features/header/Header';
import Euro from './features/euro/Euro';
import { getCountries, getUsers } from './app/euroSlice';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch   = useDispatch()
	useEffect(() => {
		dispatch(getUsers())
		dispatch(getCountries())
	}, [])

	return (
		<div className="App">
			<Header />
			<Euro />
		</div>
	);
}

export default App;
