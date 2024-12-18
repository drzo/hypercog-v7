import { DefaultStrategy } from './default';
import { AlternativeStrategy } from './alternative';
import type { ImprovementStrategy } from './base';

export function createStrategy(type: string = 'default'): ImprovementStrategy {
  switch (type) {
    case 'alternative':
      return new AlternativeStrategy();
    default:
      return new DefaultStrategy();
  }
}