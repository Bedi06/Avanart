import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import domtoimage from "dom-to-image-more";
import { saveAs } from "file-saver";

interface ImageGeneratorProps {
  generatedImageDataUrl: string | null; // Change prop name to generatedImageDataUrl
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  generatedImageDataUrl,
}) => {
  const handleDownload = async () => {
    if (generatedImageDataUrl) {
      const node = document.getElementById("avatar-img-container");
      try {
        const blob = await domtoimage.toBlob(node);
        saveAs(blob, "my-node.png"); // using saveAs directly
      } catch (error) {
        console.error("Oops, something went wrong!", error);
      }
    }
  };
  return (
    <Card sx={{ width: "100%", maxWidth: 400, height: 300, padding: "2em" }}>
      <CardContent style={{ position: "relative" }}>
        {generatedImageDataUrl && (
          <>
            <div id="avatar-img-container">
              <p
                style={{
                  position: "absolute",
                  width: "100%",
                  zIndex: 9,
                  color: "black",
                  padding: "5px",
                }}
              >
                test
              </p>
              <img
                src={generatedImageDataUrl}
                alt="Generated"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "8px",
                }}
              />
            </div>

            <CardActions>
              <Button onClick={handleDownload}>Download Image</Button>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
