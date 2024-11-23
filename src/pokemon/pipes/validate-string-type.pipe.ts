import {  BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidateStringPipe implements PipeTransform {

    transform(value: any  ) {
        if (typeof value !== 'string' || !/^[a-zA-Z]+$/.test(value)) {
          throw new BadRequestException('Type must be a string and cannot contain numbers');
        }
        return value;
      }
}