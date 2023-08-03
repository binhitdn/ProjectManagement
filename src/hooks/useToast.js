import {useDispatch} from 'react-redux';
import {showToast, hideToast} from '@redux/slices/toastSlice';

// Toastを表示するためのカスタムhook
export const useToast = () => {
  const dispatch = useDispatch();

  const showMessage = message => {
    dispatch(showToast(message));
    setTimeout(() => dispatch(hideToast()), 4000);
  };
  return {showMessage};
};
