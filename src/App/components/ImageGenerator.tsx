import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";

interface ImageGeneratorProps {
  generatedImageDataUrl: string;
  selectedRegion: string;
  selectedRole: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  generatedImageDataUrl,
  selectedRegion,
  selectedRole,
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
              alt={`${selectedRole} in ${selectedRegion}`}
              style={{ maxWidth: "100%", height: "auto", marginBottom: "8px" }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "5px",
                left: "70px",
                zIndex: 1,
                color: "black",
                padding: "5px",
              }}
            >
              {selectedRegion}
            </p>
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
