import {Token} from '../models/index.js';

class TokenService {
    async createToken(tokenData) {
        try {
            const token = await Token.create(tokenData);
            return token;
        } catch (error) {
            throw new Error('Error creating token: ' + error.message);
        }
    }

    async findTokenByUserId(userId) {
        try {
            const token = await Token.findOne({ where: { userId } });
            return token;
        } catch (error) {
            throw new Error('Error finding token: ' + error.message);
        }
    }

    async validateToken(tokenId) {
        try {
            const token = await Token.findByPk(tokenId);
            if (token) {
                token.validatedAt = new Date();
                await token.save();
            }
            return token;
        } catch (error) {
            throw new Error('Error validating token: ' + error.message);
        }
    }

    async deleteTokenByUserId(userId) {
        try {
            const result = await Token.destroy({ where: { userId } });
            return result;
        } catch (error) {
            throw new Error('Error deleting token: ' + error.message);
        }
    }

    async findTokenByTokenString(tokenString) {
        try {
            const token = await Token.findOne({ where: { tokenString } });
            return token;
        } catch (error) {
            throw new Error('Error finding token by token string: ' + error.message);
        }
    }

    async findTokenByCode(code) {
        try {
            const token = await Token.findOne({ where: { code } });
            return token;
        } catch (error) {
            throw new Error('Error finding token by code: ' + error.message);
        }
    }
}

export default new TokenService();
