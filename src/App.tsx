import React, { useState } from "react";
import ImageGenerator from "./components/ImageGenerator";
import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer";
import { Grid } from "@mui/material";
import Avatar, { genConfig } from "react-nice-avatar";
import AvatarList from "./components/AvatarList";

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);
  const [generatedImageDataUrl, setGeneratedImageDataUrl] = useState<
    string | null
  >(null);

  const handleSubmit = (data: any, imageDataUrl: string) => {
    setFormData(data);
    setGeneratedImageDataUrl(imageDataUrl);
  };

  const config = genConfig();

  return (
    <div>
      <Header title="Avanart" />
      <div style={{ padding: "20px" }}>
        <Grid container spacing={2} sx={{ m: "2em" }}>
          <Grid item xs={6}>
            <Form onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={6}>
            {generatedImageDataUrl && (
              <ImageGenerator generatedImageDataUrl={generatedImageDataUrl} />
            )}
          </Grid>
        </Grid>
        <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
        <AvatarList selectConfig={() => config} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
