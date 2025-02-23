import { FaTriangleExclamation } from 'react-icons/fa6';

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-lg text-destructive">
      <FaTriangleExclamation />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
