//import { flatsApi } from '../services/flatsApi';
import PropTypes from "prop-types";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MessageForm from "../components/Messages/MessageForm";
import MessageList from "../components/Messages/MessageList";
// import FlatImg from './../images/apt-21.jpg';
import useAuth from "../hooks/useAuth";
import { Bathtub, Bed } from "@phosphor-icons/react";

const FlatDetailsPage = ({ flat }) => {
  const [userF, setUserF] = useState(null);
  const [loadingF, setLoadingF] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with your API call
        const response = await fetch(`/api/users/${flat.flatUser}`);
        const userData = await response.json();
        setUserF(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoadingF(false);
      }
    };
    fetchUser();
  }, [flat.flatUser]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(dateObj);
  };

  const formattedDate = flat.dateAvailable
    ? formatDate(flat.dateAvailable)
    : "N/A";

  if (loading || loadingF) {
    return (
      <div>
        <i className='pi pi-spin pi-spinner'></i> Loading...
      </div>
    );
  }

  return (
    <>
      <div>
        <img
          alt={`${flat.streetNumber} ${flat.streetName}`}
          src={flat.flatImage || "https://via.placeholder.com/150"}
          className='border-round-lg w-full'
        />
        <h2 className='text-primary  mb-0'>${flat.price}</h2>

        {/* place */}
        <div className='flex text-500 gap-2 text-sm mt-1'>
          <i className='pi pi-map-marker'></i>
          <p className='m-0'>
            {flat.streetNumber} {flat.streetName} | {flat.city}
          </p>
        </div>

        {/* owner */}
        {userF && (
          <div className='mt-4 flex gap-2 align-items-center'>
            <Avatar
              image={userF.profile}
              imageAlt={`${userF.firstName} ${userF.lastName}`}
              className='mr-2'
              size='large'
              shape='circle'
            />
            <div>
              <p className='text-600 m-0'>
                Listed by {userF.firstName} {userF.lastName}
              </p>
              <p className='text-600 m-0'>{userF.email}</p>
            </div>
          </div>
        )}

        {/* flat details */}
        <div className='flex w-full justify-content-between surface-100 border-round-lg mt-4 p-3 text-600 align-items-center '>
          <div className='flex gap-2 w-full'>
            <i className='pi pi-expand'></i>
            <p className='m-0'>{flat.areaSize} m²</p>
          </div>
          <div className='flex gap-2 w-full'>
            <Bed />
            <p className='m-0'>{flat.rooms} rooms</p>
          </div>
          <div className='flex gap-2 w-full'>
            <Bathtub />
            <p className='m-0'>{flat.bathrooms} baths</p>
          </div>
          <div className='flex gap-2 w-full'>
            <i className='pi pi-asterisk'></i>
            <p className='m-0'>{flat.hasAc ? "Has AC" : "No AC"}</p>
          </div>
        </div>
      </div>

      {/* flat details */}
      <div className='flex w-full justify-content-between surface-100 border-round-lg mt-2 p-3 text-600 align-items-center '>
        <div className='flex gap-2 w-full'>
          <i className='pi pi-building'></i>
          <p className='m-0'>
            Year Built:<strong> {flat.yearBuilt}</strong>
          </p>
        </div>
        <div className='flex gap-2 w-full'>
          <i className='pi pi-calendar'></i>
          <p className='m-0'>
            Available on: <span className='font-bold'>{formattedDate}</span>
          </p>
        </div>
      </div>
      {/* Messages list */}
      <MessageList
        flatId={flat.flatId}
        userEmail={user.email}
        isAdmin={user.isAdmin}
      />
      <MessageForm
        flatId={flat.flatId}
        userEmail={user.email}
        isAdmin={user.isAdmin}
      />
    </>
  );
};

FlatDetailsPage.propTypes = {
  flat: PropTypes.object,
};

export default FlatDetailsPage;
