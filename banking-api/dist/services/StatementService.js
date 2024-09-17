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
exports.StatementService = void 0;
const prisma_1 = require("../prisma");
class StatementService {
    deposit(idCheckingAccount, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (amount <= 0) {
                    throw new Error("Invalid amount.");
                }
                const statement = yield prisma_1.prisma.statement.create({
                    data: {
                        idCheckingAccount,
                        amount,
                        description,
                        type: "credit",
                    },
                });
                return statement;
            }
            catch (error) {
                console.error(`Error creating deposit: ${error}`);
                throw error;
            }
        });
    }
    getBalance(idCheckingAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                //select sum(amount) from Statement Where idCheckingAccount = id
                const aggregate = yield prisma_1.prisma.statement.aggregate({
                    _sum: {
                        amount: true,
                    },
                    where: { idCheckingAccount },
                });
                return (_a = aggregate._sum.amount) !== null && _a !== void 0 ? _a : 0;
            }
            catch (error) {
                console.error(`Error fetching balance. ${error}`);
                throw error;
            }
        });
    }
    withdraw(idCheckingAccount, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const withdraw = yield this.createDebit(idCheckingAccount, amount, description);
                return withdraw;
            }
            catch (error) {
                console.error(`Error creating withdraw. ${error}`);
                throw error;
            }
        });
    }
    getAll(idCheckingAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // select * from Statement order by createdAt desc
                const statement = yield prisma_1.prisma.statement.findMany({
                    where: {
                        idCheckingAccount,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return statement;
            }
            catch (error) {
                console.error(`Error fetching statement. ${error}`);
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statement = yield prisma_1.prisma.statement.findUnique({
                    where: {
                        id,
                    },
                });
                return statement;
            }
            catch (error) {
                console.error(`Error fetching statement. ${error}`);
                throw error;
            }
        });
    }
    getByPeriod(idCheckingAccount, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statement = yield prisma_1.prisma.statement.findMany({
                    where: {
                        idCheckingAccount,
                        createdAt: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                return statement;
            }
            catch (error) {
                console.error(`Error fetching statement. ${error}`);
                throw error;
            }
        });
    }
    pix(idCheckingAccount, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pix = yield this.createDebit(idCheckingAccount, amount, `PIX - ${description}`);
                return pix;
            }
            catch (error) {
                console.error(`Error creating pix. ${error}`);
                throw error;
            }
        });
    }
    ted(idCheckingAccount, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ted = yield this.createDebit(idCheckingAccount, amount, `TED - ${description}`);
                return ted;
            }
            catch (error) {
                console.error(`Error creating ted. ${error}`);
                throw error;
            }
        });
    }
    createDebit(idCheckingAccount, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (amount <= 0) {
                    throw new Error("Invalid amount.");
                }
                const balance = yield this.getBalance(idCheckingAccount);
                if (amount > balance) {
                    throw new Error("Insufficient funds.");
                }
                const statement = yield prisma_1.prisma.statement.create({
                    data: {
                        idCheckingAccount,
                        amount: amount * -1,
                        description,
                        type: "debit",
                    },
                });
                return statement;
            }
            catch (error) {
                console.error(`Error creating withdraw. ${error}`);
                throw error;
            }
        });
    }
}
exports.StatementService = StatementService;
