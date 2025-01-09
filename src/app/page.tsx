import Link from 'next/link';

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8'>Equipment Maintenance MVP</h1>
      <div className='flex gap-4'>
        <Link href='/equipment'>
          <button>Manage Equipment</button>
        </Link>
        <Link href='/maintenance'>
          <button>Manage Maintenance</button>
        </Link>
        <Link href='/reports'>
          <button>View Reports</button>
        </Link>
      </div>
    </div>
  );
}
