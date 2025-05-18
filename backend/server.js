import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import leaveRouter from './routes/leaveRoute.js'
import userRouter from './routes/userRoute.js'
import attendanceRouter from './routes/attendanceRoute.js'
import 'dotenv/config'

// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors()) 

//db connection
connectDb();

// api endpoint 
app.use('/api/leave', leaveRouter)
app.use('/api/user', userRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/images', express.static('uploads'))

app.get('/', (req,res)=> {
    res.send('working')
})

// Starting server
app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`)
})

