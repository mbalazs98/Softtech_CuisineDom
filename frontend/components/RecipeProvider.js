import RecipeContext from './RecipeContext'

const RecipeProvider = () => {
	state = {
		user: {
			name: 'CuisineDom',
			email: 'user@cuisinedom.com',
			password: 'userpass'
		}
	};
	
	return (
		<RecipeContext.Provider
			value = {{
				user: state.user
			}}
		>
			{props.children}
		</RecipeContext.Provider>
	)
};