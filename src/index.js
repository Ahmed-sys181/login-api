import 'dotenv/config';
import app from "./app.js";
import { connectDB } from "./config/database.js";

const startServer = async () => {
    try {
        await connectDB(); 
        app.on('error', (error) => {
            console.log("app failed launching!");
            throw error;
        }); 
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => { console.log(`App connected on port ${PORT}`); });
    } catch (error) {
        console.log("Failed launching the server", error);
    }
};

startServer();