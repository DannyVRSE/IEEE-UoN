import database from "../Models/index.js"
import { QueryTypes } from "sequelize";

const { db, sequelize } = database
const Member = db.Member
const Society = db.Society

const getMembers = async (req, res) => {
    try {
        //get the sociey
        const societyName = req.params.societyName
        console.log(societyName, "society name")
        //db operations
        //handle student branch
        if (societyName == "ieee_uon") {
            const members = await Member.findAll({
                attributes: ['member_id', 'name', 'email', 'year', 'phone', 'role', 'privilege_level'],
                where: {
                    verified: true
                }
            })

            console.log(members, "ieee members")
            return res.status(200).json(members);

        } else {
            //get society id
            const societyId = await Society.findOne({
                attributes: ["society_id"],
                where: {
                    society_name: societyName.toUpperCase()
                }
            })
            //console.log(societyId.society_id)
            //get member with from a specific society
            const members = await sequelize.query(`SELECT "Members".name, "Members".email, "Members".year, "Members".phone, "Members".role, "Memberships".privilege_level
            FROM "Members"
            JOIN "Memberships" ON "Memberships".member_id="Members".member_id
            WHERE "Memberships".society_id=${societyId.society_id}`, { type: QueryTypes.SELECT });

return res.status(200).json(members);
        }
       

    } catch (error) {
        console.log(error)
    }
}

export default { getMembers }