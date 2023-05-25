//import { db , QueryResult } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";
import { Todo , NewTodo , db , todoTable } from "@/lib/drizzle";
import { InferModel, eq, sql } from "drizzle-orm";


export async function GET (request : NextRequest) {

    try {
      await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varhar(255))`;

      const res = await db.select().from(todoTable);
      console.log(res)
      return NextResponse.json(res)

    } catch (error) {
        console.log((error as { message : string }).message)
        return NextResponse.json({ msg : "something went wrong" })
    }
};
export async function POST (request : NextRequest) {
    const req = await request.json();
    try {
        if(req.task) {
            // INSERT INTO Todos (Task) VALUES ('task 1')
           // await client.sql`INSERT INTO Todos (Task) VALUES (${req.task})`
           const res = await db.insert(todoTable).values({
            task : req.task
           }).returning()
           console.log(res)
            return NextResponse.json({msg : "data added seccussfully"})
        }else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message : (error as {message : string}).message })
    }
};
export async function PUT(request : NextRequest) {
    const req : Todo = await request.json();
    
    try {
        if(req && request.method == 'PUT') {
            const updatedTodo : any = await db
            .update(todoTable)
            .set({ task: req.task})
            .where(eq(todoTable.id, req.id))
            .returning({ updatedTask : todoTable.task , atId : todoTable.id });
            console.log("updated todo is :",updatedTodo)
            return NextResponse.json(updatedTodo);
        }
    } catch (error) {
        return NextResponse.json({ message : (error as {message : string}).message })
    }
}

  

