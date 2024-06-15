import React, { useState } from "react";
import { checkRegex, fileNamePattern } from "@/regex";
interface AddFileFormProps {
  addFile: (fileName: string) => void;
}

const AddFileForm: React.FC<AddFileFormProps> = ({ addFile }) => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!checkRegex(fileNamePattern, fileName)) {
      setError("File name must be in the format 'name.extension' and the extension must be js, css, or html.");
      return;
    }

    addFile(fileName);
    setFileName("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du fichier :</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">New File</button>
    </form>
  );
};

export default AddFileForm;