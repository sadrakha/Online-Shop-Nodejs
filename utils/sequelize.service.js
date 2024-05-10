class SequelizeService{
    constructor(Model){
        this.model=Model
    }

    create(body){
        return this.model.build(body).save()
    }
    bulkCreate(body){
        return this.model.bulkCreate(body)
    }
    findOne(query){
        return this.model.findOne(query)
    }
    findAll(query){
        return this.model.findAll(query)
    }
    count(query){
        return this.model.count()
    }
    async findOneAndUpdate(body,id){
        const row =await this.model.findOne({where:{id}})
        return row.update(body)
    }
    findAllAndUpdate(body,query){
        return this.model.update(body,query)
    }
    findAllAndDelete(id){
        return this.model.destroy({where:{id}})
    }
    delete(query){
        return this.model.destroy(query)
    }
}

module.exports=SequelizeService