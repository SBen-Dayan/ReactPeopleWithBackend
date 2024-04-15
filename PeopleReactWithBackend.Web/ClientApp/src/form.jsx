//why doesn't an arrow function work..
export default function Form({onTextChange,edit, onFormButtonClick, currentPerson : {firstName, lastName, age}}) {
    return (
        <>
        <div className="row mt-5">
            <div className="col-md-3">
                <input type="text" onChange={onTextChange} className="form-control" placeholder="First Name" name="firstName" value={firstName}/>         
            </div>
            <div className="col-md-3">
                <input type="text" onChange={onTextChange} className="form-control" placeholder="Last Name" name="lastName" value={lastName} />
            </div>
            <div className="col-md-3">
                <input type="text" onChange={onTextChange} className="form-control" placeholder="Age" name="age" value={age}/>
            </div>
            <div className="col-md-3">
                {edit ? 
                <>
                    <button id="update" onClick={onFormButtonClick} className="btn btn-warning w-100">Update</button>
                    <button id="cancel" onClick={onFormButtonClick} className="btn btn-dark w-100 mt-2">Cancel</button>
                </> :
                    <button id="add" onClick={onFormButtonClick} className="btn btn-primary w-100">Add</button>}
            </div>
        </div>
        </>
    );
}