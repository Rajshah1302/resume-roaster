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

  const [invalidFormat, setInvalidFormat] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file.name.endsWith(".pdf")) {
      setInvalidFormat(true);
      return;
    }
  
    setInvalidFormat(false); 
  
    const formData = new FormData();
    formData.append("filepond", file);
  
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload Response:", response);
      setParsedText(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
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
                <br />
                <p>
                  Hey, stop being a Jerry and go like my latest LinkedIn post
                  about "Ricksume Roaster":{" "}
                  <a
                    href="https://shorturl.at/LNPK2"
                    target="_blank"
                    style={{ color: "red" }}
                  >
                    take a wild ride
                  </a>{" "}
                  Wubba lubba dub dub!
                </p>
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
                  If you agree to these terms and conditions, upload your
                  resume below. Get ready to be roasted, enlightened, and
                  ultimately, resume-revamped! Prepare yourself, 'cause this is
                  gonna be a ride! And relax, I'm not here to steal your data.
                  I'm Rick Sanchez, not some low-life hacker.
                </p>

                {invalidFormat ? (
  <p
    className="text-white"
    style={{
      width: "100%",
      height: "100%",
      padding: "8px 0px",
      color: "white",
    }}
  >
  Hey genius, this application only works if you upload a PDF file. I know file extensions might be a little too high-tech for you, but try to keep up.
  </p>
) : (
  <div
    style={{
      display: "none", // Or use display: "none" to completely hide it
    }}
  >
  </div>
)}

                
                <div className="m-0 text-white">
                  <label
                    className="custom-file-upload"
                    style={{ color: "white" }}
                  >
                    Upload PDF
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="https://github.com/Rajshah1302"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
            >
              <svg
                style={{
                  margin: "20px",
                  width: "32px",
                  height: "32px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/raj-shah-81b10024a"
              target="_blank"
              rel="noopener noreferrer"
              color="white"
            >
              <svg
                style={{
                  margin: "20px",
                  width: "32px",
                  height: "32px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
