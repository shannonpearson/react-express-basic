import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import webpackDevServer from './webpack/dev-server';
import routes from './routes';


// use dotenv
dotenv.config({
  silent: true,
});

// Express app setup
const app = express();

// view engine
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');


// include webpack-dev-server for development only
if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app);
}

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


// logger
app.use(logger('combined'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());


// serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', routes);

// app.get('*', (req, res) => {
//   res.status(200).send({
//     message: 'Welcome to the beginning of nothingness',
//   });
// });

// error handlers
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: app.get('env') === 'development' ? err : {},
//   });
//   next();
// });

export default app;
