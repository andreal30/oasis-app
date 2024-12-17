import { useEffect, useState } from "react";
import { getFlats } from "../services/flatService";
import MainTitle from "../components/Commons/Misc/MainTitle";
import FlatList from "../components/Flats/FlatList";

const HomePage = () => {
  const [flats, setFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const data = await getFlats();
        setFlats(data);
        setFilteredFlats(data);
      } catch (error) {
        console.error("Error fetching flats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlats();
  }, [updated]);

  const handleFilterChange = (filters) => {
    const filtered = flats.filter((flat) => {
      const {
        city,
        minPrice,
        maxPrice,
        minArea,
        maxArea,
        minRooms,
        maxRooms,
        minBathrooms,
        maxBathrooms,
      } = filters;

      return (
        (!city || flat.city.toLowerCase().includes(city.toLowerCase())) &&
        (!minPrice || flat.price >= minPrice) &&
        (!maxPrice || flat.price <= maxPrice) &&
        (!minArea || flat.area >= minArea) &&
        (!maxArea || flat.area <= maxArea) &&
        (!minRooms || flat.rooms >= minRooms) &&
        (!maxRooms || flat.rooms <= maxRooms) &&
        (!minBathrooms || flat.bathrooms >= minBathrooms) &&
        (!maxBathrooms || flat.bathrooms <= maxBathrooms)
      );
    });
    setFilteredFlats(filtered);
  };

  const handleSortChange = (field, order) => {
    const sorted = [...filteredFlats].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredFlats(sorted);
  };

  const resetFiltersAndSort = () => {
    setFilteredFlats(flats); // Reset to original flats
  };

  // if (loading) return <div>Loading flats...</div>;

  return (
    <>
      <MainTitle
        title='Available Flats'
        filterFunction={handleFilterChange}
        sortFunction={handleSortChange}
        resetFunction={resetFiltersAndSort}
        showFlat
      />
      <FlatList
        flats={filteredFlats}
        loading={loading}
        setUpdated={setUpdated}
      />
    </>
  );
};

export default HomePage;
