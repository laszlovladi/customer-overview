import React from 'react';

function AddRowPopup(props){
  const {toggleAddRowPopup, formData, handleFormChange, addNewRow} = props;

  return (
    <div className="add-row-popup-container">
      <div className="add-row-popup">
        <button className="close-popup" title="Close" onClick={() => toggleAddRowPopup()}>
          <img className="close-popup-img" src="./img/plus.png" alt="add"/>
        </button>
        <h3 className="add-row-popup-title">Add row</h3>
        <form className="add-row-popup-form">
          <input type="text" className="" name="name" id="form-name" placeholder="Name" onChange={(e) => handleFormChange(e, "name")} autoComplete="off"/>
          <input type="text" className="" name="com_id" id="form-com_id" placeholder="Com ID" onChange={(e) => handleFormChange(e, "com_id")}/>
          <input type="text" className="" name="leg_id" id="form-leg_id" placeholder="Leg ID" onChange={(e) => handleFormChange(e, "leg_id")}/>
          <input type="text" className="" name="size" id="form-size" placeholder="Size (MB)" onChange={(e) => handleFormChange(e, "size")}/>
          <select name="status" id="status" defaultValue={formData.status} onChange={(e) => handleFormChange(e, "status")}>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="add-row-button" value="Add" onClick={(e) => addNewRow(e)}>Add row</button>
        </form>
      </div>
    </div>
  )
}

export default AddRowPopup;