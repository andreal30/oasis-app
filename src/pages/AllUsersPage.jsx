import { useEffect, useState } from "react";
import UserList from "../components/Users/UserList";
import { getAllUsers } from "../services/userService";
import MainTitle from "../components/Commons/Misc/MainTitle";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortOptions, setSortOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false); // Keep updated prop for external changes

  // Fetch users when the page is mounted or updated changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(); // Fetch all users
        const fetchedUsers = response.data || [];
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Reset filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [updated]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...users];

    // Apply filters
    if (filters.minAge || filters.maxAge) {
      filtered = filtered.filter((user) => {
        const age = user.age;
        const min = filters.minAge || 0;
        const max = filters.maxAge || Infinity;
        return age >= min && age <= max;
      });
    }

    if (filters.isAdmin !== undefined && filters.isAdmin !== null) {
      filtered = filtered.filter(
        (user) => user.isAdmin === (filters.isAdmin === "true")
      );
    }

    if (filters.minFlats || filters.maxFlats) {
      filtered = filtered.filter((user) => {
        const flatCount = user.flatCount || 0;
        const min = filters.minFlats || 0;
        const max = filters.maxFlats || Infinity;
        return flatCount >= min && flatCount <= max;
      });
    }

    // Apply sorting
    const { sortField, sortOrder } = sortOptions;
    if (sortField && sortOrder) {
      filtered.sort((a, b) => {
        const valA = sortField === "flatCount" ? a.flatCount : a[sortField];
        const valB = sortField === "flatCount" ? b.flatCount : b[sortField];

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [users, filters, sortOptions]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSortChange = (field, order) => {
    setSortOptions({
      sortField: field,
      sortOrder: order,
    });
  };

  const resetFunction = () => {
    setFilters({});
    setSortOptions({});
    setUpdated((prev) => !prev); // Trigger fetch
  };

  return (
    <>
      <MainTitle
        title='All Users'
        filterFunction={handleFilterChange}
        sortFunction={handleSortChange}
        resetFunction={resetFunction}
        showUser={true}
      />
      <UserList
        users={filteredUsers}
        setUsers={setUsers}
        setUpdated={setUpdated} // Keep setUpdated for dynamic updates
        loading={loading}
      />
    </>
  );
};

export default AllUsersPage;
