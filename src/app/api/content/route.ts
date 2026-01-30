import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const fileBuffer = await fs.readFile(dataFilePath);
    const data = JSON.parse(fileBuffer.toString());
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading content data:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate body if necessary, for now just save it
    await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    console.error("Error saving content data:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
