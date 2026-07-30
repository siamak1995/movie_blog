import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const HOSTS = [
    "https://image.tmdb.org/t/p",
    "https://media.themoviedb.org/t/p",
];

export async function GET(req) {

    const { searchParams } = new URL(req.url);

    const imagePath = searchParams.get("path");
    const size = searchParams.get("size") || "w500";

    if (!imagePath) {
        return new NextResponse("Bad Request", { status: 400 });
    }

    // اسم فایل
    const fileName = imagePath.split("/").pop();

    // مسیر ذخیره
    const saveDir = path.join(process.cwd(), "public", "images", "banner");

    const saveFile = path.join(saveDir, fileName);

    // اگر قبلا دانلود شده همان فایل را بده
    try {
        await fs.access(saveFile);

        return NextResponse.redirect(
            new URL(`/images/banner/${fileName}`, req.url)
        );

    } catch {}

    await fs.mkdir(saveDir, { recursive: true });

    // اگر وجود نداشت دانلود کن
    for (const host of HOSTS) {

        const url = `${host}/${size}${imagePath}`;

        try {

            const res = await fetch(url);

            if (!res.ok) continue;

            const buffer = Buffer.from(await res.arrayBuffer());

            await fs.writeFile(saveFile, buffer);

            return new NextResponse(buffer, {
                headers: {
                    "Content-Type": res.headers.get("content-type") || "image/jpeg",
                    "Cache-Control": "public,max-age=31536000,immutable"
                }
            });

        } catch {}
    }

    return NextResponse.redirect(
        new URL("/images/placeholder.svg", req.url)
    );
}