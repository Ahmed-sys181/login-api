import app from "./app";
import { connectDB } from "./config/database"

const startServer = async () => {
    try {
        await connectDB(); 
        app.on('error' , (error) => {
            console.log("app failed launching !");
            throw error ;
        }); 
        app.listen(process.env.PORT , () => { console.log(`app connected on port ${process.env.PORT ||3000 }`) }) ;
    } catch (error) {
        console.log("failed to connect to database !" , error);
    }
}; 

startServer(); 