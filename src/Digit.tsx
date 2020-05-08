import React, { ReactElement } from 'react';

import useEventListener from '@srmagura/use-event-listener';

interface DigitProps {
  digit: number;
  digitInput: (digit: number) => void;
}

function digitToId(digit: number): string {
  switch (digit) {
    case 0:
      return 'zero';
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    case 4:
      return 'four';
    case 5:
      return 'five';
    case 6:
      return 'six';
    case 7:
      return 'seven';
    case 8:
      return 'eight';
    case 9:
      return 'nine';
    default:
      throw new Error('Not a digit');
  }
}

export function Digit({ digit, digitInput }: DigitProps): ReactElement<DigitProps> {
  function handleDigitInput(): void {
    digitInput(digit);
  }

  useEventListener(
    'keydown',
    ({ key }: KeyboardEvent) => {
      if (key === digit.toString()) {
        handleDigitInput();
      }
    },
    document,
  );

  return (
    <div onClick={handleDigitInput} id={digitToId(digit)} className="digit p-3 border border-dark">
      {digit}
    </div>
  );
}
