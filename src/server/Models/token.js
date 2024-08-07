
const tokenModel = (sequelize, DataTypes) => {
    const Token = sequelize.define("Token", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: "cascade",
            onDelete: "cascade",
            references: { model: "Members", key: "member_id" }
        },
        token: {
            type: DataTypes.STRING,
        },
    }, { timestamps: true })
    return Token
}

export default tokenModel