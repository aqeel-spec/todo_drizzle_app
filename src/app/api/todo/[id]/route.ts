import { NextRequest, NextResponse } from "next/server";
import { Todo , NewTodo , db , todoTable } from "@/lib/drizzle";
import { eq, sql } from "drizzle-orm";


export async function GET(request : Request , context : any) {

  const { id } = context.params;
    const res = await db.select().from(todoTable).where(eq(todoTable.id, id));
    if(request.method !== 'GET') {
        throw new Error("Invalid Get mettod");
    }
    console.log()
    return NextResponse.json({ Welcome : "Welcome in Todo Appp", Your_Data : res})
}

export async function DELETE( request: NextRequest , context : any) {
    try {
        const { id } = context.params;
        console.log("id from query is",id)
    
    
        if (!id) {
          throw new Error("Invalid id");
        }
    
        const deletedUserIds = await db
          .delete(todoTable)
          .where(eq(todoTable.id, Number(id)))
          .returning({ deletedId: todoTable.id, task: todoTable.task });
    
       // return NextResponse.json(deletedUserIds);
       return new Response(JSON.stringify(deletedUserIds), {
        headers: { 'Content-Type': 'application/json' },
      });
      } catch (error) {
        console.log("Error:", error);
        //return NextResponse.json({ message: (error as { message: string }).message });
        return new Response(JSON.stringify({ message: (error as { message: string }).message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
    }
}
