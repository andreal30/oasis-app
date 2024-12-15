import FilterUser from "../FilterBy/FilterUser";
import SortUser from "../SortBy/SortUser";
import PropTypes from "prop-types";

const MainTitle = ({ title, filterFunction, sortFunction, resetFunction }) => {
  return (
    <div className='flex justify-content-between align-items-center mb-3'>
      <h1 className='font-normal'>{title}</h1>
      <div className='flex gap-3'>
        <FilterUser
          onFilterChange={filterFunction}
          onClearFilters={resetFunction}
        />
        <SortUser onSortChange={sortFunction} onClearSort={resetFunction} />
      </div>
    </div>
  );
};

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  filterFunction: PropTypes.func.isRequired,
  sortFunction: PropTypes.func.isRequired,
  resetFunction: PropTypes.func.isRequired,
};

export default MainTitle;
