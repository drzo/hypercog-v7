import { validate, validateObject } from '../validation/validate';
import type { ValidationRule, ValidationResult, ValidationOptions } from '../validation/types';
import * as rules from '../validation/rules';

export const validation = {
  validate,
  validateObject,
  rules
};