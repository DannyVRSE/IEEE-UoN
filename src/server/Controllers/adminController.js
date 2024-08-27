import database from "../Models/index.js"
import { QueryTypes } from "sequelize";

const { db, sequelize } = database
const Member = db.Member
const Society = db.Society
const Membership = db.Membership

const getMembers = async (req, res) => {
    try {
        //🚩Auth needed
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

const manageMember = async (req, res) => {
    //auth needed 🚩
    //validation needed🚩
    //check if the member has enough privileges
    //email, role, society, privilege_level
    const { email, role, society, privilege } = req.body.manageForm;

    console.log(email, role, society, privilege);

    //check if society is ieee_uon
    if (society == "IEEE_UON") {
        await Member.update({
            role: role, privilege_level: privilege
        }, {
            where: {
                email: email
            }
        }).then((response) => {
            console.log(response)
            return res.status(200).json({ message: "Member updated" })
        }).catch((error) => {
            console.log(error)
            return res.status(500).json({ message: "Error updating member" })
        })
    } else {
        //get society id, member id
        const societyId = await Society.findOne({
            attributes: ["society_id"],
            where: {
                society_name: society
            }
        });
        const memberId = await Member.findOne({
            attributes: ["member_id"],
            where: {
                email: email
            }
        });
        //update membership
        await Membership.update({
            ...(role == !undefined && { role: role }),
            ...(privilege == !undefined && { privilege_level: privilege })
        }, {
            where: {
                society_id: societyId,
                member_id: memberId
            }
        }).then((response) => {
            console.log(response)
            return res.status(200).json({ message: "Member updated" })
        }).catch((error) => {
            console.log(error)
            return res.status(500).json({ message: "Error updating member" })
        })
    }

}

export default { getMembers, manageMember }