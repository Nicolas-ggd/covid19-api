const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
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
const covidApi = require('./controllers/covid-api/covidapi.routes');

const app = express();
dotenv.config();
connectDb();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.options('*', cors())
app.options(cors({
    origin: 'https://ggd-covid19.netlify.app/'
}));
app.use('/register', register);
app.use('/auth', userAuth);
app.use('/logout', userLogOut);
app.use('/reset-password', resetPassword);
app.use('/covid', covidApi);

app.use(verifyJWT);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));