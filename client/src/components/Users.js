import { useState, useEffect } from "react";
import { useStyles } from "../styles";
import { api } from "../services";

export const Users = ({ setUser }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState();

  const listUsers = async () => {
    const { users } = await api.listUsers();
    setUsers(users);
  };

  useEffect(() => {
    listUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await api.createUser({ name: newUser });

    if (result.status === 201) {
      localStorage.setItem("user", newUser);
      setUser(newUser);
    } else console.error("Cannot access the server");
  };

  const handleSelect = ({ target: { value } }) => {
    localStorage.setItem("user", value);

    setUser(value);
  };
  return (
    <form onSubmit={handleSubmit} className={classes.uploadForm}>
      <label htmlFor="users">Select user</label>
      <select
        name="users"
        onChange={(e) => {
          handleSelect(e);
        }}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          Select a user
        </option>
        {users.map((user, index) => (
          <option value={user.name} key={`user-${index}`}>
            {user.name}
          </option>
        ))}
      </select>

      <label htmlFor="new">New user</label>
      <input
        type="text"
        name="new"
        placeholder="Enter name..."
        onChange={(event) => {
          setNewUser(event.target.value);
        }}
      />

      <button>Add user</button>
    </form>
  );
};
