import database from "../Models/index.js"
const { db } = database
const Member = db.Member
const getMembers = async (req, res) => {
    try {
        //get the sociey
        const society = req.params.societyName
        console.log(society, "society_name")
        let members;
        //db operations
        //handle student branch
        if (society == "ieee_uon") {
            members = await Member.findAll({
                attributes: ['member_id', 'name', 'email', 'year', 'phone', 'role', 'privilege_level'],
                where: {
                    verified: true
                }
            })

            console.log(members);
            //send data
            return res.status(200).json(members);

        } else {
            //get member with from a specific society
            return
        }
    } catch (error) {
        console.log(error)
    }
}

export default { getMembers }