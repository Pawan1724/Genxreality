import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');

    const seq1Dir = path.join(publicDir, 'Video1-frames');
    const seq2Dir = path.join(publicDir, 'Video2-frames');

    const seq1Files = fs.readdirSync(seq1Dir)
      .filter(f => f.endsWith('.jpg'))
      .sort();

    const seq2Files = fs.readdirSync(seq2Dir)
      .filter(f => f.endsWith('.jpg'))
      .sort();

    return NextResponse.json({
      sequence1: {
        count: seq1Files.length,
        files: seq1Files,
        basePath: '/Video1-frames',
      },
      sequence2: {
        count: seq2Files.length,
        files: seq2Files,
        basePath: '/Video2-frames',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read frame directories' },
      { status: 500 }
    );
  }
}
