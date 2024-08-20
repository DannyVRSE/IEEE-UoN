import { useAuth } from "../hooks/AuthContext"
import Markdown from 'react-markdown';

const Account = () => {
    const { user, loading, getUser } = useAuth()
    return (
        <>
            <div className="container">
                <div className="inner-div-2">
                    {loading && <div className="loader"></div>}
                    {!user && <h1><a href="login">Log In</a></h1>}
                    {user &&
                        <>
                            <p>{user.name}</p>
                            <div>
                                <h2 >My Societies</h2>
                                <button className="btn btn-primary" onClick={getUser}>Refresh</button>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    Society
                                                </th>
                                                <th scope="col">
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                user.societies.map((society) => (
                                                    <tr key={society.society_name}>
                                                        <td>{society.society_name}</td>
                                                        <td>{society.role}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br />
                            <div>
                                <h2>Join the global community!</h2>
                                <Markdown>[Explore IEEE membership and communities](https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join).</Markdown>
                            </div>
                        </>
                    }
                </div>

            </div>
        </>
    )
}

export default Account
