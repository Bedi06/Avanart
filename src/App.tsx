import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ImageGenerator from "./components/ImageGenerator";
import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [formData, setFormData] = useState<any>(null);
  const [generatedImageDataUrl, setGeneratedImageDataUrl] = useState<
    string | null
  >(null);

  const handleSubmit = (data: any, imageDataUrl: string) => {
    setFormData(data);
    setGeneratedImageDataUrl(imageDataUrl);
  };

  const [testServer, setTestServer] = useState<any>("");
  useEffect(() => {
    fetch("http://localhost:5000/").then((response) =>
      response.json().then((data) => {
        setTestServer(data);
        console.log(data);
      })
    );
  }, []);

  return (
    <div>
      <Header title="Avanart" />
      <div style={{ padding: "20px" }}>
        <h1>{testServer}</h1>
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
      </div>
      <Footer />
    </div>
  );
};

export default App;
