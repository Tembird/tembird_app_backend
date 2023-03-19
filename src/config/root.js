const AuthorizationService = require("../service/authorization_service");

const Root = {
    authentication: async function (req, res, next) {
        try {
            const token = req.get('Access-Token');

            if (token === undefined) {
                return res.status(401).json({message: "요청에 대한 권한이 없습니다"});
            }

            await AuthorizationService.verifyAccessToken(token);
            const user = await AuthorizationService.decodeToken(token);
            if (user.uid === undefined) {
                return res.status(401).json({message: '알 수 없는 사용자입니다'});
            }
            req.uid = user.uid;
            next();

        } catch (error) {
            return res.status(error.status).json({message:error.message});
        }
    }
}


module.exports = Root;