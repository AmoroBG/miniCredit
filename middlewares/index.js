import verifyToken from "./authJwt.js";
import verifySignUp from "./verifyRegistration.js";
const middleWare = {
    verifySignUp, verifyToken
}
export default middleWare
