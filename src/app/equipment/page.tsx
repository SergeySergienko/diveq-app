import dbConnect from '../lib/mongodb';
import Equipment from '../models/Equipment';
import EquipmentForm from '@/components/EquipmentForm';

async function getEquipment() {
  await dbConnect();
  const equipment = await Equipment.find({});
  return equipment;
}
export default async function EquipmentPage() {
  const equipment = await getEquipment();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8'>Manage Equipment</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Add New Equipment</h2>
          <EquipmentForm />
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Equipment List</h2>
          <ul className='space-y-2'>
            {equipment.map((item: any) => (
              <li key={item._id} className='border p-2 rounded'>
                <strong>{item.name}</strong> - ${item.cost}, Purchased:{' '}
                {new Date(item.purchaseDate).toLocaleDateString('uk')},
                Maintenance every {item.maintenancePeriod} days
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
