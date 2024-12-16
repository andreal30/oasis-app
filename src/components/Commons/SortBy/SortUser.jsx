import PropTypes from "prop-types";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import IconButton from "../Buttons/IconButton";
import MainButton from "../Buttons/MainButton";

const SortUser = ({ onSortChange, onClearSort }) => {
  const op = useRef(null);
  const [selectedField, setSelectedField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortFields = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Age", value: "age" },
    { label: "Number of Flats", value: "flatCount" },
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
        label='Sort Users'
        iconClass='pi pi-sort-alt'
        onClick={(e) => op.current?.toggle(e)}
      />
      <OverlayPanel ref={op} style={{ width: "300px" }}>
        <p className='font-semibold'>Sort By</p>
        <div className='flex flex-column gap-2'>
          {sortFields.map((field) => (
            <div
              key={field.value}
              className='flex justify-content-between align-items-center mb-3'
            >
              <span>{field.label}</span>
              <div className='flex gap-2'>
                {selectedField === field.value && sortOrder === "asc" && (
                  <IconButton
                    label='Asc'
                    iconClass='arrow-circle-up text-700'
                    onClick={() => handleSort(field.value, "asc")}
                    className='bg-100'
                  />
                )}
                {selectedField === field.value && sortOrder === "desc" && (
                  <IconButton
                    label='Desc'
                    iconClass='arrow-circle-down text-700'
                    onClick={() => handleSort(field.value, "desc")}
                    className='bg-100'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <MainButton
          label='Clear Sort'
          className='w-full mt-2'
          onClick={handleClearSort}
          type='button'
        />
      </OverlayPanel>
    </div>
  );
};

SortUser.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  onClearSort: PropTypes.func.isRequired,
};

export default SortUser;
