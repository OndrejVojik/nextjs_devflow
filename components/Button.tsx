
import React from 'react';
import clsx from 'clsx';

const Button: React.FC = () => {
  const buttonClass = clsx('btn', 'btn-primary', 'non-existent-class');

  return (
    <button className={buttonClass}>
      Click Me
    </button>
  );
};

export default Button;