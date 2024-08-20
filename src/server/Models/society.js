const societyModel = (sequelize, DataTypes) => {
    const Society=sequelize.define("Society", {
        society_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        society_name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
    },
{timestamps: false})
    return Society;
} 

export default societyModel;