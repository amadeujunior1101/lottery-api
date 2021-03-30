"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, ctx, { request, response }) {

    if (
      error.code ===
      "InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided"
    ) {
      return ctx.response.status(401).json({
        type: "Unauthorized",
        error: "Token JWT inválido.",
      });
    }
    if (error.message === "E_INVALID_JWT_TOKEN: invalid token") {
      return response.status(401).json({
        type: "Unauthorized",
        error: "Token JWT inválido.",
      });
    }
    if (error.message === "E_INVALID_JWT_TOKEN: jwt must be provided") {
      return response.status(403).json({
        type: "Unauthorized",
        error: "Token JWT deve ser fornecido.",
      });
    }
    if (
      error.message ===
      "E_JWT_TOKEN_EXPIRED: The jwt token has been expired. Generate a new one to continue"
    ) {
      return response.status(401).json({
        type: "Unauthorized",
        error: "Token JWT expirado, gere um novo para continuar.",
      });
    }
    response.status(error.status).send(error.message);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
