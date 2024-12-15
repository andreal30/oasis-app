import { Avatar } from "primereact/avatar";
import useAuthContext from "../hooks/useAuth";
import { formatDateInWords } from "../utils/date";
import MainButton from "../components/Commons/Buttons/MainButton";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleProfileUpdate = () => {
    navigate("/update-profile");
  };

  const handlePasswordUpdate = () => {
    navigate("/update-password");
  };
  return (
    <>
      <div className='surface-0'>
        <div className='flex gap-3 align-items-center'>
          <Avatar
            image={user.profileImage}
            className='mr-2'
            size='xlarge'
            shape='circle'
          />
          <div className='flex-grow-1 '>
            <h1 className='font-medium text-3xl text-900 mb-3'>
              {user.firstName}&apos;s Profile
            </h1>
            {/* <div className='text-500 mb-5'>
              Morbi tristique blandit turpis. In viverra ligula id nulla
              hendrerit rutrum.
            </div> */}
          </div>
          <MainButton
            label='Edit Profile'
            className=' '
            onClick={handleProfileUpdate}
          />
          <MainButton
            label='Edit Password'
            className=' btn-secondary'
            onClick={handlePasswordUpdate}
          />
        </div>
        <ul className='list-none p-0 m-0'>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Name</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              {user.firstName} {user.lastName}
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Email</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              {user.email}
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Username</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              {user.username}
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Date of Birth</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              {formatDateInWords(user.birthDate)}
            </div>
          </li>
          <li className='flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap'>
            <div className='text-500 w-6 md:w-2 font-medium'>Is Admin</div>
            <div className='text-900 w-full md:w-8 md:flex-order-0 flex-order-1'>
              {user.isAdmin ? "Yes" : "No"}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfilePage;
