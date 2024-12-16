import PropTypes from "prop-types";
import FilterFlats from "../FilterBy/FilterFlat";
import SortFlat from "../SortBy/SortFlat";
import FilterUser from "../FilterBy/FilterUser";
import SortUser from "../SortBy/SortUser";

const MainTitle = ({
  title,
  filterFunction = null, // Handles filtering for users or flats
  sortFunction = null, // Handles sorting for users or flats
  resetFunction = null, // Resets filters and sorting
  originalFlats = [], // Original list of flats (optional)
  setFlats = null, // Sets filtered flats (optional)
  showUser = false, // Determines if user-related options are shown
  showFlat = false, // Determines if flat-related options are shown
}) => {
  return (
    <div className='flex justify-content-between align-items-center mb-3'>
      <h1 className='font-normal'>{title}</h1>

      {showUser && (
        <div className='flex gap-3'>
          {/* Filter and Sort for Users */}
          <FilterUser
            onFilterChange={filterFunction}
            onClearFilters={resetFunction}
          />
          <SortUser onSortChange={sortFunction} onClearSort={resetFunction} />
        </div>
      )}

      {showFlat && (
        <div className='flex gap-3'>
          {/* Filter and Sort for Flats */}
          {originalFlats.length > 0 && setFlats ? (
            <>
              <FilterFlats
                onFilterChange={filterFunction}
                onClearFilters={resetFunction}
              />
              <SortFlat
                onSortChange={sortFunction}
                onClearSort={resetFunction}
              />
            </>
          ) : (
            <p className='text-500'>No flats available to filter or sort.</p>
          )}
        </div>
      )}
    </div>
  );
};

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  filterFunction: PropTypes.func, // Handles filtering logic
  sortFunction: PropTypes.func, // Handles sorting logic
  resetFunction: PropTypes.func, // Resets filters and sorting
  originalFlats: PropTypes.array, // Required for flats
  setFlats: PropTypes.func, // Sets filtered flats
  showUser: PropTypes.bool, // Determines if user filter/sort options are displayed
  showFlat: PropTypes.bool, // Determines if flat filter/sort options are displayed
};

export default MainTitle;
