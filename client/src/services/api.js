const url = "http://localhost:3001/api";

const listItems = async (endpoint, page, sort) => {
  let fetchUrl = `${url}/${endpoint}`;

  if (page)
    fetchUrl = sort
      ? `${fetchUrl}/?page=${page}&sort=${sort.property}&order=${sort.order}`
      : `${fetchUrl}/?page=${page}`;

  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
    });

    const result = await response.json();

    return { [endpoint]: result, status: response.status };
  } catch (err) {
    return { [endpoint]: [], status: err };
  }
};

const createItem = async (endpoint, data) => {
  const params =
    endpoint === "files"
      ? {
          method: "POST",
          body: data,
        }
      : {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

  try {
    const response = await fetch(`${url}/${endpoint}`, params);
    const item = await response.json();

    return { [endpoint]: item, status: response.status };
  } catch (err) {
    return { [endpoint]: [], status: err };
  }
};

const removeItem = async (endpoint, id) => {
  try {
    const response = await fetch(`${url}/${endpoint}/${id}`, {
      method: "DELETE",
    });

    return { [endpoint]: {}, status: response.status };
  } catch (err) {
    return { [endpoint]: {}, status: err };
  }
};

const listFiles = (page, sort) => listItems("files", page, sort);
const createFile = (data) => createItem("files", data);
const removeFile = (id) => removeItem("files", id);

const listUsers = () => listItems("users");
const createUser = (user) => createItem("users", user);

export const api = { listFiles, createFile, removeFile, createUser, listUsers };
