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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield this.userService.create(name, email, password);
                return res.status(201).json(user);
            }
            catch (error) {
                this.handleError(res, error, "Error creating user");
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAll();
                return res.status(200).json(users);
            }
            catch (error) {
                this.handleError(res, error, "Error getting users");
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield this.userService.getById(id);
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                this.handleError(res, error, "Error getting user by id");
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.userService.delete(id);
                return res.status(204).send();
            }
            catch (error) {
                this.handleError(res, error, "Error deleting user");
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password } = req.body;
            try {
                const user = yield this.userService.update(id, name, email, password);
                return res.status(200).json(user);
            }
            catch (error) {
                this.handleError(res, error, "Error updating user");
            }
        });
        this.verifyIfExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userService.getById(id);
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                return next();
            }
            catch (error) {
                this.handleError(res, error, "Error verifying if user exists");
            }
        });
        this.userService = new UserService_1.UserService();
    }
    handleError(res, error, msg) {
        console.error(`${msg}:`, error);
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
}
exports.UserController = UserController;
