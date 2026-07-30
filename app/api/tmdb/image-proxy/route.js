import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET(req) {

    const { searchParams } = new URL(req.url);

    const imagePath = searchParams.get("path");
    const size = searchParams.get("size") || "w500";


    if (!imagePath || imagePath === "null") {
        return NextResponse.redirect(
            new URL("/images/placeholder.svg", req.url)
        );
    }


    const cleanPath = imagePath.startsWith("/")
        ? imagePath.substring(1)
        : imagePath;


    const fileName =
        `${size}_${cleanPath.replaceAll("/", "_")}.webp`;


    const cacheDir =
        path.join(
            process.cwd(),
            "public",
            "images",
            "movieImages"
        );


    const cacheFile =
        path.join(cacheDir, fileName);



    // خواندن از کش
    try {

        const cached = await fs.readFile(cacheFile);

        return new NextResponse(cached, {
            headers:{
                "Content-Type":"image/webp",
                "Cache-Control":"public,max-age=31536000"
            }
        });


    } catch {}



    try {


        await fs.mkdir(
            cacheDir,
            {
                recursive:true
            }
        );



        const tmdbUrl =
            `https://image.tmdb.org/t/p/${size}/${cleanPath}`;



        const proxyUrl =
            `https://images.weserv.nl/?url=${encodeURIComponent(tmdbUrl)}&output=webp&q=85`;



        const controller =
            new AbortController();


        const timeout =
            setTimeout(
                ()=>controller.abort(),
                8000
            );



        const response =
            await fetch(
                proxyUrl,
                {
                    signal:controller.signal
                }
            );


        clearTimeout(timeout);



        if(!response.ok){

            throw new Error(
                "Image download failed"
            );

        }



        const buffer =
            Buffer.from(
                await response.arrayBuffer()
            );



        await fs.writeFile(
            cacheFile,
            buffer
        );



        return new NextResponse(
            buffer,
            {
                headers:{
                    "Content-Type":"image/webp",
                    "Cache-Control":"public,max-age=31536000"
                }
            }
        );



    }catch(error){

        console.error(
            "IMAGE CACHE ERROR:",
            error.message
        );


        return NextResponse.redirect(
            new URL(
                "/images/placeholder.svg",
                req.url
            )
        );

    }

}