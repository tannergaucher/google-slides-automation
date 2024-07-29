import { slides_v1 } from "googleapis";
import { v4 as uuidv4 } from "uuid";

export function batchUpdate({
  slidesClient,
  presentationId,
}: {
  slidesClient: slides_v1.Slides;
  presentationId: string;
}) {
  const slide1ObjectId = uuidv4();
  const shapeObjectId = uuidv4();

  slidesClient.presentations.batchUpdate(
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
                fontFamily: "Inter",
                fontSize: {
                  magnitude: 36,
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
          {
            updateParagraphStyle: {
              objectId: shapeObjectId,
              style: {
                alignment: "CENTER",
              },
              textRange: {
                type: "ALL",
              },
              fields: "alignment",
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

      if (res?.statusText === "OK") {
        console.log("Slides updated successfully");
        console.log(res.data);
      }
    }
  );
}
