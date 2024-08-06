const junctionModel=(sequelize, DataTypes)=>{
    const Junction = sequelize.define("Junction", {
        memberId:{
            type:DataTypes.INTEGER,
            references:{
                model: "members",
                key: "member_id"
            },
            societyId:{
                type:DataTypes.INTEGER,
                references:{
                    model: "societies",
                    key: "society_id"
                }   
            }
        }
    })
    return Junction;
}

export default junctionModel;
