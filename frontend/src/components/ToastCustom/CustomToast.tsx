import { useState, useEffect, useRef, MutableRefObject } from "react";
import { toast, ToastOptions, ToastContainer } from "react-toastify";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';

interface Alert {
  type: 'success' | 'info' | 'warn' | 'error';
  message: string;
}

const CustomToast = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const showAlertRef: MutableRefObject<((type: Alert['type'], message: string) => void) | null> = useRef(null);

  useEffect(() => {
    showAlertRef.current = showAlert;
  }, []);

  useEffect(() => {
    if (alerts.length > 0) {
      const { type, message } = alerts[0];
      const options = getToastOptions(type);
      if (toast[type]) {
        toast[type](message, options);
      } else {
        toast.error(`ERROR: Le type d'alerte "${type}" n'existe pas !`, options);
      }
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }
  }, [alerts]);

  const showAlert = (type: Alert['type'], message: string) => {
    setAlerts((prevAlerts) => [...prevAlerts, { type, message }]);
  };

  const getToastOptions = (type: Alert['type']): ToastOptions => {
    const baseStyles: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const chakraStyles: { [key in Alert['type']]: ToastOptions } = {
      error: {
        ...baseStyles,
        style: {
          backgroundColor: '#2D3748',
          color: 'white',
        },
        progressStyle: {
          backgroundColor: 'white',
        },
      },
      success: {
        ...baseStyles,
        style: {
          backgroundColor: '#2D3748',
          color: 'white',
        },
        progressStyle: {
          backgroundColor: 'white',
        },
      },
      info: {
        ...baseStyles,
        style: {
          backgroundColor: '#2D3748',
          color: 'white',
        },
        progressStyle: {
          backgroundColor: 'white',
        },
      },
      warn: {
        ...baseStyles,
        style: {
          backgroundColor: '#2D3748',
          color: 'white',
        },
        progressStyle: {
          backgroundColor: 'white',
        },
      },
    };

    return chakraStyles[type];
  };

  return { showAlert, ToastContainer };
};

export default CustomToast;