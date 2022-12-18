import { HTTPMethod } from './HTTPMethod';
import { Handler } from 'express';

export type Endpoint = {
  path: string;
  method: HTTPMethod;
  handler: Handler;
}
