import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AvatarList from "./components/AvatarList/index";
import AvatarEditor from "./components/AvatarEditor/index";
import Footer from "./components/Footer";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import ReactNiceAvatar, { genConfig } from "./config/index";
import Header from "./components/Header";
import "./index.scss";
import Form from "./components/Form";
import Arrow from "./components/Arrow";
import AboutUs from "./components/AboutUs";

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
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random())),
      }),
      shape: "circle",
      avatarId: "myAvatar",
      avatarImageDataUrl: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.captureAvatarImage = this.captureAvatarImage.bind(this);
  }

  selectConfig(config: { [key: string]: any }) {
    this.setState({ config });
  }

  updateConfig(key: string, value: any) {
    const { config } = this.state;
    config[key] = value;
    this.setState({ config });
  }

  updateShape(shape: AvatarShape) {
    this.setState({ shape });
  }

  async download() {
    const scale = 2;
    const node = document.getElementById(this.state.avatarId);

    if (!node) {
      console.error(
        "Element with ID",
        this.state.avatarId,
        "not found in the DOM."
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

      if (blob) {
        saveAs(blob, "avatar.png");
      } else {
        console.error("Blob is null or undefined.");
      }
    } catch (error) {
      console.error("Error generating image blob:", error);
    }
  }

  onInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      config: genConfig(e.currentTarget.value),
    });
  }

  async captureAvatarImage() {
    const node = document.getElementById(this.state.avatarId);
    if (node) {
      const dataUrl = await domtoimage.toPng(node);
      console.log(dataUrl);
      this.setState({ avatarImageDataUrl: dataUrl }, () => {
        console.log("State updated:", this.state.avatarImageDataUrl);
      });
    } else console.log("node is not exist");
  }

  handleFormSubmit(
    formData: { name: string; region: string; role: string },
    imageDataUrl: string
  ) {
    console.log("Form submitted", formData, imageDataUrl);
  }

  render() {
    const { config, shape, avatarImageDataUrl } = this.state;
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
                  <div id={this.state.avatarId} className="mb-10">
                    <ReactNiceAvatar
                      className="w-64 h-64 highres:w-80 highres:h-80"
                      hairColorRandom
                      shape={this.state.shape}
                      {...config}
                    />
                  </div>
                  <AvatarEditor
                    config={config}
                    shape={shape}
                    updateConfig={this.updateConfig.bind(this)}
                    updateShape={this.updateShape.bind(this)}
                    download={this.download.bind(this)}
                  />
                  <input
                    className="inputField w-64 h-10 p-2 rounded-full mt-10 text-center outline-none"
                    placeholder="input name or email ..."
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      this.onInputKeyUp(e)
                    }
                  />
                  <AvatarList selectConfig={this.selectConfig.bind(this)} />
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
