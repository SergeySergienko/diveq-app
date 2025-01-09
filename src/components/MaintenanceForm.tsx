'use client';

import { useState } from 'react';

export default function MaintenanceForm() {
  const [equipmentName, setEquipmentName] = useState('');
  const [reason, setReason] = useState('');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        equipmentName,
        reason,
        cost: Number(cost),
        result,
        responsiblePerson,
      }),
    });
    if (response.ok) {
      setEquipmentName('');
      setReason('');
      setCost('');
      setResult('');
      setResponsiblePerson('');
      alert('Maintenance record added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='equipmentName'>Equipment Name</label>
        <input
          id='equipmentName'
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='reason'>Reason</label>
        <textarea
          id='reason'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
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
        <label htmlFor='result'>Result</label>
        <textarea
          id='result'
          value={result}
          onChange={(e) => setResult(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor='responsiblePerson'>Responsible Person</label>
        <input
          id='responsiblePerson'
          value={responsiblePerson}
          onChange={(e) => setResponsiblePerson(e.target.value)}
          required
        />
      </div>
      <button className='btn-primary' type='submit'>
        Add Maintenance Record
      </button>
    </form>
  );
}
