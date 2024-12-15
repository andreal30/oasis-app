import { OverlayPanel } from "primereact/overlaypanel";
import PropTypes from "prop-types";
import IconButton from "../Buttons/IconButton";
import { useRef, useState } from "react";
import MainButton from "../Buttons/MainButton";

const SortUser = ({ onSortChange, onClearSort }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const op = useRef(null);

  const handleSort = (field, order) => {
    setSelectedField(field);
    setSortOrder(order);
    onSortChange(field, order);
  };

  const handleClearSort = () => {
    setSelectedField(null);
    setSortOrder(null);
    onClearSort();
  };
  const sortFields = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Flats", value: "flatCount" },
  ];

  // const handleSort = (field, order) => {
  //   const sortedItems = [...items].sort((a, b) => {
  //     const valA =
  //       field === "flatCount" ? a.flatCount : a[field]?.toLowerCase();
  //     const valB =
  //       field === "flatCount" ? b.flatCount : b[field]?.toLowerCase();

  //     if (valA < valB) return order === "asc" ? -1 : 1;
  //     if (valA > valB) return order === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   setItems(sortedItems);
  //   setSortOptions({ sortField: field, sortOrder: order });
  //   op.current?.hide();
  // };

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
                <IconButton
                  label='Asc'
                  iconClass='arrow-circle-up'
                  onClick={() => handleSort(field.value, "asc")}
                  className={`p-button-sm ${
                    selectedField === field.value && sortOrder === "asc"
                      ? "p-button-primary"
                      : ""
                  }`}
                />
                <IconButton
                  label='Desc'
                  iconClass='arrow-circle-down'
                  onClick={() => handleSort(field.value, "desc")}
                  className={`p-button-sm ${
                    selectedField === field.value && sortOrder === "desc"
                      ? "p-button-primary"
                      : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <MainButton
          label='Clear Filter'
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
