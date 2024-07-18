import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import Groq from "groq-sdk";

export async function POST(req) {
  const formData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");
  let fileName = "";
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0]; // Correcting to use the first file
    console.log("Uploaded file:", uploadedFile);

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      await fs.writeFile(tempFilePath, fileBuffer);

      const parsedText = await parsePDF(tempFilePath);

      // Clean up the temporary file
      await fs.unlink(tempFilePath);

      if (parsedText) {
        try {
          const reviewResult = await classifyResume(parsedText, apiKey);
          console.log("Review Result:", reviewResult);

          const response = new NextResponse(reviewResult);
          response.headers.set("FileName", fileName);
          return response;
        } catch (error) {
          console.error("Error classifying resume:", error);
          return new NextResponse(
            JSON.stringify({ error: "Classification Error" }),
            { status: 500 }
          );
        }
      } else {
        return new NextResponse(JSON.stringify({ error: "Parsing Error" }), {
          status: 500,
        });
      }
    } else {
      console.log("Uploaded file is not in the expected format.");
      return new NextResponse(JSON.stringify({ error: "File Format Error" }), {
        status: 400,
      });
    }
  } else {
    console.log("No files found.");
    return new NextResponse(JSON.stringify({ error: "No Files Found" }), {
      status: 400,
    });
  }
}

function parsePDF(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);

    pdfParser.on("pdfParser_dataError", (errData) => {
      console.log(errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const parsedText = pdfParser.getRawTextContent();
      resolve(parsedText);
    });

    pdfParser.loadPDF(filePath);
  });
}

async function classifyResume(resumeText, apiKey) {
  try {
    const chatCompletion = await getGroqChatCompletion(resumeText, apiKey);
    const review = chatCompletion.choices[0]?.message?.content || "Unknown";
    return review;
  } catch (error) {
    console.error("Error reviewing resume:", error);
    return "Error";
  }
}

async function getGroqChatCompletion(resumeText, apiKey) {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `act as an extremely critical and harsh resume reviewer.Keep it crisp and to the point. Your task is to critique a resume with brutal honesty, focusing solely on highlighting every flaw and weakness in its content. Your review should be so tough and unfiltered that it leaves the recipient feeling daunted and challenged to improve. Use extremely harsh language. The goal is to provide a harsh reality check that compels serious reflection and improvement. Keep the critique of medium length and infuse it with Rick's signature sarcasm and bluntness.

Example of the tone and style to use:

"[name], listen up, because I'm about to be brutally honest. This resume is like a bad Bollywood movie: full of dramatic flair but lacking substance. You've got more achievements listed than a Kardashian Christmas card, but they're so generic they might as well be written in Comic Sans. 'Won a hackathon,' 'Developed an NFT marketplace,' 'Secured third place,' - we've heard it all before. And 'Youngest App Developer Award at the age of 13?' That's like bragging about being the shortest person at a midget convention. Your 'Skills' section reads like a tech jargon bingo card, and your 'Experience' is a list of projects that sound like they were coded in Notepad. Listen, you're a 'communication and computer engineer,' so communicate what makes you unique! Show, don't tell. Give me a resume that screams, 'Hire me, I'm a coding ninja!' Otherwise, you'll be stuck teaching data structures and algorithms to a class full of bored students, and believe me, that's a fate worse than a bad Bollywood movie." resume : ${resumeText}`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
