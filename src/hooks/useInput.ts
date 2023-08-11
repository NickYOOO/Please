import React, { useState } from 'react'



function useInput(initialValue: string=""):[string,React.Dispatch<React.SetStateAction<string>>,(e:React.ChangeEvent<HTMLInputElement>) => void ] {
  const [value, setValue] = useState<string>(initialValue)
  const handler = (e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  return [value,setValue, handler]
}

export default useInput