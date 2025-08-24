import serverless from "serverless-http";
import app from "../src/app";

export const config = {
  api: {
    bodyParser: false, // let Express handle JSON
  },
};

export default serverless(app);
