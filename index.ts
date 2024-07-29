import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

import { batchUpdate } from "./batch-update";

dotenv.config();

const app = express();

app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/presentations",
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  res.send("Authentication successful");

  batchUpdate({
    slidesClient: google.slides({
      version: "v1",
      auth: oauth2Client,
    }),
    presentationId: "1bfRKbhaATLT0vMEkM7qpq-pPI46QBbZXqLNnVWC-zks",
  });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000/auth")
);
