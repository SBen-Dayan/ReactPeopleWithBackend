import React from "react";

export default function Table({people, selected, onCheckClick, onEditClick, onDeleteClick, onDeleteAllClick, onCheckAllClick, onUncheckAllClick}) {    
       const renderRow = ({id, firstName, lastName, age}) => 
        <React.Fragment key={id}>
            <tr>
                <td>
                    <div className="d-flex justify-content-center align-items-center">
                        <input onChange={() => onCheckClick(id)} checked={selected.includes(id)} type="checkbox" className="form-check-input mt-2"/>
                    </div>
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button onClick={() => onEditClick(id)} className="btn btn-warning">Edit</button>
                    <button onClick={() => onDeleteClick(id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        </React.Fragment>
    
    
    return (
        <>
        <table className="table table-hover table-striped table-bordered">
            <thead>
                <tr>
                    <th style={{width : '15%'}}>
                        <button onClick={onDeleteAllClick} className="btn btn-danger w-100">Delete All</button>
                        <button onClick={onCheckAllClick} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                        <button onClick={onUncheckAllClick} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {people.map(p => renderRow(p))}
            </tbody>
        </table>
        </>
    );
}
