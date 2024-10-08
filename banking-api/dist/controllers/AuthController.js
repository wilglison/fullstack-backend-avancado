"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield prisma_1.prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (!user) {
                    return res.status(400).json({ error: "User or password not found" });
                }
                const isValidPassword = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!isValidPassword) {
                    return res.status(400).json({ error: "User or password not found" });
                }
                const token = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, "secret", {
                    expiresIn: "1m",
                });
                return res.status(200).json({ user: { id: user.id, email }, token });
            }
            catch (error) {
                return res.status(400).json({ error: "Error on login" });
            }
        });
    }
    authMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                if (!authorization) {
                    return res.status(401).json({ error: "Unauthorized" });
                }
                const token = authorization.replace("Bearer ", "");
                const decoded = (0, jsonwebtoken_1.verify)(token, "secret");
                const { id } = decoded;
                console.log(`ID: ${id}`);
                next();
            }
            catch (error) {
                return res.status(401).json({ error: "Unauthorized" });
            }
        });
    }
}
exports.AuthController = AuthController;
