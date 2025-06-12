require('dotenv').config();

const helmet = require('helmet')
const cors = require('cors')
const xss = require('./middleware/xss')
const ratelimit = require('express-rate-limit')

const express = require('express');
const app = express();
const db = require('./db/connect');
const authroute = require('./routes/auth');
const jobroute = require('./routes/jobs');
const authmiddleware = require('./middleware/authentication');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


//swagger
const yaml = require('yamljs');
 const swaggerUi = require('swagger-ui-express');
 const swaggerDocument = yaml.load('./swagger.yaml');

 app.set('trust proxy', 1);
 app.use(express.json());
 app.use(helmet());
 app.use(cors())
app.use(xss);
 app.use(ratelimit({
  windowMs: 900000,
  max:100
}));

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the jobs api</h1>' +
      '<a href="/api-docs">API Documentation</a>')
})
app.use('/api/auth', authroute);

app.use('/api/jobs',authmiddleware,jobroute);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await db(process.env.mongodb);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
