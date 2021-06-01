import React, { useRef, useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from 'react-select';
import {
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
   FormGroup,
   CustomInput
 } from "reactstrap";
 import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


 import { regions } from "utils/common";

import getImage from "utils/images";
import { getItems, itemsFilterChange, clearItems } from "redux/actions/getItem";

// @ts-ignore
import colors from "assets/css/colors.scss";
const items = [
  {
    src: getImage("imgslider1"),
    altText: 'Slide 1',
    caption: 'traceability'
  },
  {
    src: getImage("imgslider2"),
    altText: 'Slide 2',
    caption: 'instantaneous'
  },
  {
    src: getImage("imgslider3"),
    altText: 'Slide 3',
    caption: 'security'
  }
];


const { theme,themeBr } = colors;


const Header = props => {

  // SLIDE
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const {
    selectedOption,
    dispatch,
    filters,
    location: { pathname }
  } = props;

  const { search = "" } = filters;
  const myInp = useRef(null);
  function loadData(searchValue) {
    dispatch(clearItems());
    dispatch(getItems());
  }
  const delayedQuery = useCallback(debounce(loadData, 300), []);

  const onRegionChange = selectedOption => {

    if(selectedOption!==null){
      dispatch(itemsFilterChange({ region: selectedOption.value, skip: 0 }));
    }else{
      dispatch(itemsFilterChange({ region: "", skip: 0 }));
    }
    
    dispatch(clearItems());
    dispatch(getItems());
  };
  const onSearch = event => {
    const {
      target: { value }
    } = event;
    dispatch(
      itemsFilterChange({ search: value, sort: "", order: "", skip: 0 })
    );

    delayedQuery(value);
  };
  const clearSearch = () => {
    dispatch(itemsFilterChange({ search: "", sort: "", order: "", skip: 0 }));
    loadData("");
  };

  const moveToHome = () => {
    props.history.push("/");
  };

// slide

const next = () => {
  if (animating) return;
  const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
  setActiveIndex(nextIndex);
}

const previous = () => {
  if (animating) return;
  const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
  setActiveIndex(nextIndex);
}

const goToIndex = (newIndex) => {
  if (animating) return;
  setActiveIndex(newIndex);
}

const options = regions.map(option => ({
  value: option,
  label: option,
}))

const slides = items.map((item) => {
  return (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <img src={item.src} alt={item.altText} />
      <CarouselCaption captionText="" captionHeader={item.caption} />
    </CarouselItem>
  );
});

  return (
    <>
    <div
      className="Header d-flex justify-content-between"
      style={{
        backgroundColor: theme,
        borderTop:"2px solid",
        borderColor:themeBr
      }}
    >
      <img
        src={getImage("logo")}
        alt="logo"
        onClick={moveToHome}
      />
      <div className="center" style={{background:themeBr}}>
      <Link className="nav-link" to={"/reclamation"} style={{color:theme}}>Reclamation</Link>
      </div>
    </div>
    {pathname === "/" ? (
      <>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    <section className="box_search_home">
    <div className="container">
      <div className="row">
      <div className="col-lg-2 col-md-2"></div>
        <div className="container_search_home col-lg-8 col-md-8">
        <div className="container_search_home_block">
          <div className="row">
          <div className="col-lg-6 col-md-6">
        <div className="search-wrapper left">
       
          <div
            className="search center"
            onClick={() => {
              myInp.current.focus();
            }}
          >
            <FaSearch className="Header_icon search_icon" />
            <input
            className="form-control"
              placeholder="Search by name medicament"
              onChange={onSearch}
              value={search}
              ref={myInp}
              style={{borderRadius: "0px 4px 4px 0px"}}
            />
            {search.length ? (
              <IoMdClose size={25} onClick={clearSearch} />
            ) : null}
          </div>
      </div>
      </div>
      <div className="col-lg-6 col-md-6">
      <FormGroup className="Home_filterBar_form">
        <Select
        value={selectedOption}
        isClearable
        onChange={onRegionChange}
        options={options}
      />
      </FormGroup>
      </div>
      </div>
      </div>
       </div> 
       </div>   
    </div>
</section>
</>
) : (
          void 0
        )}
    </>
  );
};
const mapStateToProps = state => {
  return {
    filters: state.itemsReducer.filters
  };
};

const HeaderWithRouter = withRouter(props => <Header {...props} />);
export default connect(mapStateToProps)(HeaderWithRouter);
