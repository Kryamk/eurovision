const { createSlice, nanoid, createAsyncThunk } = require("@reduxjs/toolkit");

const URL_FETCH_DATA = 'http://localhost:5000'

const initialState = {
	users: {
		'ivan': {
			name: 'Ivan',
			login: 'ivan',
			desc: 'Hello!!!',
			countries: [
				// { id: 1,name: 'Крямк', place: 1 },
				// { id: 2,name: 'Пафнутий', place: 2 },
				// { id: 3,name: 'Элькерий', place: 3 },
			]
		},
		'anny': {
			name: 'Anny',
			login: 'anny',
			desc: 'Anny is the most beautiful diamond in the Universe',
			countries: [
				// { id: 1,name: 'Крямк', place: 3 },
				// { id: 2,name: 'Пафнутий2', place: 2 },
				// { id: 3,name: 'Элькерий2', place: 1 },

			]
		}
	},
	countries: []
}

export const getUsers = createAsyncThunk(
	'euro/getUsers',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(`${URL_FETCH_DATA}/users`)
			const json = await response.json()
			return json
		} catch (e) {
			console.log(e)
			throw thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
		}
	}
)

export const getCountries = createAsyncThunk(
	'euro/getCountries',
	async (_, thunkAPI) => {
		try {
			const response = await fetch(`${URL_FETCH_DATA}/countries`)
			const json = await response.json()
			return json
		} catch (e) {
			console.log(e)
			throw thunkAPI.rejectWithValue('Не удалось загрузить страны')
		}
	}
)
export const saveUsers = createAsyncThunk(
	'euro/saveUsers',
	async (obj, thunkAPI) => {
		try {
			const response = await fetch(`${URL_FETCH_DATA}/users`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify(thunkAPI.getState().euro.users)
			})
		} catch (e) {
			console.log(e)
			throw thunkAPI.rejectWithValue('Не удалось отправить данные')
		}
	}
)


export const euroSlice = createSlice({
	name: 'euro',
	initialState,
	reducers: {
		changePlace: (state, action) => {
			// let user = state.users.find(user => user.id === action.payload.userId);
			// user.countries.map(country => country.name !== action.payload.name ? country : country.place = action.payload.place)
		},
		addCountry: {
			reducer(state, action) {
				const country = state.countries.find(country => country.name === action.payload.countryName)
				const user = state.users[action.payload.userIndex]
				const indexCountry = action.payload.index
				user.countries.splice(indexCountry, 0, { id: action.payload.id, name: country.name, place: indexCountry + 1 })
				user.countries.forEach((country, index) => {
					if (index >= indexCountry) {
						country.place = index + 1
					}
				})
			},
			prepare({ userIndex, countryName, index }) {
				return {
					payload: { id: nanoid(), userIndex, countryName, index }
				}
			}
		},
		removeCountry: (state, action) => {
			const user = state.users[action.payload.userLogin]
			user.countries = user.countries.filter(country => country.id !== action.payload.countryId)
			user.countries.forEach((country, index) => country.place = index + 1)
		},
		reorder(state, action) {
			const user = state.users[action.payload.userIndex]
			const [removed] = user.countries.splice(action.payload.indexSource, 1)
			user.countries.splice(action.payload.indexDestination, 0, removed)
			user.countries.forEach((country, index) => country.place = index + 1)
		}
	},
	extraReducers: {
		[saveUsers.pending.type]: (state) => {
		},
		[saveUsers.fulfilled.type]: (state, action) => {
			console.log(action)
		},
		[saveUsers.rejected.type]: (state, action) => {
			console.log(action)
		},

		[getUsers.pending.type]: (state) => {
		},
		[getUsers.fulfilled.type]: (state, action) => {
			state.users = action.payload
		},
		[getUsers.rejected.type]: (state, action) => {
			console.log(action)
		},

		[getCountries.pending.type]: (state) => {
		},
		[getCountries.fulfilled.type]: (state, action) => {
			let countries = action.payload
			let countriesInFinal = countries.filter(country => country.inFinal === true)
			state.countries = countriesInFinal
		},
		[getCountries.rejected.type]: (state, action) => {
			console.log(action)
		},
	}


})


export const { addCountry, removeCountry, reorder } = euroSlice.actions


export default euroSlice.reducer
