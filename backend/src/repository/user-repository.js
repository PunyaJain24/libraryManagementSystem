const {User, Role} = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            const r1 = await Role.findByPk(2);
            user.addRole(r1);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async delete(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getById(userId) {
        try{
            const user = User.findByPk(userId, {
                attributes: ['email','id', 'name']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in Repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try{
            const user = User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        }
        catch (error) {
            console.log("Something went wrong in Repository layer");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    
}
module.exports = UserRepository;