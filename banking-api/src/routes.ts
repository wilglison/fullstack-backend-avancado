import { Router } from "express";
import { CheckingAccountController } from "./controllers/CheckingAccountController";
import { StatementController } from "./controllers/StatementController";
import { verify } from "crypto";

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();

const path = "/checkingaccount";

routes.get(path, checkingAccountController.findAll);

routes.get(`${path}/:id`, checkingAccountController.findById);

routes.post(path, checkingAccountController.create);

routes.delete(
  `${path}/:id`,
  checkingAccountController.verifyIfExists,
  checkingAccountController.delete
);

routes.put(
  `${path}/:id`,
  checkingAccountController.verifyIfExists,
  checkingAccountController.update
);

routes.post(
  `${path}/:id/deposit`,
  checkingAccountController.verifyIfExists,
  statementController.deposit
);

routes.get(
  `${path}/:id/statement`,
  checkingAccountController.verifyIfExists,
  statementController.getStatement
);

routes.post(
  `${path}/:id/withdraw`,
  checkingAccountController.verifyIfExists,
  statementController.withdraw
);

export { routes };
