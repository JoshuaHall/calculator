import React, { ReactElement, useCallback } from 'react';

import useEventListener from '@srmagura/use-event-listener';

import { MathOperator, mathOperatorToString, mathOperatorToId, mathOperatorToKeyString } from './mathOperator';

interface OperatorProps {
  mathOperator: MathOperator;
  operatorInput: (operator: MathOperator) => void;
}

export const Operator = React.memo(function OperatorComponent({
  mathOperator,
  operatorInput,
}: OperatorProps): ReactElement<OperatorProps> {
  const handleOperatorInput = useCallback((): void => {
    operatorInput(mathOperator);
  }, [mathOperator, operatorInput]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === mathOperatorToKeyString(mathOperator)) {
        event.preventDefault();
        handleOperatorInput();
      }
    },
    [handleOperatorInput, mathOperator],
  );

  useEventListener('keydown', handleKeydown);

  return (
    <button onClick={handleOperatorInput} id={mathOperatorToId(mathOperator)} className="button">
      {mathOperatorToString(mathOperator)}
    </button>
  );
});
