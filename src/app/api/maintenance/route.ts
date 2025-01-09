import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Maintenance from '../../models/Maintenance';

export async function GET() {
  await dbConnect();
  const maintenance = await Maintenance.find({});
  return NextResponse.json(maintenance);
}

export async function POST(request: Request) {
  const body = await request.json();
  await dbConnect();
  const newMaintenance = new Maintenance(body);
  await newMaintenance.save();
  return NextResponse.json(newMaintenance, { status: 201 });
}
