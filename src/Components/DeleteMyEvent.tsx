import React, { useEffect } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { Button } from './Button';
import useDeleteEvent from '../Hooks/useDeleteEvent';

interface IProps {
  eventId: number;
  parentReload: any;
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

  useEffect(() => {
    if (success) {
      props.parentReload();
    }
  }, [success]);

  return (
    <div>
       <Button text="Ta bort matchen" onClick={() => sendDelete(props.eventId)} />
    </div>
  );
};
