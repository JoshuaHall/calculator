import React, { ReactElement } from 'react';

import useEventListener from '@srmagura/use-event-listener';

import { MathOperator, mathOperatorToString, mathOperatorToId, mathOperatorToKeyString } from './mathOperator';

interface OperatorProps {
  mathOperator: MathOperator;
  operatorInput: (operator: MathOperator) => void;
}

export function Operator({ mathOperator, operatorInput }: OperatorProps): ReactElement<OperatorProps> {
  function handleOperatorInput(): void {
    operatorInput(mathOperator);
  }

  function handleKeydown(event: KeyboardEvent): void {
    event.preventDefault();

    if (event.key === mathOperatorToKeyString(mathOperator)) {
      handleOperatorInput();
    }
  }

  useEventListener('keydown', handleKeydown);

  return (
    <button onClick={handleOperatorInput} id={mathOperatorToId(mathOperator)} className="button">
      {mathOperatorToString(mathOperator)}
    </button>
  );
}
