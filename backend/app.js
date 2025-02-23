const express = require("express");
const cors = require("cors");
const { db } = require("./models/db");

const bookRouter = require("./routes/bookRoute");
const authorRouter = require("./routes/authorRoute");
const userRouter = require("./routes/userRoute");
const editionRouter = require("./routes/editionRoute");
const themeRouter = require("./routes/themeRoute");
const typeRouter = require("./routes/typeRoute");

const app = express();
const PORT = 2000;
app.use(cors({
    origin: 'http://localhost:4000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/books",bookRouter);
app.use("/api/v1/authors",authorRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/editions",editionRouter);
app.use("/api/v1/themes",themeRouter);
app.use("/api/v1/types",typeRouter);

db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
