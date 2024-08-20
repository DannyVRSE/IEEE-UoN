//junction table for a many to many relationship
const membershipModel = (sequelize, DataTypes) => {
    const Membership = sequelize.define("Membership", {
        member_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Members",
                key: "member_id"
            }
        },
        society_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Societies",
                key: "society_id"
            }
        },

        society_name:{
            type: DataTypes.STRING,
            references:{
                model:"Societies",
                key: "society_name"
            }
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "member"
        },
        privilege_level: {
            type: DataTypes.STRING,
            defaultValue: "basic"
        }
    }, { timestamps: true })
    return Membership;
}

export default membershipModel;
