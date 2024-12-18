import PropTypes from "prop-types";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import IconButton from "../Buttons/IconButton";
import MainButton from "../Buttons/MainButton";

const SortFlat = ({ onSortChange, onClearSort }) => {
  const op = useRef(null);
  const [selectedField, setSelectedField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortFields = [
    { label: "City", value: "city" },
    { label: "Price", value: "price" },
    { label: "Area Size", value: "area" },
    { label: "Rooms", value: "rooms" },
    { label: "Bathrooms", value: "bathrooms" },
  ];

  const handleSort = (field, order) => {
    setSelectedField(field);
    setSortOrder(order);
    onSortChange(field, order); // Notify parent of sort changes
  };

  const handleClearSort = () => {
    setSelectedField(null);
    setSortOrder(null);
    onClearSort(); // Notify parent to clear sort
  };

  return (
    <div className='card flex justify-content-center'>
      <IconButton
        label='Sort Flats'
        iconClass='pi pi-sort-alt'
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op} style={{ width: "300px" }}>
        <p className='font-semibold'>Sort By</p>
        <div className='flex flex-column gap-2'>
          {sortFields.map((field) => (
            <div
              key={field.value}
              className='flex justify-content-between align-items-center'
            >
              <span>{field.label}</span>
              <div className='flex gap-2'>
                <div className='flex gap-2'>
                  <IconButton
                    label='Asc'
                    className='btn-sort'
                    iconClass={`arrow-circle-up text-main ${
                      selectedField === field.value && sortOrder === "asc"
                        ? "text-main-700"
                        : ""
                    }`}
                    onClick={() => handleSort(field.value, "asc")}
                    size='small'
                    outlined
                  />
                  <IconButton
                    label='Desc'
                    className='btn-sort'
                    iconClass={`arrow-circle-down text-main ${
                      selectedField === field.value && sortOrder === "desc"
                        ? "text-main-700"
                        : ""
                    }`}
                    onClick={() => handleSort(field.value, "desc")}
                    size='small'
                    outlined
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <MainButton
          label='Clear Sort'
          className='w-full mt-3'
          onClick={handleClearSort}
          type='button'
        />
      </OverlayPanel>
    </div>
  );
};

SortFlat.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onClearSort: PropTypes.func.isRequired,
};

export default SortFlat;
