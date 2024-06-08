require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-route');
const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running at port: ${PORT}`));
