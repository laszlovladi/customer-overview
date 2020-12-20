import React, { useState, useEffect } from 'react';
import './App.scss';
import Table from './Table';
import AddRowPopup from './AddRowPopup';

function App() {
  let data = [
    {
      id: 1,
      logo: "./img/specsaver.png",
      name: "Specsavers Denmark",
      com_id: 13950,
      leg_id: 4567,
      size: 1200,
      status: "active",
    },
    {
      id: 2,
      logo: "./img/yunar.png",
      name: "Yunar",
      com_id: 13955,
      leg_id: 3254,
      size: 225,
      status: "active",
    },
    {
      id: 3,
      logo: "./img/coca.png",
      name: "Coca-Cola",
      com_id: 13520,
      leg_id: 5487,
      size: 119,
      status: "active",
    },
    {
      id: 4,
      logo: "./img/hh.png",
      name: "Helly Hansen",
      com_id: 13987,
      leg_id: 1236,
      size: 87,
      status: "active",
    },
    {
      id: 5,
      logo: "./img/brand.png",
      name: "Brand Enterprise",
      com_id: 13654,
      leg_id: 3154,
      size: 68,
      status: "active",
    },
    {
      id: 6,
      logo: "./img/mb-small.png",
      name: "Mercedes-Benz Europe",
      com_id: 12987,
      leg_id: 3187,
      size: 40,
      status: "active",
    },
    {
      id: 7,
      logo: "./img/bmw.png",
      name: "BMW Nordic",
      com_id: 12282,
      leg_id: 3648,
      size: 26,
      status: "active",
    },
  ];

  const [tableData, setTableData] = useState(data);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);
  const [sortBy, setSortBy] = useState(null);
  const [sortIsAsc, setSortIsAsc] = useState(true);
  const [addRowPopupIsOn, setAddRowPopupIsOn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    com_id: "",
    leg_id: "",
    size: "",
    status: "active"
  })

  const handleButtonClick = (e) => {
    e.target.nextSibling.classList.toggle("opened");
  }

  const handleMenuItemClick = (e) => {
    e.target.classList.toggle("ticked");
  }

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    const regex = new RegExp(search, 'i')
    let res = tableData.filter((row) => row.name.match(regex) || row.com_id.toString().match(regex) || row.leg_id.toString().match(regex));
    res.sort((a, b) => {
      return ((a[sortBy] < b[sortBy]) ? -1 : ((a[sortBy] > b[sortBy]) ? 1 : 0));
    });  
    res = !sortIsAsc ? res.reverse() : res;
    setFilteredData(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy, sortIsAsc]);

  useEffect(() => {

  }, [formData])

  const sortItems = (e, field) => {
    if(sortBy === field){ 
      setSortIsAsc(prevState => !prevState);
    }else{
      setSortBy(field);
      setSortIsAsc(true);
    }
  }

  const toggleAddRowPopup = () => {
    setAddRowPopupIsOn(prevState => !prevState)
  }

  const handleFormChange = (e, fieldName) => {
    const elems = document.querySelectorAll('.error');
    if (elems.length > 0) {
      elems.forEach(elem => elem.classList.remove('error'));
    }
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [fieldName]: e.target.value
      }
      return newState;
    })
  }

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if(value === ""){
        const elem = document.querySelector(`#form-${key}`);
        if(elem) elem.classList.add('error');
        return false;
      }
    }
    return true;
  }

  const addNewRow = (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    tableData.push(formData);
    setTableData(tableData);
    toggleAddRowPopup();
  }

  useEffect(() => {
    setFilteredData(tableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, tableData)

  return (
    <div className="App">
      <div className="header">Site Admin</div>
      <div className="navbar">
        <div className="nav-header">site admin</div>
        <div className="nav-item nav-item__active">
          <img src="./img/online.png" className="nav-item-img" alt="customer overview" sizes="16" srcSet=""/>
          <div className="nav-item-text">Customer Overview</div>
        </div>
        <div className="nav-item">
          <img src="./img/list-dot.png" className="nav-item-img" alt="reports" sizes="16" srcSet=""/>
          <div className="nav-item-text">Reports</div>
        </div>
        <div className="nav-item">
          <img src="./img/file-add.png" className="nav-item-img" alt="file transcodings" sizes="16" srcSet=""/>
          <div className="nav-item-text">File Transcodings</div>
        </div>
        <div className="nav-item">
          <img src="./img/notification.png" className="nav-item-img" alt="notification center" sizes="16" 
            srcSet="img/notification@2x.png 2x, img/notification@3x.png 3x"/>
          <div className="nav-item-text">Notification Center</div>
        </div>
      </div>
      <div className="main">
        <h1 className="main-header">Customer Overview</h1>
        <div className="search-add">
          <input type="search" className="search-field" name="" id="" placeholder="Customer or ID"
            value={search} onChange={(e) => handleOnChange(e)}/>
          <button className="add-button" title="Add row" onClick={() => toggleAddRowPopup()}>
            <img src="./img/plus.png" alt="add"/>
          </button>
        </div>
        <Table 
          filteredData={filteredData}
          handleButtonClick={handleButtonClick}
          handleMenuItemClick={handleMenuItemClick}
          sortItems={sortItems}
          sortBy={sortBy}
          sortIsAsc={sortIsAsc}
        />
        {addRowPopupIsOn ? 
          <AddRowPopup 
            toggleAddRowPopup={toggleAddRowPopup}
            formData={formData}
            handleFormChange={handleFormChange}
            addNewRow={addNewRow}
          /> : null}
      </div>
    </div>
  );
}

export default App;
