//change role and privilege
import { useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { useAuth } from '../hooks/AuthContext';


const Manage = () => {
    const { societyName } = useParams();//get society name from route params
    const { token } = useAuth();

    const [manageForm, setManageForm] = useState({
        email: "",
        role: "",
        privilege: "",
        society: societyName
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setManageForm({ ...manageForm, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.patch(`/api/admin/${societyName}/members`, { manageForm }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            alert(res.data.message);
        }).catch(err => {
            alert(err.response.data.message);
        }).finally(() => {
            setManageForm({
                email: "",
                role: "",
                privilege: ""
            })
        })

    }

    return (
        <>
            <div className="card border-info">
                <div className="card-header text-bg-info"><h4>Manage Members</h4></div>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Member Email</label>
                            <input type="email" name="email" placeholder="Copy from table" className="form-control" value={manageForm.email} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Member role</label>
                            <input type="text" name="role" placeholder="E.g Treasurer" className="form-control" value={manageForm.role} onChange={handleChange} required/>
                        </div>

                        <br />

                        <div className="form-group">


                            <label htmlFor="role">Privilege</label>
                            <select className="form-control" name="privilege" id="privilege" onChange={handleChange} value={manageForm.privilege} required>
                                <option value="" disabled>Select</option>
                                <option value="basic">Basic</option>
                                <option value="advanced">Advanced</option>
                            </select>

                            <br />
                            
                            <div>
                                <small id="privilegeHelp" className="form-text text-muted">Consider using &apos;advanced&apos; privilege for executive committee members.</small>
                            </div>
                        </div>

                        <br />

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Manage
