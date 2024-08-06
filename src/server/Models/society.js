const societyModel = (sequelize, DataTypes) => {
    sequelize.define("Society", {
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
    return societyModel;
} 

export default societyModel;