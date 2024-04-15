import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongodbURL } from "./config.js";
import poiRoute from "./routes/poiRoute.js"
import terminalRoute from "./routes/terminalRoute.js"
import userRoute from "./routes/userRoute.js"
import journeyRoute from "./routes/journeyRoute.js"

const app = express();

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS POLICY'
//Option 1: Allow All Origins with default of cors(*)
app.use(cors())
//Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Evide')
});

app.use('/user', userRoute);
app.use('/terminal', terminalRoute);
app.use('/poi', poiRoute);
app.use('/journey', journeyRoute);
// app.use('/itineraries', itineraryRoute);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
    
export default app