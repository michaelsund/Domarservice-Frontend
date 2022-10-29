import React from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { Button } from './Button';
import useDeleteEvent from '../Hooks/useDeleteEvent';

interface IProps {
  eventId: number;
}

interface IUseFetchMyEvents {
  sendDelete: any
  success: boolean;
  error: string;
  loaded: boolean;
}

export const DeleteMyEvent = (props: IProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { sendDelete, success, error }: IUseFetchMyEvents = useDeleteEvent();

  return (
    <div>
       <Button text="Ta bort matchen" onClick={() => sendDelete(props.eventId)} />
    </div>
  );
};
