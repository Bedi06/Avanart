import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";

interface ImageGeneratorProps {
  generatedImageDataUrl: string | null; // Change prop name to generatedImageDataUrl
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  generatedImageDataUrl,
}) => {
  // Use generatedImageDataUrl prop
  const handleDownload = () => {
    if (generatedImageDataUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = generatedImageDataUrl;
      downloadLink.download = "generated_image.png";
      downloadLink.click();
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400, height: 300, padding: "2em" }}>
      <CardContent>
        {generatedImageDataUrl && (
          <>
            <img
              src={generatedImageDataUrl}
              alt="Generated"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "8px" }}
            />
            <p style={{ position: "absolute", bottom: "5px", left: "70px", zIndex: 1, color: "black", padding: "5px" }}>{selectedRegion}</p>
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
