export default function FactItem({ fact }) {
  return (
    <li className='mb-4'>
      <div className='rounded overflow-hidden shadow-lg p-8 bg-black'>
        <p className='text-gray-300 text-base'>{fact}</p>
      </div>
    </li>
  );
}
