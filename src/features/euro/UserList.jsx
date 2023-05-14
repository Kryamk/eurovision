import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import style from './Euro.module.scss'


export default function UserList({ user, remove }) {
	return (
		<div>
			<h2>{user.name} </h2>
			<p>{user.desc}</p>

			{/* <AddCountries userId={user.id} /> */}

			<Droppable droppableId={`${user.login}`}>
				{(provided, snapshot) => {
					return (
						<div ref={provided.innerRef} {...provided.droppableProps} className={style.countries}>
							{user.countries.map((country, index) => (
								<Draggable key={country.id} index={index} draggableId={country.id}>
									{(provided, snapshot) => {
										return (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={style.country}
											>
												{country.place} {country.name}
												<button onClick={()=> remove(user.login, country.id)}>del</button>
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
		</div>
	)
}
