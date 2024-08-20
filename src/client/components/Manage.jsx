//change role and privilege

const Manage = () => {
    return (
        <>
            <div className="card border-info">
                <div className="card-header text-bg-info"><h4>Manage Members</h4></div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Member Email</label>
                            <input type="email" placeholder="Copy from table" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Member role</label>
                            <input type="text" placeholder="E.g Treasurer" className="form-control" />
                        </div>
                        <br />
                        <div className="form-group">
                            <div>
                            <h5>Privilege</h5>
                            <input className="" type="radio" id="basic" name="privilege" />
                            <label htmlFor="basic">Basic</label>
                            <input type="radio" id="advanced" name="privilege" />
                            <label htmlFor="advanced">Advanced</label>  
                            </div>
                            <br/>
                            <div>
                                <small id="privilegeHelp" className="form-text text-muted">Consider using &apos;advanced&apos; privilege for executive committee members.</small>
                            </div>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Manage
