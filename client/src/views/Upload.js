import { useState } from "react";
import { useStyles } from "../styles";
import { api } from "../services";
import { useNavigate } from "react-router-dom";

export const Upload = ({ uploadedBy }) => {
  const navigate = useNavigate();

  const classes = useStyles();

  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    Object.entries({
      name,
      description,
      uploadedBy,
      date: new Date(),
      file,
    }).forEach((entry) => data.append(entry[0], entry[1]));

    const result = await api.createFile(data);

    if (result.status === 201) {
      navigate("/");
    } else alert("Can't upload the file");
  };

  const formatName = (name, type) => {
    if (type === "image/jpeg") return name.replace(/.jpg|.jpeg/gi, "");
    if (type === "application/pdf") return name.replace(".pdf", "");
    if (type === "text/xml") return name.replace(".xml", "");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.uploadForm}>
      <input
        type="file"
        accept="image/jpeg, .pdf, .xml"
        onChange={({ target: { files } }) => {
          const { name, type } = files[0];
          setName(formatName(name, type));
          setFile(files[0]);
        }}
      />

      <label htmlFor="name">Filename</label>
      <input
        type="text"
        name="name"
        placeholder="Specify a filename..."
        value={name}
        disabled={file ? false : true}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        placeholder="Add a description..."
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <label htmlFor="uploaded-by">Uploaded by</label>
      <input type="text" name="uploaded-by" value={uploadedBy} disabled />

      <button>Upload</button>
    </form>
  );
};
