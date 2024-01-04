import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export abstract class ApiResponse {
  public static success(
    message: string = 'Requisição realizada com sucesso.',
    data: any = null,
  ) {
    return ApiResponse.json(message, data, HttpStatus.OK);
  }

  public static warning(
    message: string = 'Atenção requisição inválida.',
    data?: any,
  ) {
    return ApiResponse.json(message, data, HttpStatus.BAD_REQUEST);
  }

  public static error(
    message: string = 'Ocorreu uma inconsistência no sistema.',
    data: any = null,
  ) {
    const responseData =
      process.env.APP_ENV === 'production'
        ? { message, data }
        : {
            message,
            data: false,
          };

    return ApiResponse.json(
      responseData.message,
      responseData.data,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private static json(message: string, data: any, httpCode: number) {
    return {
      httpCode,
      message,
      data,
    };
  }
}
