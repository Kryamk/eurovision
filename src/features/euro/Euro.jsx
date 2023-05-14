import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addCountry, saveUsers, removeCountry, reorder } from '../../app/euroSlice'
import style from './Euro.module.scss'
import UserList from './UserList'

export default function Euro() {
	const dispatch = useDispatch()
	const { users, countries } = useSelector(state => state.euro)
	const [currentCountry, setCurrentCountry] = useState({})

	/* function dragStartHandler(e, country) {
		setCurrentCountry(country)
	}
	function dragEndHandler(e) {
		e.target.style.background = 'transparent'
	}
	function dragOverHandler(e) {
		e.preventDefault()
		e.target.style.background = 'navy'
	}
	function dropHandler(e, userId, country) {
		e.preventDefault()
		dispatch(changeOrder({ userId, name: currentCountry.name, order: country.order }))
		dispatch(changeOrder({ userId, name: country.name, order: currentCountry.order }))
		e.target.style.background = 'transparent'
	}

	function removeHandler(userId, country) {
		console.log(userId, country)
		dispatch(removeCountry({ userId, country }))
	}
 */

	function handleDragEnd(e) {
		// console.log(e)
		const { destination, source, draggableId } = e
		if (!destination) return
		if (destination.index === source.index && destination.droppableId === source.droppableId) return;
		if (source.droppableId === 'default') {
			if (destination.droppableId === 'default') return
			if (users[destination.droppableId].countries.some(country => country.name === draggableId)) return
			dispatch(addCountry({ userIndex: destination.droppableId, countryName: draggableId, index: destination.index }))
			dispatch(saveUsers())
		}
		if (destination.droppableId === source.droppableId) {
			dispatch(reorder({ userIndex: destination.droppableId, indexSource: source.index, indexDestination: destination.index }))
			dispatch(saveUsers())
		}

	}

	function handleRemove(userLogin, countryId) {
		dispatch(removeCountry({ userLogin, countryId }))
		dispatch(saveUsers())
	}




	return (
		<>
			<div className={style.wrap}>
				<DragDropContext onDragEnd={handleDragEnd}>

					<UserList user={users['ivan']} remove={handleRemove} />
					<UserList user={users['anny']} remove={handleRemove} />
					<Droppable droppableId='default'>
						{(provided, snapshot) => {
							return (
								<div ref={provided.innerRef} {...provided.droppableProps} className={style.countries}>
									{countries.map((country, index) => (
										<Draggable key={country.name} index={index} draggableId={country.name}>
											{(provided, snapshot) => {
												return (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={style.country}
													>
														<div>
															<h3>{country.name}</h3>
															<span>Artist:</span> <i>{country.artist}</i><br />
															<span>Song:</span> <i>{country.song}</i>
														</div>
													</div>
												)
											}}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)
						}}
					</Droppable>
				</DragDropContext>
			</div>
		</>
	)
}
