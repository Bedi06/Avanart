import React, { useState } from "react";
import { Grid } from "@mui/material";
import ImageGenerator from "./App/components/ImageGenerator";
import Header from "./App/components/Header";
import Form from "./App/components/Form";
import Footer from "./App/components/Footer";

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [generatedImageDataUrl, setGeneratedImageDataUrl] = useState<
    string | null
  >(null);

  const handleSubmit = (data: any, imageDataUrl: string) => {
    setFormData(data);
    setGeneratedImageDataUrl(imageDataUrl);
  };

  return (
    <div>
      <Header title="Avanart" />
      <div style={{ padding: "20px" }}>
        <Grid container spacing={2} sx={{ m: "2em" }}>
          <Grid item xs={6}>
            <Form
              onSubmit={handleSubmit}
              setSelectedRegion={setSelectedRegion}
              setSelectedRole={setSelectedRole}
              avatarImageDataUrl={generatedImageDataUrl}
            />
          </Grid>
          <Grid item xs={6}>
            {generatedImageDataUrl && (
              <ImageGenerator
                generatedImageDataUrl={generatedImageDataUrl}
                selectedRegion={selectedRegion}
                selectedRole={selectedRole}
              />
            )}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default App;
