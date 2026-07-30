// app/api/movies/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const tmdbId = searchParams.get('id');
    const type = searchParams.get('type') || 'movie';

    if (!tmdbId) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const TMDB_BASE_URL = "https://api.themoviedb.org/3";

    try {
        const res = await fetch(`${TMDB_BASE_URL}/${type}/${tmdbId}?language=fa-IR`, {
            headers: {
                'Authorization': `Bearer ${process.env.TMDB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
