import { BadRequestException } from '@nestjs/common';
import { ValidateStringPipe } from './validate-string-type.pipe';

describe('ValidateStringPipe', () => {
  let pipe: ValidateStringPipe;

  beforeEach(() => {
    pipe = new ValidateStringPipe();
  });

  it('should return the value if it is a valid string', () => {
    const result = pipe.transform('validString');
    expect(result).toBe('validString'); 
  });

  it('should throw BadRequestException if the value is not a string', () => {
    const invalidInputs = [123, true, {}, [], null, undefined];

    invalidInputs.forEach((input) => {
      expect(() => pipe.transform(input)).toThrow(BadRequestException);
      expect(() => pipe.transform(input)).toThrow('Type must be a string and cannot contain numbers');
    });
  });

  it('should throw BadRequestException if the string contains numbers or special characters', () => {
    const invalidStrings = ['pikachu1', 'TEST!"#', 'Char!zard', ''];

    invalidStrings.forEach((input) => {
      expect(() => pipe.transform(input)).toThrow(BadRequestException);
      expect(() => pipe.transform(input)).toThrow('Type must be a string and cannot contain numbers');
    });
  });
});