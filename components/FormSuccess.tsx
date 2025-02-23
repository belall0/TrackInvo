import { FaCircleCheck } from 'react-icons/fa6';

interface FormErrorProps {
  message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-lg text-emerald-500">
      <FaCircleCheck />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
