import { useEffect, useState } from "react";
import UserList from "../components/Users/UserList";
import { getAllUsers } from "../services/userService";
import MainTitle from "../components/Commons/Misc/MainTitle";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updated, setUpdated] = useState(false); // Keep updated for external changes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        const fetchedUsers = response.data || [];
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [updated]);

  const handleFilterChange = (filters) => {
    const filtered = users.filter((user) => {
      const { minAge, maxAge, minFlats, maxFlats, isAdmin } = filters;

      return (
        (!minAge || user.age >= minAge) &&
        (!maxAge || user.age <= maxAge) &&
        (!minFlats || user.flatCount >= minFlats) &&
        (!maxFlats || user.flatCount <= maxFlats) &&
        (isAdmin === null || user.isAdmin === (isAdmin === "true"))
      );
    });

    setFilteredUsers(filtered);
  };

  const handleSortChange = (field, order) => {
    const sorted = [...filteredUsers].sort((a, b) => {
      const valA = field === "flatCount" ? a.flatCount : a[field];
      const valB = field === "flatCount" ? b.flatCount : b[field];

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0; // Equal values
    });

    setFilteredUsers(sorted);
  };

  const resetFilters = () => {
    setFilteredUsers(users); // Reset to original users
  };

  return (
    <>
      <MainTitle
        title='All Users'
        filterFunction={handleFilterChange}
        sortFunction={handleSortChange}
        resetFunction={resetFilters}
        showUser
      />
      <UserList
        users={filteredUsers}
        setUsers={setUsers}
        setUpdated={setUpdated}
        loading={loading}
      />
    </>
  );
};

export default AllUsersPage;
