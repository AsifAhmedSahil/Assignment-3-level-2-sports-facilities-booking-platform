import express, { Application, Request, Response } from 'express'
import router from './routes';
import notFound from './middlewares/notFound';
import { bookingControllers } from './modules/bookings/bookings.controller';
import globalErrorHandler from './middlewares/globalErrorHandler';


const app: Application = express();

app.use(express.json());
app.use("/api",router)


app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to the project - Sports Facility Booking Platform')
})
app.get("/api/check-availability",bookingControllers.checkAvaiability)

app.use(globalErrorHandler)
// not found route
app.use(notFound)



export default app