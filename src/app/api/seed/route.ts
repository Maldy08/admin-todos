
import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
        data: [
            { description: 'Piedra del alma', complete: true},
            { description: 'Piedra del poder'},
            { description: 'Piedra del tiempo'},
            { description: 'Piedra del espacio'},
            { description: 'Piedra de la realidad'},
        ]
    })

    return NextResponse.json({ message: 'Seed executed'});
}