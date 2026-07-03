import { NextRequest, NextResponse } from 'next/server';
import { generateExamples, toHTML } from '@/lib/generator';

export async function POST(req: NextRequest) {
  try {
    const { type, params } = await req.json();

    if (type === 'primery') {
      const examples = generateExamples(params);
      const html = toHTML(examples);

      return NextResponse.json({
        success: true,
        html,
        count: examples.length,
      });
    }

    return NextResponse.json(
      { error: 'Неизвестный тип генератора' },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Ошибка генерации' },
      { status: 500 }
    );
  }
}
