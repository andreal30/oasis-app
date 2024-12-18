import { InputNumber } from "primereact/inputnumber";
import { OverlayPanel } from "primereact/overlaypanel";
import { SelectButton } from "primereact/selectbutton";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import MainButton from "../Buttons/MainButton";
import IconButton from "../Buttons/IconButton";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const FilterUser = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    minAge: null,
    maxAge: null,
    minFlats: null,
    maxFlats: null,
    isAdmin: null,
  });

  const op = useRef(null);

  const adminOptions = [
    { label: "All", value: null },
    { label: "Is Admin", value: "true" },
    { label: "Not Admin", value: "false" },
  ];

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent of filter changes
  };

  const clearFilters = () => {
    const clearedFilters = {
      minAge: null,
      maxAge: null,
      minFlats: null,
      maxFlats: null,
      isAdmin: null,
    };
    setFilters(clearedFilters);
    onClearFilters(); // Notify parent to clear filters
  };

  return (
    <div className='card flex justify-content-center'>
      <IconButton
        type='button'
        label=''
        iconClass='filter'
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op} style={{ width: "350px" }}>
        <h3>Filter Users</h3>
        <div className='grid gap-2'>
          {/* Age Range */}
          <p className='mb-1 font-semibold'>Age Range</p>
          <div className='flex gap-2'>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-calendar'> </InputIcon>
              <InputNumber
                value={filters.minAge}
                onValueChange={(e) => handleInputChange("minAge", e.value)}
                placeholder='Min Age'
                className='input-number left-3'
              />
            </IconField>

            <IconField iconPosition='left'>
              <InputIcon className='pi pi-calendar'> </InputIcon>
              <InputNumber
                value={filters.maxAge}
                onValueChange={(e) => handleInputChange("maxAge", e.value)}
                placeholder='Max Age'
                className='input-number left-3'
              />
            </IconField>
          </div>

          {/* Number of Flats */}
          <p className='mb-1 font-semibold'>Number of Flats</p>
          <div className='flex gap-2'>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-home'> </InputIcon>
              <InputNumber
                value={filters.minFlats}
                onValueChange={(e) => handleInputChange("minFlats", e.value)}
                placeholder='Min Flats'
                className='input-number left-3'
              />
            </IconField>

            <IconField iconPosition='left'>
              <InputIcon className='pi pi-home'> </InputIcon>
              <InputNumber
                value={filters.maxFlats}
                onValueChange={(e) => handleInputChange("maxFlats", e.value)}
                placeholder='Max Flats'
                className='input-number left-3'
              />
            </IconField>
          </div>

          {/* Admin Status */}
          <p className='mb-1 font-semibold'>Admin Status</p>
          <SelectButton
            value={filters.isAdmin}
            options={adminOptions}
            className='border-round-3xl'
            onChange={(e) => handleInputChange("isAdmin", e.value)}
          />

          <MainButton
            className='mt-2'
            label='Clear Filters'
            onClick={clearFilters}
          />
        </div>
      </OverlayPanel>
    </div>
  );
};

FilterUser.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FilterUser;
