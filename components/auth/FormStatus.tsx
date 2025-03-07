import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6';

type StatusType = 'success' | 'error';
interface FormStatusProps {
  message: string;
  type: StatusType;
}

const FormStatus = ({ message, type }: FormStatusProps) => {
  const configs = {
    success: {
      icon: <FaCircleCheck />,
      bgClass: 'bg-emerald-500/15',
      textClass: 'text-emerald-500',
    },

    error: {
      icon: <FaTriangleExclamation />,
      bgClass: 'bg-destructive/15',
      textClass: 'text-destructive',
    },
  };
  const { icon, bgClass, textClass } = configs[type];

  return (
    <div className={`flex items-center gap-x-2 rounded-md p-3 text-lg ${bgClass} ${textClass}`}>
      {icon}
      <p>{message}</p>
    </div>
  );
};

export default FormStatus;
