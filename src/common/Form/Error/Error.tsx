type ErrorProps = {
  errorMessage: string;
};

function Error({ errorMessage }: ErrorProps) {
  return <div className="text-red-600">{errorMessage}</div>;
}

export default Error;
