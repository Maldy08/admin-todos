import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient, Todo } from "@prisma/client"
import *  as yup from 'yup';

const prisma = new PrismaClient()

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async( id: string ):Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id } });
  
    return todo;
  }

  
export async function GET(request: Request, { params } :Segments) { 

    const { id } = params;
    const todo = await prisma.todo.findFirst({ where: { id }});
    if(!todo) {
        return NextResponse.json({ message: `Todo con id ${ id } no existe`}, { status: 404})
    }
  return NextResponse.json(params.id);
}



const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
  })
  
  export async function PUT(request: Request, { params }: Segments ) { 
  
    
    const todo = await getTodo(params.id);
  
    if ( !todo ) {
      return NextResponse.json({ message: `Todo con id ${ params.id } no exite` }, { status: 404 });
    }
  
    try {
      const { complete, description } =  await putSchema.validate( await request.json() );
    
    
      const updatedTodo = await prisma.todo.update({
        where: { id: params.id },
        data: { complete, description }
      })
    
    
    
      return NextResponse.json(updatedTodo);
      
    } catch (error) {
      return NextResponse.json(error, { status: 400 });
    }
  }