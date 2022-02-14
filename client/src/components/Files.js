import { useEffect, useState } from "react";
import { api } from "../services";
import { useStyles } from "../styles";
import { Clear, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { FileType } from "./FileType";

export const Files = () => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ property: "date", order: "desc" });

  const listFiles = async () => {
    const {
      files: { page: responsePage, pages, files },
    } = await api.listFiles(page, sort);
    setFiles(files);
    setPages(pages);
    if (responsePage === 1) return;
    if (files.length !== 0) setPage(parseInt(responsePage));
    else setPage(parseInt(responsePage) - 1);
  };

  useEffect(() => {
    listFiles();
  }, [page, sort]);

  const handleRemove = async (id) => {
    const { status } = await api.removeFile(id);
    if (status !== 204) console.error("File deletion failed");
    else listFiles();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSort = (property) => {
    if (property === sort.property) {
      const result = {
        property: property,
        order: sort.order === "desc" ? "asc" : "desc",
      };
      setSort(result);
    } else setSort({ property, order: "asc" });
  };

  const Pagination = () => (
    <>
      {pages > 1 && (
        <div className={classes.pagination}>
          {page > 1 && (
            <button
              onClick={() => {
                handlePreviousPage();
              }}
            >
              Previous
            </button>
          )}
          {page < pages && (
            <button
              onClick={() => {
                handleNextPage();
              }}
            >
              Next
            </button>
          )}
          <span>{`Page ${page} of ${pages}`}</span>
        </div>
      )}
    </>
  );

  const TableHeader = ({ properties }) => (
    <header className={classes.tableHeader}>
      <div className={classes.tableCol}></div>
      {properties.map((property, index) => (
        <div
          className={classes.tableCol}
          onClick={() => {
            handleSort(property);
          }}
          key={`title-${index}`}
        >
          <span>{property.replace(/([A-Z])/g, " $1").trim()}</span>
          {sort.property === property &&
            (sort.order === "desc" ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            ))}
        </div>
      ))}
      <div className={classes.tableCol}></div>
    </header>
  );

  return (
    <section className={classes.table}>
      <TableHeader properties={["name", "description", "uploadedBy", "date"]} />
      <div className={classes.tableRows}>
        {files.length ? (
          files.map(
            (
              { _id, name, description, uploadedBy, date, type, path },
              index
            ) => (
              <div key={`file-${index}`} className={classes.tableRow}>
                <a
                  className={classes.tableBody}
                  href={`http://localhost:3001/api/files/download/${path.replace(
                    "uploads/",
                    ""
                  )}`}
                  download
                >
                  <div className={`${classes.tableCol} ${classes.tableIcon}`}>
                    <FileType fileType={type} />
                  </div>
                  <div className={classes.tableCol}>{name}</div>
                  <div className={classes.tableCol}>{description}</div>
                  <div className={classes.tableCol}>{uploadedBy}</div>
                  <div className={classes.tableCol}>
                    {formatDate(new Date(date))}
                  </div>
                </a>
                <div className={classes.tableClear}>
                  <Clear
                    onClick={() => {
                      handleRemove(_id);
                    }}
                  />
                </div>
              </div>
            )
          )
        ) : (
          <span>No files available</span>
        )}
      </div>
      <Pagination />
    </section>
  );
};
