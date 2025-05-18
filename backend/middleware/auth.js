import jwt from 'jsonwebtoken'

const isAuthenticated = (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json ({success: false, message: "Please Log In"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = tokenDecode.id;
        next()
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: "Error"})
    }
}

export default isAuthenticated