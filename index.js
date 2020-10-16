const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies')
const authApi = require('./routes/auth')

const { errorHandler, logErrors, wrapErrors } = require('./utils/middlewares/errorHandler');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

//Body parser
app.use(express.json());

//routes
authApi(app);
moviesApi(app);
userMoviesApi(app);
app.use(notFoundHandler);


// Error middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
