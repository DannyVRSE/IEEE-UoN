const societyModel = (sequelize, DataTypes) => {
    const Society=sequelize.define("Society", {
        society_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
    })
    return Society;
} 

export default societyModel;