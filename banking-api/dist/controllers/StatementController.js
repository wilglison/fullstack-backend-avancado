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
exports.StatementController = void 0;
const StatementService_1 = require("../services/StatementService");
class StatementController {
    constructor() {
        this.deposit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { amount, description } = req.body;
                //this.isValidAmountAndDescripiton2(amount, description, res);
                const validation = this.isValidAmountAndDescripiton(amount, description);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const statement = yield this.statementService.deposit(idCheckingAccount, amount, description);
                return res.status(201).json(statement);
            }
            catch (error) {
                this.handleError(res, error, "Error creating deposit.");
            }
        });
        this.getStatement = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const statement = yield this.statementService.getAll(idCheckingAccount);
                return res.status(200).json(statement);
            }
            catch (error) {
                this.handleError(res, error, "Error fetching statment.");
            }
        });
        this.getBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const balance = yield this.statementService.getBalance(idCheckingAccount);
                return res.status(200).json({ balance });
            }
            catch (error) {
                this.handleError(res, error, "Error fetching balance.");
            }
        });
        this.withdraw = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { amount, description } = req.body;
                //this.isValidAmountAndDescripiton2(amount, description, res);
                const validation = this.isValidAmountAndDescripiton(amount, description);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const withdraw = yield this.statementService.withdraw(idCheckingAccount, amount, description);
                return res.status(201).json(withdraw);
            }
            catch (error) {
                this.handleError(res, error, "Error creating withdraw.");
            }
        });
        this.getByPeriod = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { startDate, endDate } = req.query;
                if (!startDate || !endDate) {
                    return res
                        .status(400)
                        .json({ error: "Start date and end date are required." });
                }
                const start = new Date(startDate);
                const end = new Date(endDate);
                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    return res.status(400).json({ error: "Invalid date format." });
                }
                const statement = yield this.statementService.getByPeriod(idCheckingAccount, start, end);
                return res.status(200).json(statement);
            }
            catch (error) {
                this.handleError(res, error, "Error fetching statement by period.");
            }
        });
        this.pix = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { amount, description } = req.body;
                const validation = this.isValidAmountAndDescripiton(amount, description);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const pix = yield this.statementService.pix(idCheckingAccount, amount, description);
                return res.status(201).json(pix);
            }
            catch (error) {
                this.handleError(res, error, "Error creating pix.");
            }
        });
        this.ted = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { amount, description } = req.body;
                const validation = this.isValidAmountAndDescripiton(amount, description);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const ted = yield this.statementService.ted(idCheckingAccount, amount, description);
                return res.status(201).json(ted);
            }
            catch (error) {
                this.handleError(res, error, "Error creating ted.");
            }
        });
        this.statementService = new StatementService_1.StatementService();
    }
    isValidAmountAndDescripiton(amount, description) {
        if (typeof amount !== "number" || amount <= 0) {
            return {
                isValid: false,
                msg: "Invalid amount: must be a positive number.",
            };
        }
        if (typeof description !== "string" || description.trim().length == 0) {
            return {
                isValid: false,
                msg: "Invalid descripiton: must be a non empty string.",
            };
        }
        return { isValid: true };
    }
    isValidAmountAndDescripiton2(amount, description, res) {
        if (typeof amount !== "number" || amount <= 0) {
            return res
                .status(400)
                .json({ error: "Invalid amount: must be a positive number." });
        }
        if (typeof description !== "string" || description.trim().length == 0) {
            return res
                .status(400)
                .json({ error: "Invalid descripiton: must be a non empty string." });
        }
    }
    handleError(res, error, msg) {
        if (error instanceof Error) {
            console.error(`${msg}. ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
        else {
            console.error(`Unexpected error: ${error}`);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
}
exports.StatementController = StatementController;
