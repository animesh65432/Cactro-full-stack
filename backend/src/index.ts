import { config } from "./config"
import { connectdb } from "./db"
import express from "express"
import cors from "cors"
import router from "./routes"

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)


connectdb().then(() => {
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);

});