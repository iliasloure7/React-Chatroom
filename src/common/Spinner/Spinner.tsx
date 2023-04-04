import spinner from '../../assets/images/svg/spinner.svg';

function Spinner() {
  return (
    <div>
      <img src={spinner} alt='spinner' className='block mx-auto w-28' />
    </div>
  );
}

export default Spinner;
