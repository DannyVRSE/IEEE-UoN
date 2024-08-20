import { useAuth } from "../hooks/AuthContext"

const Account = () => {
    const { user } = useAuth()
    return (
        <>
            <div className="container">
                <div className="inner-div-1">
                    {!user && <h1><a href="login">Log In</a></h1>}
                    {user && <h1>{user.name}</h1>}
                </div>
            </div>
        </>
    )
}

export default Account
