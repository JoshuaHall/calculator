import React, { ReactElement, useState } from 'react';
import useEventListener from '@srmagura/use-event-listener';

import { MathOperator, mathOperatorToString, applyOperator } from './mathOperator';

import { Digit } from './Digit';
import { Operator } from './Operator';
import { LevelWithItems } from './LevelWithItems';

const maxInputLength = 13;

const initialInputState = '0';

export function Calculator(): ReactElement<unknown> {
  const [input, setInput] = useState(initialInputState);
  const [operator, setOperator] = useState<MathOperator>();
  const [prevInput, setPrevInput] = useState<string>();

  function evaluate(inputOperator: MathOperator | undefined = undefined): void {
    const inputNum = parseFloat(input);

    if (operator !== undefined && prevInput !== undefined && !Number.isNaN(inputNum)) {
      const prevInputNum = parseFloat(prevInput);

      if (!Number.isNaN(prevInputNum) && Number.isFinite(prevInputNum)) {
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
      setPrevInput(input);
      setInput(digit.toString());
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
        setPrevInput(input);
        setInput(input.includes('-') ? '0' : '-');
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
    if (operator !== undefined && prevInput === undefined) {
      setPrevInput(input);
      setInput('0.');
    } else if (!input.includes('.')) {
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
    <div className="box" id="calculator">
      <div className="field">
        <div className="control">
          <input id="display" value={input} type="text" className="input is-large" readOnly />
        </div>
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-right">
          <div className="level-item">
            <h5 className="subtitle">{displayEquation}</h5>
          </div>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <button onClick={clear} id="clear" className="button">
            AC
          </button>
        </div>
      </div>
      <LevelWithItems>
        <Digit digit={1} digitInput={digitInput} />
        <Digit digit={2} digitInput={digitInput} />
        <Digit digit={3} digitInput={digitInput} />
        <Operator mathOperator={MathOperator.Add} operatorInput={operatorInput} />
      </LevelWithItems>
      <LevelWithItems>
        <Digit digit={4} digitInput={digitInput} />
        <Digit digit={5} digitInput={digitInput} />
        <Digit digit={6} digitInput={digitInput} />
        <Operator mathOperator={MathOperator.Subtract} operatorInput={operatorInput} />
      </LevelWithItems>
      <LevelWithItems>
        <Digit digit={7} digitInput={digitInput} />
        <Digit digit={8} digitInput={digitInput} />
        <Digit digit={9} digitInput={digitInput} />
        <Operator mathOperator={MathOperator.Multiply} operatorInput={operatorInput} />
      </LevelWithItems>
      <LevelWithItems>
        <Digit digit={0} digitInput={digitInput} />
        <button className="button" onClick={decimalInput} id="decimal">
          .
        </button>
        <button className="button is-info" onClick={handleClickEvaluate} id="equals">
          =
        </button>
        <Operator mathOperator={MathOperator.Divide} operatorInput={operatorInput} />
      </LevelWithItems>
    </div>
  );
}
