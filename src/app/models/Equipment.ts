import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  maintenancePeriod: { type: Number, required: true }, // in days
});

export default mongoose.models.Equipment ||
  mongoose.model('Equipment', EquipmentSchema);
