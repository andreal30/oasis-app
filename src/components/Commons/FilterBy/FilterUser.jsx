import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import MainButton from "../Buttons/MainButton";
import IconButton from "../Buttons/IconButton";

const FilterUser = ({ onFilterChange, onClearFilters }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [minFlats, setMinFlats] = useState(null);
  const [maxFlats, setMaxFlats] = useState(null);
  const op = useRef(null);

  const adminOptions = [
    { label: "All", value: null },
    { label: "Is Admin", value: "true" },
    { label: "Not Admin", value: "false" },
  ];

  // Update filters dynamically
  const handleFilterChange = (field, value) => {
    onFilterChange(field, value); // Call parent’s filter function
  };

  const handleClearFilters = () => {
    setMinAge(null);
    setMaxAge(null);
    setMinFlats(null);
    setMaxFlats(null);
    setIsAdmin(null);
    onClearFilters(); // Reset filters in parent
  };

  // const handleClearFilters = () => {
  //   setAdminFilter("All");
  //   setMinAge(null);
  //   setMaxAge(null);
  //   setMinFlats(null);
  //   setMaxFlats(null);
  //   setFilters({});
  // };

  // useEffect(() => {
  //   const filters = {
  //     minAge,
  //     maxAge,
  //     minFlats,
  //     maxFlats,
  //     isAdmin:
  //       adminFilter === "All"
  //         ? undefined
  //         : adminFilter === "Is Admin"
  //         ? true
  //         : false,
  //   };

  //   setFilters(filters);
  // }, [minAge, maxAge, minFlats, maxFlats, adminFilter, setFilters]);

  return (
    <div className='card flex justify-content-center'>
      <IconButton
        type='button'
        label='Toggle Filter Panel'
        iconClass='filter'
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op} style={{ width: "350px" }}>
        <h3>Filter Users</h3>
        {/* Age Filters */}
        <p className='mb-1 font-semibold'>Age Range</p>
        <div className='flex justify-content-between gap-2 w-full'>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-user' />
            <InputNumber
              value={minAge}
              onValueChange={(e) => {
                setMinAge(e.value);
                handleFilterChange("minAge", e.value);
              }}
              className='w-full left-3 input-number'
              placeholder='Min Age'
            />
          </IconField>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-user' />
            <InputNumber
              value={maxAge}
              onValueChange={(e) => {
                setMaxAge(e.value);
                handleFilterChange("maxAge", e.value);
              }}
              className='w-full left-3 input-number'
              placeholder='Max Age'
            />
          </IconField>
        </div>

        {/* Flats Filters */}
        <p className='mb-1 font-semibold'>Number of Flats</p>
        <div className='flex justify-content-between gap-2 w-full'>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-hashtag' />
            <InputNumber
              value={minFlats}
              onValueChange={(e) => {
                setMinFlats(e.value);
                handleFilterChange("minFlats", e.value);
              }}
              className='w-full left-3 input-number'
              placeholder='Min Flats'
            />
          </IconField>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-hashtag' />
            <InputNumber
              value={maxFlats}
              onValueChange={(e) => {
                setMaxFlats(e.value);
                handleFilterChange("maxFlats", e.value);
              }}
              className='w-full left-3 input-number'
              placeholder='Max Flats'
            />
          </IconField>
        </div>

        {/* Admin Filter */}
        <p className='mb-1 font-semibold'>User Type</p>
        <SelectButton
          value={isAdmin}
          options={adminOptions}
          onChange={(e) => {
            setIsAdmin(e.value);
            handleFilterChange("isAdmin", e.value);
          }}
        />

        <MainButton
          label='Clear Filter'
          className='w-full mt-2'
          onClick={handleClearFilters}
          type='button'
        />
      </OverlayPanel>
    </div>
  );
};

FilterUser.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FilterUser;
