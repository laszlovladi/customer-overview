import React from 'react';

function Table(props){
  const {filteredData, handleButtonClick, handleMenuItemClick, sortItems, sortBy, sortIsAsc} = props;

  const formatUnits = (GB) => {
    const k = 1024;
    const sizes = ['MB', 'GB'];
    const i = Math.floor(Math.log(GB) / Math.log(k));
    return parseFloat((GB / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table table--header">
          <tr>
            <th id="name" onClick={(e) => sortItems(e, "name")}>
              Customer 
              {sortBy === "name" ? <img src="./img/arrow.png" height="9" alt="" style={!sortIsAsc ? {} : {transform: "rotate(180deg)"}}/> : null}
            </th>
            <th></th>
            <th id="com_id" onClick={(e) => sortItems(e, "com_id")}>
              Com ID
              {sortBy === "com_id" ? <img src="./img/arrow.png" height="9" alt="" style={!sortIsAsc ? {} : {transform: "rotate(180deg)"}}/> : null}
            </th>
            <th id="leg_id" onClick={(e) => sortItems(e, "leg_id")}>
              Leg ID
              {sortBy === "leg_id" ? <img src="./img/arrow.png" height="9" alt="" style={!sortIsAsc ? {} : {transform: "rotate(180deg)"}}/> : null}
            </th>
            <th id="size" onClick={(e) => sortItems(e, "size")}>
              Size
              {sortBy === "size" ? <img src="./img/arrow.png" height="9" alt="" style={!sortIsAsc ? {} : {transform: "rotate(180deg)"}}/> : null}
            </th>
            <th id="status" onClick={(e) => sortItems(e, "status")}>
              Status
              {sortBy === "status" ? <img src="./img/arrow.png" height="9" alt="" style={!sortIsAsc ? {} : {transform: "rotate(180deg)"}}/> : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((elem, i) => {
            return (
              <tr className="table table--row" key={i}>
                <td className="brand-container">
                  <div className="brand-img-container">
                    <img className="brand-img" src={`${elem.logo}`} alt="logo"/>
                  </div> 
                  <div>{elem.name}</div>
                </td>
                <td className="brand-button-container">
                  <button className="brand-button" id={`brand-button-${i}`} onClick={(e) => handleButtonClick(e)}>Default</button>
                  <div className="dropdown-menu" id={`dropdown-${i}`} onClick={(e) => handleMenuItemClick(e)}>
                    <div className="dropdown-menu--item" id={`dropdown-${i}-item1`}>
                      Something 
                      <img src="./img/check.png" alt="ticked"/>
                    </div>
                    <div className="dropdown-menu--item" id={`dropdown-${i}-item2`}>
                      Something 
                      <img src="./img/check.png" alt="ticked"/>
                    </div>
                    <div className="dropdown-menu--item" id={`dropdown-${i}-item3`}>
                      Something 
                      <img src="./img/check.png" alt="ticked"/>
                    </div>
                  </div>
                </td>
                <td>{elem.com_id}</td>
                <td>{elem.leg_id}</td>
                <td>{formatUnits(elem.size)}</td>
                <td><div className={`status ${elem.status}`}>{elem.status}</div></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;