import FlatForm from "../components/Flats/FlatForm";
//import NewFlatImg from './../images/new-flat-img.png';
// import { Image } from "primereact/image";

const NewFlatPage = () => {
  return (
    <>
      <div className='w-full h-full flex gap-0 bg-200 justify-content-center align-items-center'>
        {/* <div className='w-6 hidden md:block'>
          <Image
            id='newFlatImg'
            className='w-full h-full'
            // src={NewFlatImg}
            alt='New Flat Background'
          />
        </div> */}
        <div className='w-full md:w-75 p-5 border-round-3xl bg-white'>
          <h1 className='font-normal'>Create New Flat</h1>
          <FlatForm
            onClose={null}
            setUpdated={() => console.log("Flat created!")}
          />
        </div>
      </div>
    </>
  );
};

export default NewFlatPage;
