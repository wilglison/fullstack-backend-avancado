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
exports.CheckingAccountController = void 0;
const CheckingAccountService_1 = require("../services/CheckingAccountService");
class CheckingAccountController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, number } = req.body;
                const validation = this.isValidNameAndEmailAndNumber(name, email, number);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const checkingAccount = yield this.checkingAccountService.create(name, email, number);
                return res.status(201).json(checkingAccount);
            }
            catch (error) {
                this.handleError(res, error, "Error creating checkingAccount.");
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const { name, email, number } = req.body;
                const validation = this.isValidNameAndEmailAndNumber(name, email, number);
                if (!validation.isValid) {
                    return res.status(400).json({ error: validation.msg });
                }
                const checkingAccount = yield this.checkingAccountService.update(idCheckingAccount, name, email, number);
                return res.status(200).json(checkingAccount);
            }
            catch (error) {
                this.handleError(res, error, "Error updating checkingAccount");
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                yield this.checkingAccountService.delete(idCheckingAccount);
                return res.status(204).json();
            }
            catch (error) {
                this.handleError(res, error, "Error deleting checkingAccount.");
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checkingAccounts = yield this.checkingAccountService.getAll();
                return res.status(200).json(checkingAccounts);
            }
            catch (error) {
                this.handleError(res, error, "Error fetching checkingAccount.");
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idCheckingAccount = req.params.id;
                const checkingAccount = yield this.checkingAccountService.getById(idCheckingAccount);
                if (!checkingAccount) {
                    return res.status(404).json({ error: "CheckingAccount not found." });
                }
                return res.status(200).json(checkingAccount);
            }
            catch (error) {
                this.handleError(res, error, "Error fetching getById checkingAccount.");
            }
        });
        this.verifyIfExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const checkingAccount = yield this.checkingAccountService.getById(id);
                if (!checkingAccount) {
                    return res.status(404).json({ error: "CheckingAccount not found." });
                }
                return next();
            }
            catch (error) {
                this.handleError(res, error, "Error verify if exists checkingAccount.");
            }
        });
        this.checkingAccountService = new CheckingAccountService_1.CheckingAccountService();
    }
    isValidNameAndEmailAndNumber(name, email, number) {
        if (typeof name !== "string" || name.trim().length == 0) {
            return {
                isValid: false,
                msg: "Invalid name: must be a non empty string.",
            };
        }
        if (typeof email !== "string" || email.trim().length == 0) {
            return {
                isValid: false,
                msg: "Invalid email: must be a non empty string.",
            };
        }
        if (typeof number !== "string" || number.trim().length == 0) {
            return {
                isValid: false,
                msg: "Invalid email: must be a non empty string.",
            };
        }
        return { isValid: true };
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
exports.CheckingAccountController = CheckingAccountController;
