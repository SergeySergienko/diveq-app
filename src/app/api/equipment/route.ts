import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Equipment from '../../models/Equipment';

export async function GET() {
  await dbConnect();
  const equipment = await Equipment.find({});
  return NextResponse.json(equipment);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const newEquipment = new Equipment(body);
  await newEquipment.save();
  return NextResponse.json(newEquipment, { status: 201 });
}
