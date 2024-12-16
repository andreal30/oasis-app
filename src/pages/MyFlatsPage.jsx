import { useState, useEffect } from "react";
import FlatList from "../components/Flats/FlatList";
import MainTitle from "../components/Commons/Misc/MainTitle";
import useAuth from "../hooks/useAuth";
import { getFlats, deleteFlat } from "../services/flatService";

const MyFlatsPage = () => {
  const { user } = useAuth();
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyFlats = async () => {
      try {
        const allFlats = await getFlats({ ownerId: user._id });
        setFlats(allFlats);
      } catch (error) {
        console.error("Error fetching user flats:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyFlats();
  }, [user]);

  const handleDelete = async (flatId) => {
    try {
      await deleteFlat(flatId);
      setFlats((prevFlats) =>
        prevFlats.filter((flat) => flat.flatId !== flatId)
      );
    } catch (error) {
      console.error("Error deleting flat:", error);
    }
  };

  if (loading) return <div>Loading your flats...</div>;

  return (
    <div>
      <MainTitle title='My Flats' />
      {flats.length ? (
        <FlatList flats={flats} onFlatDeleted={handleDelete} />
      ) : (
        <div>No flats available. Add one to get started!</div>
      )}
    </div>
  );
};

export default MyFlatsPage;
