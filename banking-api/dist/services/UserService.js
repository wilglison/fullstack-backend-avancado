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
exports.UserService = void 0;
const prisma_1 = require("../prisma");
const bcryptjs_1 = require("bcryptjs");
class UserService {
    create(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield prisma_1.prisma.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: false,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                if (userExists) {
                    throw new Error("User already exists");
                }
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
                const user = yield prisma_1.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: false,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(`Error creating user ${error}`);
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma_1.prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: false,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                return users;
            }
            catch (error) {
                console.error(`Error getting users ${error}`);
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: false,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(`Error finding user by id ${error}`);
                throw error;
            }
        });
    }
    update(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
                const user = yield prisma_1.prisma.user.update({
                    where: { id },
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: false,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                return user;
            }
            catch (error) {
                console.error(`Error updating user ${error}`);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.prisma.user.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                console.error(`Error deleting user ${error}`);
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
