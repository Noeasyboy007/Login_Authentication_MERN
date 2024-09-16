const signup = async (req, res) => {
    res.send("signup route")
}
const login = async (req, res) => {
    res.send("login route")
}
const logout = async (req, res) => {
    res.send("logout route")
}


module.exports = { signup, login, logout }