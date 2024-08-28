import database from "../Models/index.js";
import { QueryTypes } from "sequelize";
import Joi from "joi";

const { db, sequelize } = database
const Member = db.Member
const Society = db.Society
const Membership = db.Membership

const getMembers = async (req, res) => {
    try {
        //get the society name
        const societyName = req.params.societyName

        //db operations
        //handle student branch
        if (societyName == "ieee_uon") {

            //check if user is admin in student branch  
            if (req.user.privilege_level == "advanced") {
                const members = await Member.findAll({
                    attributes: ['member_id', 'name', 'email', 'year', 'phone', 'role', 'privilege_level', 'ieee_no'],
                    where: {
                        verified: true
                    }
                })

                return res.status(200).json(members);

            } else {
                return res.status(403).json({ message: "Forbidden access" })
            }

        } else {
            //get society id
            const societyId = await Society.findOne({
                attributes: ["society_id"],
                where: {
                    society_name: societyName.toUpperCase()
                }
            });

            //get the privilege level of the user
            const privilege = await Membership.findOne({
                attributes: ["privilege_level"],
                where:
                {
                    society_id: societyId.society_id,
                    member_id: req.user.member_id
                }
            })

            //check if society exists
            if (!societyId) {
                return res.status(404).json({ message: "Society not found" })
            }

            //check if user is admin in the society
            if (privilege.privilege_level !== "advanced") {
                return res.status(403).json({ message: "Forbidden access" })
            }

            //get members from the specific society
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

//🚩 refactor needed
const manageMember = async (req, res) => {

    const { email, role, society, privilege } = req.body.manageForm;

    const newMemberInfo = {
        email: email,
        role: role,
        society: society,
        privilege: privilege
    }

    //validation
    const schema = Joi.object({
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        society: Joi.string().required(),
        privilege: Joi.string().required()
    });

    try {
        const value = await schema.validateAsync(newMemberInfo);
        console.log(value);
    } catch (error) {
        return res.status(400).send({ message: "Invalid data. Check that you have entered the correct format!" });
    }


    //check if society is ieee_uon
    if (society == "ieee_uon") {

        // check privilege level
        if (req.user.privilege_level !== "advanced") {
            return res.status(403).json({ message: "Forbidden access" })
        }

        await Member.update({
            role: newMemberInfo.role, privilege_level: newMemberInfo.privilege
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
        //if society name is not ieee_uon

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

        //get privileges
        const privilege = await Membership.findOne({
            attributes: ["privilege_level"],
            where: {
                society_id: society,
                member_id: memberId
            }
        });

        if (!societyId || !memberId) {
            return res.status(404).json({ message: "Society or member not found" })
        }

        console.log(societyId, memberId, privilege, "society id, member id, privilege")

        //check if user is admin in the society
        if (privilege.privilege_level == "advanced" || req.user.privilege_level == "advanced") {
            //update membership
            await Membership.update({
                role: newMemberInfo.role,
                privilege_level: newMemberInfo.privilege
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
        } else {
            return res.status(403).json({ message: "Forbidden access" })
        }

    }

}

export default { getMembers, manageMember }