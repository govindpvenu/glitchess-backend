import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"

const { Server } = require("socket.io")
const http = require("http")

import "dotenv/config"
import env from "./utils/validateEnv"
import connectDB from "./config/db"
import passport from "passport"

import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import gameRoutes from "./routes/gameRoutes"

import { notFound, errorHandler } from "./middlewares/errorHandler"
require("./config/googleAuth")

connectDB()
const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: [env.CLIENT_URL, "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
})

// Initialize socket handlers after io is created
require("./socket/socket")

app.use(morgan("dev"))
app.use(
    cors({
        origin: [env.CLIENT_URL, "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/game", gameRoutes)

app.get("/", (req, res) => res.send("Server is ready"))

app.use(notFound)
app.use(errorHandler)

const port = env.PORT || 5000
server.listen(port, () => console.log(`Server started on port ${port}`))
