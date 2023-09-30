import { NextResponse } from "next/server";
import { conn } from "../../../libs/mysql";

// Ruta GET para obtener todos los registros de la tabla "product"
export async function GET() {
  try {
    const result = await conn.query("SELECT * FROM product");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// Ruta POST para insertar un nuevo registro en la tabla "product"
export async function POST(request) {
  try {
    const {
      titulo,
      descripcion,
      fecha_estreno,
      estrellas,
      genero,
      precio_alquiler,
      atp,
      estado,
    } = await request.json();

    const result = await conn.query(
      "INSERT INTO product (titulo, descripcion, fecha_estreno, estrellas, genero, precio_alquiler, atp, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titulo,
        descripcion,
        fecha_estreno,
        estrellas,
        genero,
        precio_alquiler,
        atp,
        estado,
      ]
    );

    return NextResponse.json({
      titulo,
      descripcion,
      fecha_estreno,
      estrellas,
      genero,
      precio_alquiler,
      atp,
      estado,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
