import React, { useState } from 'react';

type TypeUserInput = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

function useInput(initialValue: string = ''): [string, (handler: TypeUserInput) => void] {
  const [value, setValue] = useState<string>(initialValue);
  const handler = (e: TypeUserInput) => setValue(e.target.value);
  return [value, handler];
}

export default useInput;
