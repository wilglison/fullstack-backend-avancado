import { Router } from "express";
import { CustomerController } from "./controllers/CustomerController";

const routes = Router();

const customerController = new CustomerController();

routes.get("/customers", customerController.findAll);

routes.get("/customers/:id", customerController.findById);

routes.post("/customers", customerController.create);

routes.delete(
  "/customers/:id",
  customerController.verifyIfExists,
  customerController.delete
);

routes.put(
  "/customers/:id",
  customerController.verifyIfExists,
  customerController.update
);

export { routes };
