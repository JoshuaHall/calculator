import React, { ReactNode, ReactElement } from 'react';

interface LevelProps {
  children: ReactNode;
}

// Takes its children and puts each one of them into a level-item inside of a level
export function LevelWithItems({ children }: LevelProps): ReactElement<LevelProps> {
  return (
    <div className="level">
      {React.Children.map(children, (child) => (
        <div className="level-item">{child}</div>
      ))}
    </div>
  );
}
