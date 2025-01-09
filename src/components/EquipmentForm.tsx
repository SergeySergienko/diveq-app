'use client';

import { useState } from 'react';

export default function EquipmentForm() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [maintenancePeriod, setMaintenancePeriod] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/equipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        cost: Number(cost),
        purchaseDate,
        maintenancePeriod: Number(maintenancePeriod),
      }),
    });
    if (response.ok) {
      setName('');
      setCost('');
      setPurchaseDate('');
      setMaintenancePeriod('');
      alert('Equipment added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='cost'>Cost</label>
        <input
          id='cost'
          type='number'
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='purchaseDate'>Purchase Date</label>
        <input
          id='purchaseDate'
          type='date'
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='maintenancePeriod'>Maintenance Period (days)</label>
        <input
          id='maintenancePeriod'
          type='number'
          value={maintenancePeriod}
          onChange={(e) => setMaintenancePeriod(e.target.value)}
          required
        />
      </div>
      <button className='btn-primary' type='submit'>
        Add Equipment
      </button>
    </form>
  );
}
