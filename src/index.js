import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { NotFoundErrorHandler } from "./errors/NotFoundErrorHandler.js";
import { GlobalErrorHandler } from "./errors/GlobalErrorHandler.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

if (process.env.NODE_ENV == "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}


app.use('/api',router);
// Add Routes here

// Don't add any route after this two middlewares
app.use(NotFoundErrorHandler);
app.use(GlobalErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
