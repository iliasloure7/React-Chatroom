import { ReactNode } from 'react';

type FormContainerProps = {
  children: ReactNode;
};

function FormContainer({ children }: FormContainerProps) {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-6 p-6'>
      {children}
    </div>
  );
}

export default FormContainer;
