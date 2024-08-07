
const memberModel = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        member_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reg_no: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        ieee_no: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "member"
        },
        privilege_level: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "basic"
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { timestamps: true },)
    return Member;
}

export default memberModel;