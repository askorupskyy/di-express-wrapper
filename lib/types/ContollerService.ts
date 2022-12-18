import { Handler } from "express";
import { Endpoint } from "./Endpoint";

export type ControllerService = {
  endpoints: Endpoint[];
  middleware: Handler[];
}
