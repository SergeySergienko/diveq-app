import dbConnect from '../lib/mongodb';
import Equipment from '../models/Equipment';
import Maintenance from '../models/Maintenance';

async function getReportData() {
  await dbConnect();
  const equipment = await Equipment.find({});
  const maintenance = await Maintenance.find({});
  return { equipment, maintenance };
}

export default async function ReportsPage() {
  const { equipment, maintenance } = await getReportData();

  const totalEquipmentCost = equipment.reduce(
    (sum: number, item: any) => sum + item.cost,
    0
  );
  const totalMaintenanceCost = maintenance.reduce(
    (sum: number, record: any) => sum + record.cost,
    0
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8'>Reports</h1>
      <div className='space-y-8'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Equipment Summary</h2>
          <p>Total Equipment: {equipment.length}</p>
          <p>Total Equipment Cost: ${totalEquipmentCost.toFixed(2)}</p>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Maintenance Summary</h2>
          <p>Total Maintenance Records: {maintenance.length}</p>
          <p>Total Maintenance Cost: ${totalMaintenanceCost.toFixed(2)}</p>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>
            Equipment Needing Maintenance
          </h2>
          <ul className='space-y-2'>
            {equipment.map((item: any) => {
              const lastMaintenance = maintenance
                .filter((record: any) => record.equipmentName === item.name)
                .sort(
                  (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )[0];
              const daysSinceLastMaintenance = lastMaintenance
                ? Math.floor(
                    (Date.now() - new Date(lastMaintenance.date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : Infinity;
              if (daysSinceLastMaintenance >= item.maintenancePeriod) {
                return (
                  <li
                    key={item._id}
                    className='border p-2 rounded text-red-600'
                  >
                    <strong>{item.name}</strong> - Last maintenance:{' '}
                    {lastMaintenance
                      ? `${daysSinceLastMaintenance} days ago`
                      : 'Never'}{' '}
                    (Due every {item.maintenancePeriod} days)
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
