import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";

interface ImageGeneratorProps {
  generatedImageDataUrl: string | null; 
  selectedRole: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  generatedImageDataUrl, selectedRole
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
      <CardContent style={{ position: "relative" }}>
        {generatedImageDataUrl && (
          <>
            <p style={{ position: "absolute", top: "10px", left: "70px", zIndex: 1, color: "black", padding: "5px" }}>{selectedRole}</p>
            <img
              src={generatedImageDataUrl}
              alt="Generated"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "8px" }}
            />
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
