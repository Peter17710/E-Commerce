import express from "express"
import { connection } from "./db/connection.js"
import { bootstrap } from "./src/modules/Bootstrap.js"
import appError from "./src/utils/appError.js"
import { globalError } from "./src/utils/globalError.js"
import cors from "cors"
import "dotenv/config.js"
import pkg from "redis";
const { createClient } = pkg;


const app = express()
const client = createClient({
    host: "redis",
    port: 6379,
});

client.on("error", (err) => console.error("Redis Client Error", err));
// Connect to Redis and execute commands after connection
(async () => {
    await client.connect();
    console.log("Connected to Redis");

    // Set initial value for visitCounters
    await client.set("visitCounters", 0);
})();

app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use(cors())

connection
bootstrap(app)

app.get("/", async (req, res, next) => {
    try {
        let visitCounters = await client.get("visitCounters");

        if (!visitCounters) {
            visitCounters = 0;
        }
        const updatedCounters = parseInt(visitCounters) + 1;

        await client.set("visitCounters", updatedCounters);

        res.send("Visit Counters: " + updatedCounters);
    } catch (err) {
        console.error("Error accessing Redis:", err);
        next(new appError("Failed to retrieve visit counters", 500));
    }
});
 
app.use("**", (req, res, next) => {
    next(new appError("invalid url", 404))
}) 

app.use(globalError)
 
app.listen(process.env.PORT, () => {
    console.log("Server is running");
})