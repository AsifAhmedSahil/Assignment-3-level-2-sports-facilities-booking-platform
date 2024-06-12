import express, { Application, Request, Response } from 'express'
import router from './routes';
import notFound from './middlewares/notFound';


const app: Application = express();

app.use(express.json());
app.use("/api",router)



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// not found route
app.use(notFound)

export default app