import React, { useState, useEffect } from "react";
import gapi from "gapi-client";
import GoogleLogin from "react-google-login";

const ListPdfBtn = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
      
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: "<YOUR_API_KEY>",
        clientId: "<YOUR_CLIENT_ID>",
        scope: "https://www.googleapis.com/auth/drive.readonly"
      });
    });
  }, []);

  const handleListPdfs = async () => {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log("User granted access to Google Drive");
      });
    } else {
      const response = await gapi.client.drive.files.list({
        q: "mimeType='application/pdf'"
      });
      setPdfFiles(response.result.files);
    }
  };

  return (
    <div>
      <button onClick={handleListPdfs}>List PDFs</button>
      {pdfFiles.length > 0 && (
        <ul>
          {pdfFiles.map(pdfFile => (
            <li key={pdfFile.id}>{pdfFile.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPdfBtn;
