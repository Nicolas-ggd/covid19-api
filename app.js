const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io')
const connectDb = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const register = require('./controllers/register/register.routes');
const userAuth = require('./controllers/auth/auth.routes');
const userLogOut = require('./controllers/logout/logout.routes');
const resetPassword = require('./controllers/resetPassword/resetPassword.routes');
const userController = require('./controllers/user/user.routes');
const contactMe = require('./controllers/contact/contact.routes');

const app = express();
dotenv.config();
connectDb();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/register', register);
app.use('/auth', userAuth);
app.use('/logout', userLogOut);
app.use('/reset-password', resetPassword);
app.use('/user', userController);
app.use('/contact', contactMe);

app.use(verifyJWT);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // socket.on('join', (data) => {
    //     console.log(data)
    // })
});