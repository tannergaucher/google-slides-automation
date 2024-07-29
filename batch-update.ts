import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

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

  const slides = google.slides({
    version: "v1",
    auth: oauth2Client,
  });

  const presentationId = "1bfRKbhaATLT0vMEkM7qpq-pPI46QBbZXqLNnVWC-zks";
  const slide1ObjectId = uuidv4();
  const shapeObjectId = uuidv4();

  slides.presentations.batchUpdate(
    {
      presentationId,
      requestBody: {
        requests: [
          {
            createSlide: {
              objectId: slide1ObjectId,
              slideLayoutReference: {
                predefinedLayout: "BLANK",
              },
            },
          },
          {
            createShape: {
              objectId: shapeObjectId,
              shapeType: "TEXT_BOX",
              elementProperties: {
                pageObjectId: slide1ObjectId,
                size: {
                  height: { magnitude: 100, unit: "PT" },
                  width: { magnitude: 600, unit: "PT" },
                },
                transform: {
                  scaleX: 1,
                  scaleY: 1,
                  translateX: 60,
                  translateY: 30,
                  unit: "PT",
                },
              },
            },
          },
          {
            insertText: {
              objectId: shapeObjectId,
              insertionIndex: 0,
              text: "Hello, world!",
            },
          },
          {
            updateTextStyle: {
              objectId: shapeObjectId,
              style: {
                fontFamily: "Arial",
                fontSize: {
                  magnitude: 24,
                  unit: "PT",
                },
                foregroundColor: {
                  opaqueColor: {
                    rgbColor: {
                      red: 0,
                      green: 0,
                      blue: 0,
                    },
                  },
                },
              },
              textRange: {
                type: "ALL",
              },
              fields: "fontFamily,fontSize,foregroundColor",
            },
          },
        ],
      },
    },
    (err, res) => {
      if (err) {
        console.error(err, "err");
        return;
      }

      console.log(res, "res");
    }
  );
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000/auth")
);
