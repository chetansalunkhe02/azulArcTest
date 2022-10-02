
import express from 'express'
import cors from 'cors'
import employeeRoutes from './src/routes/employee'
import indexRoutes from './src/routes/index'
import "./src/config/config"

const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// use it before all route definitions
app.use(cors({ origin: 'http://localhost:3001' }));

// routes
app.use('/', indexRoutes)
app.use('/employee', employeeRoutes)

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404).send('404 Error - not found');
});


app.listen(port, () => {
  console.log('App is now running at port ', port)
})

// app.on('error', onError);
// app.on('listening', onListening);