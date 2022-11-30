import express from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import expressFileUpload from "express-fileupload";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";
import config from "./2-utils/config";
import sanitize from "./3-middleware/sanitize";
import expressRateLimit from "express-rate-limit";

const server = express();

server.use(
  "/api/",
  expressRateLimit({
    windowMs: 500,
    max: 50,
    message:
      "You have exceeded the allowed amount of times for browsing the site.",
  })
);

server.use(sanitize);

server.use(cors());

server.use(express.json());

server.use(expressFileUpload());

server.use("/", authController);
server.use("/", vacationsController);

server.use("*", routeNotFound);

server.use(catchAll);

server.listen(config.port, () =>
  console.log("Listening on http://localhost:" + config.port)
);
