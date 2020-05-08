import React, { ReactElement, useState } from 'react';
import useEventListener from '@srmagura/use-event-listener';

import { MathOperator, mathOperatorToString, applyOperator } from './mathOperator';
import { arrayGroup } from './arrayGroup';

import { Digit } from './Digit';
import { Operator } from './Operator';

const maxInputLength = 15;

const initialInputState = '0';

const calculatorDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export function Calculator(): ReactElement<unknown> {
  const [input, setInput] = useState(initialInputState);
  const [operator, setOperator] = useState<MathOperator>();
  const [prevInput, setPrevInput] = useState<string>();

  function evaluate(inputOperator: MathOperator | undefined = undefined): void {
    const inputNum = parseFloat(input);

    if (operator !== undefined && prevInput !== undefined && !Number.isNaN(inputNum)) {
      const prevInputNum = parseFloat(prevInput);

      if (!Number.isNaN(prevInputNum)) {
        const result = applyOperator(operator, prevInputNum, inputNum);

        setInput(result.toString());
        setOperator(inputOperator);
        setPrevInput(undefined);
      }
    }
  }

  function digitInput(digit: number): void {
    if (input.length >= maxInputLength) {
      return;
    }

    if (operator !== undefined && prevInput === undefined) {
      const inputTemp = input;

      setInput(digit.toString());
      setPrevInput(inputTemp);
    } else if (input === initialInputState) {
      setInput(digit.toString());
    } else {
      setInput(input + digit.toString());
    }
  }

  function operatorInput(inputOperator: MathOperator): void {
    if (operator === undefined) {
      if (prevInput === undefined) {
        setOperator(inputOperator);
      }
    } else if (prevInput === undefined || Number.isNaN(parseFloat(input))) {
      if (inputOperator === MathOperator.Subtract) {
        const tempInput = input;
        setInput(input.includes('-') ? '0' : '-');
        setPrevInput(tempInput);
      } else if (inputOperator === MathOperator.Add) {
        let newInput: string;

        if (input.includes('-')) {
          const substr = input.substring(1);

          if (substr === '') {
            newInput = initialInputState;
          } else {
            newInput = substr;
          }
        } else {
          newInput = input;
        }

        setInput(newInput);
        setOperator(inputOperator);
      } else {
        setOperator(inputOperator);
      }
    } else {
      evaluate(inputOperator);
    }
  }

  function decimalInput(): void {
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  }

  function handleClickEvaluate(): void {
    evaluate();
  }

  function clear(): void {
    setInput(initialInputState);
    setOperator(undefined);
    setPrevInput(undefined);
  }

  useEventListener(
    'keydown',
    ({ key }: KeyboardEvent) => {
      if (key === 'Backspace' || key === 'Delete') {
        const len = input.length;

        if (len <= 1) {
          setInput(initialInputState);
        } else {
          setInput(input.substring(0, len - 1));
        }
      } else if (key === '=' || key === 'Enter') {
        evaluate();
      } else if (key === '.') {
        decimalInput();
      }
    },
    document,
  );

  // RENDER LOGIC

  const digits = arrayGroup(calculatorDigits, 3).map((digitGroup, index) => {
    const row = digitGroup.map((i) => (
      <div className="col-4" key={i}>
        <Digit digit={i} digitInput={digitInput} />
      </div>
    ));
    return (
      <div className="row" key={index}>
        {row}
      </div>
    );
  });

  let displayEquation: string;

  if (prevInput === undefined) {
    if (operator === undefined) {
      displayEquation = input;
    } else {
      displayEquation = `${input} ${mathOperatorToString(operator)}`;
    }
  } else if (operator !== undefined) {
    displayEquation = `${prevInput} ${mathOperatorToString(operator)} ${input}`;
  } else {
    displayEquation = 'ERROR';
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div id="display" className="p-3 border border-dark">
            {input}
          </div>
        </div>
        <div className="col">
          <div className="p-3 border border-dark">{displayEquation}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div onClick={clear} id="clear" className="p-3 border border-dark">
            AC
          </div>
        </div>
        <Operator mathOperator={MathOperator.Add} operatorInput={operatorInput} />
        <Operator mathOperator={MathOperator.Subtract} operatorInput={operatorInput} />
        <Operator mathOperator={MathOperator.Multiply} operatorInput={operatorInput} />
        <Operator mathOperator={MathOperator.Divide} operatorInput={operatorInput} />
        <div className="col">
          <div className="p-3 border border-dark" onClick={decimalInput} id="decimal">
            .
          </div>
        </div>
        <div className="col">
          <div className="p-3 border border-dark" onClick={handleClickEvaluate} id="equals">
            =
          </div>
        </div>
      </div>
      {digits}
    </div>
  );
}
