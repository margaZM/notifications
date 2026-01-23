import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = "Internal Server Error";

    if (exception && exception !== null) {
      if (typeof exception.getError === "function") {
        const errorData = exception.getError();
        if (typeof errorData === "object" && errorData !== null) {
          statusCode = errorData.statusCode ?? errorData.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
          message = errorData.message || "Internal Server Error";
        } else if (typeof errorData === "string") {
          message = errorData;
        }
      } else if (typeof exception === "string") {
        message = exception;
      } else if (typeof exception === "object") {
        message = exception.message;
        statusCode = exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
      }
    }

    return response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
