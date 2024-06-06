import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import ReactNiceAvatar, { genConfig } from "./config/index";
import AvatarList from "./components/AvatarList";
import AvatarEditor from "./components/AvatarEditor";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Form from "./components/Form";
import Arrow from "./components/Arrow";
import AboutUs from "./components/AboutUs";
import "./index.scss";

interface AppState {
  config: { [key: string]: any };
  shape: AvatarShape;
  avatarId: string;
  avatarImageDataUrl: string | null;
}

type AvatarShape = "circle" | "rounded" | "square";

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      config: genConfig({ isGradient: Boolean(Math.round(Math.random())) }),
      shape: "circle",
      avatarId: "myAvatar",
      avatarImageDataUrl: null,
    };
  }

  // Select configuration for avatar
  selectConfig = (config: { [key: string]: any }) => {
    this.setState({ config });
  };

  // Update specific configuration key
  updateConfig = (key: string, value: any) => {
    this.setState((prevState) => ({
      config: { ...prevState.config, [key]: value },
    }));
  };

  // Update the shape of the avatar
  updateShape = (shape: AvatarShape) => {
    this.setState({ shape });
  };

  // Download avatar as image
  download = async () => {
    const scale = 2;
    const node = document.getElementById(this.state.avatarId);

    if (!node) {
      console.error(
        `Element with ID ${this.state.avatarId} not found in the DOM.`
      );
      return;
    }

    try {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0,
        },
        width: node.offsetWidth * scale,
      });

      if (blob) saveAs(blob, "avatar.png");
      else console.error("Blob is null or undefined.");
    } catch (error) {
      console.error("Error generating image blob:", error);
    }
  };

  // Handle input key up event to generate config
  onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.setState({ config: genConfig(e.currentTarget.value) });
  };

  // Capture avatar image as a data URL
  captureAvatarImage = async () => {
    const node = document.getElementById(this.state.avatarId);
    if (node) {
      try {
        const dataUrl = await domtoimage.toPng(node);
        this.setState({ avatarImageDataUrl: dataUrl });
        console.log("State updated:", dataUrl);
      } catch (error) {
        console.error("Error capturing avatar image:", error);
      }
    } else {
      console.log("Node does not exist");
    }
  };

  // Handle form submission
  handleFormSubmit = (
    formData: { name: string; region: string; role: string },
    imageDataUrl: string
  ) => {
    console.log("Form submitted", formData, imageDataUrl);
  };

  render() {
    const { config, shape, avatarImageDataUrl, avatarId } = this.state;

    return (
      <div className="App flex flex-col min-h-screen overflow-x-hidden">
        <Header title="AVANART" />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Routes>
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/"
              element={
                <>
                  <div id={avatarId} className="mb-10">
                    <ReactNiceAvatar
                      className="w-64 h-64 highres:w-80 highres:h-80"
                      hairColorRandom
                      shape={shape}
                      {...config}
                    />
                  </div>
                  <AvatarEditor
                    config={config}
                    shape={shape}
                    updateConfig={this.updateConfig}
                    updateShape={this.updateShape}
                    download={this.download}
                  />
                  <input
                    className="inputField w-64 h-10 p-2 rounded-full mt-10 text-center outline-none"
                    placeholder="input name or email ..."
                    onKeyUp={this.onInputKeyUp}
                  />
                  <AvatarList selectConfig={this.selectConfig} />
                  <button onClick={this.captureAvatarImage} className="mt-4">
                    Capture Avatar Image
                  </button>
                  <div className="absolute top-2/3 right-0">
                    <Arrow
                      fillColor="red"
                      onCaptureAvatar={this.captureAvatarImage}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/form"
              element={
                <Form
                  onSubmit={this.handleFormSubmit}
                  setSelectedRegion={() => {}}
                  setSelectedRole={() => {}}
                  avatarImageDataUrl={avatarImageDataUrl}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
