import React, { useState } from "react";
import { TextField, Button, Grid, Card } from "@mui/material";

interface FormProps {
  onSubmit: (formData: FormData, imageDataUrl: string) => void;
  avatarImageDataUrl: string | null; // Add this prop
}

interface FormData {
  name: string;
  region: string;
  role: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, avatarImageDataUrl }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    region: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate image
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.font = "20px Arial";
      ctx.fillText(`Name: ${formData.name}`, 10, 30);
      ctx.fillText(`Region: ${formData.region}`, 10, 60);
      ctx.fillText(`Role: ${formData.role}`, 10, 90);
      const dataUrl = canvas.toDataURL("image/png");
      onSubmit(formData, dataUrl);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: "100%", maxWidth: "100%", height: 500, padding: "2em" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
  sx={{ m: 1, width: "25ch" }}
  id="region"
  name="region"
  label="Region"
  variant="outlined"
  value={formData.region}
  onChange={handleChange}
/>
</Grid>
<Grid item xs={12}>
<TextField
  sx={{ m: 1, width: "25ch" }}
  id="role"
  name="role"
  label="Role"
  variant="outlined"
  value={formData.role}
  onChange={handleChange}
/>
</Grid>
<Grid item xs={12}>
<Button
  type="submit"
  variant="contained"
  color="primary"
  sx={{ mr: 1 }}
>
  Submit
</Button>
</Grid>
</Grid>
</Card>
</form>
</Grid>
</Grid>
);
};
export default Form;
