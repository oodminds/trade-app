
//** GET /api/trades */
import { Trade } from "@/app/lib/models/Trade";
import { DbService } from "@/app/lib/db/cosmosClient";
import { NextResponse } from "next/server"; // Add this import

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); // Updated to extract userId from query parameters
    const trades = await DbService.getInstance().getTrades(userId as string);
    return NextResponse.json(trades);
}

//** POST /api/trades */


export async function POST(req: Request) {
    const trade = await req.json();
    const newTrade = await DbService.getInstance().createTrade(trade);
    return NextResponse.json(newTrade);
}

//** PUT /api/trades/:id */

export async function PUT(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const trade = await req.json();
    const updatedTrade = await DbService.getInstance().updateTrade(id as string, trade);
    return NextResponse.json(updatedTrade);
}

//** DELETE /api/trades/:id */

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await DbService.getInstance().deleteTrade(id as string);
    return NextResponse.json({ message: "Trade deleted" });
}