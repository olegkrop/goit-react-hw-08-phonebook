import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger = api => next => action => {
  if (isRejectedWithValue(action)) {
    toast.error(action.error.message);
  }

  return next(action);
};
