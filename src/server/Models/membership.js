const membershipModel = (sequelize, DataTypes) => {
    const Membership = sequelize.define("Membership", {
        memberId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Members",
                key: "member_id"
            },
            societyId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Societies",
                    key: "society_id"
                }
            },

        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "member"
        },
        privilege_level:{
            type: DataTypes.STRING,
            defaultValue: "basic"
        }
    }, { timestamps: true })
    return Membership;
}

export default membershipModel;
