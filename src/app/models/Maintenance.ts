import mongoose from 'mongoose';

const MaintenanceSchema = new mongoose.Schema({
  equipmentName: { type: String, required: true },
  reason: { type: String, required: true },
  cost: { type: Number, required: true },
  result: { type: String, required: true },
  responsiblePerson: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Maintenance ||
  mongoose.model('Maintenance', MaintenanceSchema);
