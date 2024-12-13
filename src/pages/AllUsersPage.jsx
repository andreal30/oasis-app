import axios from "../utils/axios";

const AllUsersPage = () => {
  axios.get("/protected-route", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return <h1>All Users Page</h1>;
};

export default AllUsersPage;
