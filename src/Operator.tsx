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

  useEventListener(
    'keydown',
    ({ key }: KeyboardEvent) => {
      if (key === mathOperatorToKeyString(mathOperator)) {
        handleOperatorInput();
      }
    },
    document,
  );

  return (
    <div className="col">
      <div onClick={handleOperatorInput} id={mathOperatorToId(mathOperator)} className="digit p-3 border border-dark">
        {mathOperatorToString(mathOperator)}
      </div>
    </div>
  );
}
