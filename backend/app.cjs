const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db } = require("./models/db.cjs");

const bookRouter = require("./routes/bookRoute.cjs");
const authorRouter = require("./routes/authorRoute.cjs");
const userRouter = require("./routes/userRoute.cjs");
const editionRouter = require("./routes/editionRoute.cjs");
const themeRouter = require("./routes/themeRoute.cjs");
const typeRouter = require("./routes/typeRoute.cjs");

const app = express();
const PORT = process.env.API_PORT || 2000;
app.use(cors({
    origin: `http://localhost:${process.env.APP_PORT || 3000}`, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({limit: "2mb"}));
app.use(cookieParser());

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
