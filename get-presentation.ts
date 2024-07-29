import { slides_v1 } from "googleapis";

export function getPresentation({
  slidesClient,
  presentationId,
}: {
  slidesClient: slides_v1.Slides;
  presentationId: string;
}) {
  return slidesClient.presentations.get({
    presentationId,
  });
}
