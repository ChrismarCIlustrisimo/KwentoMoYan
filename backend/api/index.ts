import serverless from "serverless-http";
import app from "../src/app";

export const config = {
  api: {
    bodyParser: false, // lets express handle JSON
  },
};

export default serverless(app);
