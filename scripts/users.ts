import axios from "axios";

const users = [{ username: "Kyle" }, { username: "Francis" }];

const createUsers = async () => {
  for (const user of users) {
    const res = await axios.post("http://127.0.0.1:8000/users", user);
    console.log("Created user:", res.data);
  }
};

createUsers();
