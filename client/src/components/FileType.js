import { Image, Article, PictureAsPdf } from "@mui/icons-material";

export const FileType = ({ fileType }) => {
  if (fileType === "image/jpeg")
    return <Image style={{ marginRight: "20px" }} />;
  if (fileType === "application/pdf")
    return <PictureAsPdf style={{ marginRight: "20px" }} />;
  if (fileType === "text/xml")
    return <Article style={{ marginRight: "20px" }} />;
};
