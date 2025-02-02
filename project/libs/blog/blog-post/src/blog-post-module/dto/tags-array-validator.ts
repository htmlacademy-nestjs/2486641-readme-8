import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { PostValidateMessage } from '../blog-post.constant';

@ValidatorConstraint({ name: 'tagsArray', async: false })
export class TagsArrayValidator implements ValidatorConstraintInterface {
  validate(value: [string], args: ValidationArguments) {
    const uniqueTags = new Set<string>();
    for (const item of value) {
      const tag = item.toLowerCase();

      if (tag.includes(' ')) {
        throw new HttpException(
          PostValidateMessage.tags.spaceMessage, 
          HttpStatus.BAD_REQUEST);
      }

      if (!/^[a-z]/.test(tag)) {
        throw new HttpException(
          PostValidateMessage.tags.firstSymbolMessage, 
          HttpStatus.BAD_REQUEST);
      }

      uniqueTags.add(tag);
    }
    
    return uniqueTags.size === value.length
  }
}

export function TagsArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: TagsArrayValidator,
        });
    };
}