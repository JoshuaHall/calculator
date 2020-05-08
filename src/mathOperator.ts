export enum MathOperator {
  Add,
  Subtract,
  Multiply,
  Divide,
}

export function mathOperatorToString(operator: MathOperator): string {
  switch (operator) {
    case MathOperator.Add:
      return '+';
    case MathOperator.Subtract:
      return '-';
    case MathOperator.Multiply:
      return '×';
    case MathOperator.Divide:
      return '÷';
  }
}

export function mathOperatorToKeyString(operator: MathOperator): string {
  switch (operator) {
    case MathOperator.Add:
      return '+';
    case MathOperator.Subtract:
      return '-';
    case MathOperator.Multiply:
      return '*';
    case MathOperator.Divide:
      return '/';
  }
}

export function mathOperatorToId(operator: MathOperator): string {
  switch (operator) {
    case MathOperator.Add:
      return 'add';
    case MathOperator.Subtract:
      return 'subtract';
    case MathOperator.Multiply:
      return 'multiply';
    case MathOperator.Divide:
      return 'divide';
  }
}

export function applyOperator(operator: MathOperator, num1: number, num2: number): number {
  let result: number;

  switch (operator) {
    case MathOperator.Add:
      result = num1 + num2;
      break;
    case MathOperator.Subtract:
      result = num1 - num2;
      break;
    case MathOperator.Multiply:
      result = num1 * num2;
      break;
    case MathOperator.Divide:
      result = num1 / num2;
      break;
  }

  return Math.round(1000000000000 * result) / 1000000000000;
}
