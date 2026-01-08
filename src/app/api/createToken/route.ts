import { NextRequest, NextResponse } from "next/server";
import { createTokenInDb } from "../../db/token/prismaTokens";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const createdToken = await createTokenInDb(body);

    return NextResponse.json(
      { sucess: true, token: createdToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error token create", error);
    return NextResponse.json({ sucess: false, error }, { status: 500 });
  }
}
