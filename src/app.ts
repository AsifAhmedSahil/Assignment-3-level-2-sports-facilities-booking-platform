import express, { Application, Request, Response } from 'express'
import router from './routes';
import notFound from './middlewares/notFound';
import { bookingControllers } from './modules/bookings/bookings.controller';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';


const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:5173','https://fortune-sports.vercel.app']  , credentials:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api",router)


app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to the project - Sports Facility Booking Platform')
})
app.get("/api/check-availability",bookingControllers.checkAvailability)

app.use(globalErrorHandler)
// not found route
app.use(notFound)



export default app