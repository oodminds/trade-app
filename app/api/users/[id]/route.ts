//GET /api/users
import { User } from "@/app/lib/models/User";
import { DbService } from "@/app/lib/db/cosmosClient";
import { NextResponse } from "next/server";
import next, { NextApiRequest } from "next";

// GET /api/users/:id
export async function GET(req: NextApiRequest, params: { id: string }) {
    const userId = params.id;
    const user = await DbService.getInstance().getUser(userId as string);
    return NextResponse.json(user);
}

// POST /api/users

export async function POST(req: Request) {
    const user = await req.json();
    const newUser = await DbService.getInstance().createUser(user);
    return NextResponse.json(newUser);
}

// PUT /api/users/

export async function PUT(req: Request, paramas: { id: string }) {
    const user = await req.json();
    const updatedUser = await DbService.getInstance().updateUser(user);
    return NextResponse.json(updatedUser);
}

// DELETE /api/users/:id

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    console.log("id", id);
    await DbService.getInstance().deleteUser(id as string);
    return NextResponse.json({ message: "User deleted" });
}
