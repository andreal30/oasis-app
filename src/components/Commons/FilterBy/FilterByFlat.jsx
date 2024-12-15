import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';

const FilterByFlats = ({ setFilteredFlats, originalFlats }) => {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minArea, setMinArea] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const [minRooms, setMinRooms] = useState(null);
  const [maxRooms, setMaxRooms] = useState(null);
  const [minBathrooms, setMinBathrooms] = useState(null);
  const [maxBathrooms, setMaxBathrooms] = useState(null);
  // Removed isPanelOpen state as it is not used
  const [city, setCity] = useState('');
  const op = useRef(null);
  const handleCityValueChange = (e) => {
    setCity(e.target.value);
  };

  const handleMinValueChange = (e) => {
    setMinPrice(e.value !== undefined ? e.value : null);
  };

  const handleMaxValueChange = (e) => {
    setMaxPrice(e.value !== undefined ? e.value : null);
  };

  const handleFilter = () => {
    const filtered = originalFlats.filter((flat) => {
      const matchesCity = !city || flat.city.toLowerCase().includes(city.toLowerCase());
      const matchesPrice = (!minPrice || flat.price >= minPrice) && (!maxPrice || flat.price <= maxPrice);
      const matchesArea = (!minArea || flat.area >= minArea) && (!maxArea || flat.area <= maxArea);
      const matchesRooms = (!minRooms || flat.rooms >= minRooms) && (!maxRooms || flat.rooms <= maxRooms);
      const matchesBathrooms = (!minBathrooms || flat.bathrooms >= minBathrooms) && (!maxBathrooms || flat.bathrooms <= maxBathrooms);

      return matchesCity && matchesPrice && matchesArea && matchesRooms && matchesBathrooms;
    });

    setFilteredFlats(filtered);
    op.current.hide();
  };

  return (
    <div>
      <Button label="Filter" onClick={(e) => op.current.toggle(e)} />
      <OverlayPanel ref={op} dismissable>
        <div className="grid gap-2">
          <InputText placeholder="City" value={city} onChange={handleCityValueChange} />
          <InputNumber placeholder="Min Price" value={minPrice} onValueChange={handleMinValueChange} />
          <InputNumber placeholder="Max Price" value={maxPrice} onValueChange={handleMaxValueChange} />
          <InputNumber placeholder="Min Area" value={minArea} onChange={(e) => setMinArea(e.value)} />
          <InputNumber placeholder="Max Area" value={maxArea} onChange={(e) => setMaxArea(e.value)} />
          <InputNumber placeholder="Min Rooms" value={minRooms} onChange={(e) => setMinRooms(e.value)} />
          <InputNumber placeholder="Max Rooms" value={maxRooms} onChange={(e) => setMaxRooms(e.value)} />
          <InputNumber placeholder="Min Bathrooms" value={minBathrooms} onChange={(e) => setMinBathrooms(e.value)} />
          <InputNumber placeholder="Max Bathrooms" value={maxBathrooms} onChange={(e) => setMaxBathrooms(e.value)} />
          <Button label="Apply Filter" onClick={handleFilter} />
        </div>
      </OverlayPanel>
    </div>
  );
};

import PropTypes from 'prop-types';

// ... existing code ...

FilterByFlats.propTypes = {
  setFilteredFlats: PropTypes.func.isRequired,
  originalFlats: PropTypes.array.isRequired,
};

export default FilterByFlats;