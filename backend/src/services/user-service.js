const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');

const UserRepository = require('../repository/user-repository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data) {
        try{
            const user = this.userRepository.create(data);
            return user;
        } catch(error) {
            console.log("Something went wrong in Service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try{
            // fetch details of user by its email
            const user = await this.userRepository.getByEmail(email);
            // check if input password is correct or not with the saved encrypted password in db
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect Password'};
            }
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch(error){
            console.log("Something went wrong in Signing In");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
    async isAdmin(token) {
        try {
            const user = await this.isAuthenticated(token);
            console.log("In ADMIN");
            console.log(user);
            return this.userRepository.isAdmin(user.id);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
    createToken(user) {
        try{
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch(error) {
            console.log("Something went wrong in creating token");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch(error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }
}

module.exports = UserService;