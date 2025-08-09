import Express from "express";
// import Raven from 'raven';
import compression from "compression";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import chalk from "./chalk";
import cors from 'cors';

import mainRoutes from './routes/main.routes.js';
import candidateRoutes from './routes/candidate.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import otpRoutes from './routes/otp.routes.js';
import hrRoutes from './routes/hr.routes.js';

import config from './config.js';
import http from 'http';

const app = Express();
mongoose.Promise = global.Promise;

const server = http.createServer(app);

// MongoDB Connection
mongoose.connect(config.mongoURL);

mongoose.set('debug', false);


app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));
app.use(cookieParser());
app.enable('trust proxy');

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use('*', (req, res, next) => {
  const { hostname, originalUrl, protocol, method } = req;
  console.log(
    `${method === 'GET' ? chalk.getReq(method) : chalk.postReq(method)
    }  ${protocol}://${hostname}:${config.PORT}${originalUrl}`
  );
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.use('/', mainRoutes);
app.use('/api/v1/candidate', candidateRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/hr', hrRoutes);


server.listen(config.PORT, (error) => {
  console.log(process.env.NODE_ENV);
  console.log(`Core API is running on port: ${config.PORT}!`);
});