import React from "react";
// import { FaFilter } from "react-icons/fa";

import { connect } from "react-redux";

import { getItems, itemsFilterChange, clearItems } from "redux/actions/getItem";
import { regions } from "utils/common";
// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

function FilterBar(props) {
const {  dispatch } = props;
// const { filters, dispatch } = props;
 {/* const onSortChange = order => {
    dispatch(itemsFilterChange({ sort: "price", order, skip: 0 }));
    dispatch(clearItems());
    dispatch(getItems());
  };
*/}

  
  return (
    <div
      
     
    >
      {/* <Button color="success" className="predict-btn" onClick={onClickPredict}>
        Predict Result
      </Button> */}
     
    {/*   <UncontrolledDropdown>
        <DropdownToggle tag="a" className="nav-link">
          <div className="sort btn center">
            <div className="description">Sort</div>
            <FaFilter size={20} />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            active={filters.order === "asc" ? true : false}
            onClick={onSortChange.bind(this, "asc")}
          >
            Sort by price asc
          </DropdownItem>
          <DropdownItem
            active={filters.order === "desc" ? true : false}
            onClick={onSortChange.bind(this, "desc")}
          >
            Sort by price desc
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      */}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    filters: state.itemsReducer.filters
  };
};
export default connect(mapStateToProps)(FilterBar);
