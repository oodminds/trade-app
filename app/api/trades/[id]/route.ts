//GET /api/trades
import { Trade } from "@/app/lib/models/Trade";
import {
    getTrades,
    createTrade,
    getTrade,
    updateTrade,
    deleteTrade,
} from "@/app/lib/dbops/tradeOps";
import { NextResponse } from "next/server"; // Add this import
import { NextApiRequest } from "next";

export async function GET(req: Request, params: { id: string }) {
    const userId = params.id;
    const trades = await getTrades(userId as string);

    return NextResponse.json(trades);
}

//  POST /api/trades

export async function POST(req: Request) {
    const trade = await req.json();
    const newTrade = await createTrade(trade);
    return NextResponse.json(newTrade);
}

// PUT /api/trades

// UpdateTrade function only accept trade object as parameter not id
export async function PUT(req: Request) {
    const trade = await req.json();
    const updatedTrade = await updateTrade(trade);
    return NextResponse.json(updatedTrade);
}

// DELETE /api/trades/:id

export async function DELETE(req: Request) {
    //  get from body
    const { id, uId } = await req.json();
    console.log("id", id);

    await deleteTrade(id as string, uId as string);
    return NextResponse.json({ message: "Trade deleted" });
}
