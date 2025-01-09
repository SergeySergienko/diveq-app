import MaintenanceForm from '@/components/MaintenanceForm';
import dbConnect from '../lib/mongodb';
import Maintenance from '../models/Maintenance';

async function getMaintenance() {
  await dbConnect();
  const maintenance = await Maintenance.find({});
  return maintenance;
}

export default async function MaintenancePage() {
  const maintenance = await getMaintenance();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8'>Manage Maintenance</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>
            Add New Maintenance Record
          </h2>
          <MaintenanceForm />
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Maintenance Records</h2>
          <ul className='space-y-2'>
            {maintenance.map((record: any) => (
              <li key={record._id} className='border p-2 rounded'>
                <strong>{record.equipmentName}</strong> - {record.reason}, Cost:
                ${record.cost}, Result: {record.result}, Responsible:{' '}
                {record.responsiblePerson}, Date:{' '}
                {new Date(record.date).toLocaleDateString('uk')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
