// pages/index.js
"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import image from "../../public/Ricksume-Roaster.png";
import { parse } from "filepond";

export default function Home() {
  const [parsedText, setParsedText] = useState("");

  const handleBack = () => {
    setParsedText("");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("filepond", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Response:", response);
      // Assuming response.data contains the parsed text or relevant information
      setParsedText(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-animation">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div className="absolute-center">
          {/* <Image src={image} className="image-responsive m-0 p-0" /> */}
          <div
            className="m-8 text-green container glass-effect"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {parsedText ? (
              <p
                className="text-white"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0 16px",
                  color: "white",
                }}
              >
                <div className="center">
                  <h1 style={{ textAlign: "center", color: "red" }}>Verdict</h1>
                </div>
                {parsedText}
              </p>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0 16px",
                  color: "white",
                }}
              >
                <div className="center">
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    Warning: Ricksume Roaster Agreement
                  </h2>
                </div>
                <p>
                  Alright, listen up! This is a binding agreement between you,
                  the brave but <strong>oh-so-resume-challenged</strong>{" "}
                  adventurer, and me, Rick Sanchez, the{" "}
                  <strong>Roastmaster Extraordinaire</strong>. By submitting
                  your resume, you agree to the following terms and conditions:
                  <br />
                  <br />
                  <strong>1. Thou Shalt Not Whine</strong>: No crying, no
                  whining, no complaints. If you can't handle the heat, get out
                  of the multiverse!
                  <br />
                  <br />
                  <strong>2. No Clichés Shall Survive</strong>: If I see "team
                  player" or "hard worker," I'm gonna lose it. Be original, or
                  get outta here!
                  <br />
                  <br />
                  <strong>
                    3. Honesty is the Best Policy (Even if it Hurts)
                  </strong>
                  : I'm not here to sugarcoat. If your resume is bad, you're
                  gonna hear about it.
                  <br />
                  <br />
                  If you, agree to these terms and conditions, upload your
                  resume below. Get ready to be roasted, enlightened, and
                  ultimately, resume-revamped! Prepare yourself, 'cause this is
                  gonna be a ride! Also Relax, I'm not here to steal your data.
                  I'm Rick Sanchez, not some low-life hacker.
                </p>
                <div className="m-0 text-white">
                  <label
                    className="custom-file-upload"
                    style={{ color: "white" }}
                  >
                    Upload
                    <input
                      type="file"
                      className="bg-white"
                      onChange={handleFileUpload}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        visibility: "false",
                      }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          {parsedText ? (
            <div className="mt-20 text-white">
              <label
                className="custom-file-upload"
                style={{ color: "white" }}
                onClick={handleBack}
              >
                Back
              </label>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
