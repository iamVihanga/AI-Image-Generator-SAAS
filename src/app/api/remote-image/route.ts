import { NextRequest } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    const buffer = await fetch(imageUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const {
      metadata: { height, width },
      ...placeholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return Response.json(
      {
        ...placeholder,
        img: {
          height,
          width,
          imageUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        error:
          (err as Error).message ||
          "Error encountered in generate placeholders",
      },
      { status: 500 }
    );
  }
}
