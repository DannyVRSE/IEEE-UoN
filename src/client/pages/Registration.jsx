
const Registration = () => {
    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    <div className="card w-80 register-card">
                        <div className="card-body">
                            <form>
                                <legend>Register</legend>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" name="name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Year of Study</label>
                                    <input className="form-control" name="year-of-study" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Student Reg. Number</label>
                                    <input className="form-control" name="req-no" type="number" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">IEEE Member Number</label>
                                    <input className="form-control" name="member-no" type="number" placeholder="Leave blank if none" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" name="email" type="email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Telephone</label>
                                    <input className="form-control" name="telephone" type="tel" required />
                                </div>
                                <br />
                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Registration;
