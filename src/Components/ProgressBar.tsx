import React, { useEffect, useState } from 'react';

interface IProps {
  percent: number;
}

export const ProgressBar = (props: IProps) => {
  const [value, setValue] = useState<string>(`${props.percent}%`);

  useEffect(() => {
    setValue(`${props.percent}%`);
  }, [props.percent]);

  return (
    <div className="w-full bg-gray-200 rounded h-2.5 mb-4 dark:bg-gray-700">
      <div className="bg-green-600 h-2.5 rounded" style={{ width: value }} />
    </div>
  );
};
