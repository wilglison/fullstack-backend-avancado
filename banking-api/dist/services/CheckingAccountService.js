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
exports.CheckingAccountService = void 0;
const prisma_1 = require("../prisma");
class CheckingAccountService {
    create(name, email, number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield prisma_1.prisma.checkingAccount.create({
                    data: {
                        name,
                        email,
                        number,
                    },
                });
                return checkingAccount;
            }
            catch (error) {
                console.error(`Error creating checkingAccount. ${error}`);
                throw error;
            }
        });
    }
    update(id, name, email, number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield prisma_1.prisma.checkingAccount.update({
                    where: { id },
                    data: {
                        name,
                        email,
                        number,
                    },
                });
                return checkingAccount;
            }
            catch (error) {
                console.error(`Error updating checkingAccunt. ${error}`);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.prisma.checkingAccount.delete({
                    where: {
                        id,
                    },
                });
            }
            catch (error) {
                console.error(`Error deleting checkingAccount. ${error}`);
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccounts = yield prisma_1.prisma.checkingAccount.findMany({
                    orderBy: {
                        name: "asc",
                    },
                });
                return checkingAccounts;
            }
            catch (error) {
                console.error(`Error fetching checkingAccount. ${error}`);
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield prisma_1.prisma.checkingAccount.findUnique({
                    where: { id },
                });
                return checkingAccount;
            }
            catch (error) {
                console.error(`Error fetching checkingAccount. ${error}`);
                throw error;
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccount = yield prisma_1.prisma.checkingAccount.findMany({
                    where: {
                        name: {
                            contains: name,
                            mode: "insensitive",
                        },
                    },
                    orderBy: {
                        name: "asc",
                    },
                });
                return checkingAccount;
            }
            catch (error) {
                console.error(`Error fetching checkingAccount. ${error}`);
                throw error;
            }
        });
    }
}
exports.CheckingAccountService = CheckingAccountService;
