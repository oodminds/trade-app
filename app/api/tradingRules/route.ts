//GET /api/trades
import { Trade } from "@/app/lib/models/Trade";
import {
    getTradesRules,
    createTradeRules,
    getTradeRules,
    updateTradeRules,
    deleteTradeRules,
} from "@/app/lib/dbops/tradeRules";
import { NextResponse } from "next/server"; // Add this import
import { NextApiRequest } from "next";

export async function GET(req: Request, params: { id: string }) {
    const userId = params.id;
    const tradeRules = await getTradeRules(userId as string);

    return NextResponse.json(tradeRules);
}

//  POST /api/trades

export async function POST(req: Request) {
    const tradeRules = await req.json();
    const newTradeRules = await createTradeRules(tradeRules);
    return NextResponse.json(newTradeRules);
}

// PUT /api/trades

// UpdateTrade function only accept trade object as parameter not id
export async function PUT(req: Request) {
    const tradeRules = await req.json();
    const updatedTradeRules = await updateTradeRules(tradeRules);
    return NextResponse.json(updatedTradeRules);
}

// DELETE /api/trades/:id

export async function DELETE(req: Request) {
    //  get from body
    const { id, uId } = await req.json();
    console.log("id", id);

    await deleteTradeRules(id as string, uId as string);
    return NextResponse.json({ message: "TradeRule deleted" });
}
