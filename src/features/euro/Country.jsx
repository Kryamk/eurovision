import React, { useState } from 'react'
import { changeOrder } from '../../app/euroSlice'
import { useDispatch } from 'react-redux'
import style from './Euro.module.scss'

export default function Country({ userId, country, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler, removeHandler }) {



	return (
		<div
			onDragStart={(e) => dragStartHandler(e, country)}
			onDragLeave={(e) => dragEndHandler(e)}
			onDragEnd={(e) => dragEndHandler(e)}
			onDragOver={(e) => dragOverHandler(e)}
			onDrop={(e) => dropHandler(e, userId, country)}
			draggable={true}
			className={style.country}
			onClick={() => removeHandler(userId, country)}
		>
			<div>{country.name} {country.order} </div>
		</div>
	)
}





