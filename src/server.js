import express from 'express'
import cors from 'cors'


const server = express()

const port = process.env.PORT


server.use(express.json())
server.use(cors());


server.listen(port, () => { console.log("the server is running") })