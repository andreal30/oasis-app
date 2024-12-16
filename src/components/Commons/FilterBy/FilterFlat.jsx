import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import MainButton from "../Buttons/MainButton";
import IconButton from "../Buttons/IconButton";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Bed } from "@phosphor-icons/react";

const FilterFlats = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    city: "",
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    minRooms: null,
    maxRooms: null,
    minBathrooms: null,
    maxBathrooms: null,
  });
  const op = useRef(null);

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent
  };

  const clearFilters = () => {
    const clearedFilters = {
      city: "",
      minPrice: null,
      maxPrice: null,
      minArea: null,
      maxArea: null,
      minRooms: null,
      maxRooms: null,
      minBathrooms: null,
      maxBathrooms: null,
    };
    setFilters(clearedFilters);
    onClearFilters(); // Notify parent
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
        <h3>Filter Flats</h3>
        <div className='grid gap-2'>
          {/* City Filter */}
          <p className='mb-1 font-semibold'>City</p>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-map-marker' />
            <InputText
              value={filters.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder='City'
              className='input-main'
            />
          </IconField>

          {/* Price Range */}
          <p className='mb-1 font-semibold'>Price Range</p>
          <div className='flex gap-2'>
            <IconField iconPosition='left' className='w-full'>
              <InputIcon className='pi pi-dollar' />
              <InputNumber
                value={filters.minPrice}
                onValueChange={(e) => handleInputChange("minPrice", e.value)}
                placeholder='Min Price'
                className='input-number left-3'
              />
            </IconField>

            <IconField iconPosition='left' className='w-full'>
              <InputIcon className='pi pi-dollar' />
              <i className='pi pi-dollar'></i>
              <InputNumber
                value={filters.maxPrice}
                onValueChange={(e) => handleInputChange("maxPrice", e.value)}
                placeholder='Max Price'
                className='input-number left-3'
              />
            </IconField>
          </div>

          {/* Area Range */}
          <p className='mb-1 font-semibold'>Area Range (m²)</p>
          <div className='flex gap-2'>
            <IconField iconPosition='left' className='w-full'>
              <InputIcon className='pi pi-ruler-horizontal' />
              <InputNumber
                value={filters.minArea}
                onValueChange={(e) => handleInputChange("minArea", e.value)}
                placeholder='Min Area'
                className='input-number left-3'
              />
            </IconField>

            <IconField iconPosition='left' className='w-full'>
              <InputIcon className='pi pi-ruler-horizontal' />

              <InputNumber
                value={filters.maxArea}
                onValueChange={(e) => handleInputChange("maxArea", e.value)}
                placeholder='Max Area'
                className='input-number left-3'
              />
            </IconField>
          </div>

          {/* Rooms Range */}
          <p className='mb-1 font-semibold'>Rooms</p>
          <div className='flex gap-2'>
            <div className='input-group w-full'>
              <span className='p-input-icon-left'>
                {/* cambiar phosphor icons */}
                <Bed />
                <InputNumber
                  value={filters.minRooms}
                  onValueChange={(e) => handleInputChange("minRooms", e.value)}
                  placeholder={`Min Rooms`}
                  className='input-number left-3'
                />
              </span>
            </div>

            <div className='input-group w-full'>
              <span className='p-input-icon-left'>
                {/* cambiar phosphor icons */}
                <Bed />
                <InputNumber
                  value={filters.maxRooms}
                  onValueChange={(e) => handleInputChange("maxRooms", e.value)}
                  placeholder={`Maxn Rooms`}
                  className='input-number left-3'
                />
              </span>
            </div>
          </div>

          {/* Rooms Range */}
          <p className='mb-1 font-semibold'>Bathrooms</p>
          <div className='flex gap-2'>
            <div className='input-group w-full'>
              <span className='p-input-icon-left'>
                {/* cambiar phosphor icons */}
                <Bed />
                <InputNumber
                  value={filters.minBathrooms}
                  onValueChange={(e) =>
                    handleInputChange("minBathrooms", e.value)
                  }
                  placeholder={`Min Bathrooms`}
                  className='input-number left-3'
                />
              </span>
            </div>

            <div className='input-group w-full'>
              <span className='p-input-icon-left'>
                {/* cambiar phosphor icons */}
                <Bed />
                <InputNumber
                  value={filters.maxBathrooms}
                  onValueChange={(e) =>
                    handleInputChange("maxBathrooms", e.value)
                  }
                  placeholder={`Maxn Bathrooms`}
                  className='input-number left-3'
                />
              </span>
            </div>
          </div>

          {/* Rooms and Bathrooms */}
          {/* {[
            {
              label: "Rooms",
              key: "Rooms",
              minKey: "minRooms",
              maxKey: "maxRooms",
            },
            {
              label: "Bathrooms",
              key: "Bathrooms",
              minKey: "minBathrooms",
              maxKey: "maxBathrooms",
            },
          ].map(({ label, minKey, maxKey }) => (
            <div key={label}>
              <p className='mb-1 font-semibold'>{label}</p>
              <div className='flex gap-2'>
                <div className='input-group w-full'>
                  <span className='p-input-icon-left'>
                    <i className='pi pi-building'></i>
                    <InputNumber
                      value={filters[minKey]}
                      onValueChange={(e) => handleInputChange(minKey, e.value)}
                      placeholder={`Min ${label}`}
                      className='input-number left-3'
                    />
                  </span>
                </div>
                <div className='input-group w-full'>
                  <span className='p-input-icon-left'>
                    <i className='pi pi-building'></i>
                    <InputNumber
                      value={filters[maxKey]}
                      onValueChange={(e) => handleInputChange(maxKey, e.value)}
                      placeholder={`Max ${label}`}
                      className='input-number left-3'
                    />
                  </span>
                </div>
              </div>
            </div>
          ))} */}

          <MainButton label='Clear Filters' onClick={clearFilters} />
        </div>
      </OverlayPanel>
    </div>
  );
};

FilterFlats.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default FilterFlats;
