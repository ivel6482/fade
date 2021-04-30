exports.getUserProfile = async (req, res) => {
	try {
		res.send('User Profile')
	} catch (error) {
		console.error(error)
	}
}
