require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/auth-route');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/not-found');
const jobRouter = require('./routes/job-route');
const jobApplicationRouter = require('./routes/job-application-route');
const authenticate = require('./middlewares/authenticate');
const userRouter = require('./routes/user-route');
const experienceRouter = require('./routes/experience-route');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', authenticate, userRouter);
app.use('/jobs', jobRouter);
app.use('/job-applications', authenticate, jobApplicationRouter);
app.use('/experiences', authenticate, experienceRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running at port: ${PORT}`));
