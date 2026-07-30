CREATE SCHEMA movie_blog;

SET
search_path TO movie_blog;



CREATE TABLE genres
(
    id         BIGSERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL UNIQUE,
    slug       VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE directors
(
    id         BIGSERIAL PRIMARY KEY,
    full_name  VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE actors
(
    id         BIGSERIAL PRIMARY KEY,
    full_name  VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE movies
(
    id                BIGSERIAL PRIMARY KEY,

    tmdb_id           BIGINT UNIQUE,

    slug              VARCHAR(250) UNIQUE NOT NULL,

    title             VARCHAR(300)        NOT NULL,
    title_fa          VARCHAR(300),

    description       TEXT,

    release_year      SMALLINT,

    imdb              NUMERIC(3, 1),

    duration          VARCHAR(50),

    age_rating        VARCHAR(20),

    likes             VARCHAR(20),

    type              VARCHAR(20)         NOT NULL,

    poster            TEXT,

    backdrop          TEXT,

    trailer           TEXT,

    language          VARCHAR(50),

    country           VARCHAR(100),

    status            VARCHAR(50),

    budget            BIGINT,

    revenue           BIGINT,

    runtime           INTEGER,

    popularity        NUMERIC(10, 2),

    vote_average      NUMERIC(3, 1),

    vote_count        INTEGER,

    homepage          TEXT,

    tagline           TEXT,

    original_language VARCHAR(10),

    original_title    VARCHAR(300),

    has_dubbed        BOOLEAN   DEFAULT FALSE,

    has_subtitle      BOOLEAN   DEFAULT FALSE,

    is_featured       BOOLEAN   DEFAULT FALSE,

    created_at        TIMESTAMP DEFAULT NOW(),

    updated_at        TIMESTAMP DEFAULT NOW(),

    director_id       BIGINT REFERENCES directors (id)
);



CREATE TABLE movie_genres
(
    movie_id BIGINT REFERENCES movies (id) ON DELETE CASCADE,
    genre_id BIGINT REFERENCES genres (id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);



CREATE TABLE movie_actors
(
    movie_id   BIGINT REFERENCES movies (id) ON DELETE CASCADE,
    actor_id   BIGINT REFERENCES actors (id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 1,
    PRIMARY KEY (movie_id, actor_id)
);



CREATE TABLE comments
(
    id          BIGSERIAL PRIMARY KEY,

    movie_id    BIGINT NOT NULL REFERENCES movies (id) ON DELETE CASCADE,

    full_name   VARCHAR(150),

    email       VARCHAR(250),

    comment     TEXT   NOT NULL,

    like_count  INTEGER   DEFAULT 0,

    is_approved BOOLEAN   DEFAULT TRUE,

    created_at  TIMESTAMP DEFAULT NOW()
);



CREATE TABLE ratings
(
    id         BIGSERIAL PRIMARY KEY,

    movie_id   BIGINT NOT NULL REFERENCES movies (id) ON DELETE CASCADE,

    ip_address VARCHAR(100),

    rate       SMALLINT CHECK (rate BETWEEN 1 AND 10),

    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE favorites
(
    id         BIGSERIAL PRIMARY KEY,

    movie_id   BIGINT NOT NULL REFERENCES movies (id) ON DELETE CASCADE,

    ip_address VARCHAR(100),

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (movie_id, ip_address)
);



CREATE INDEX idx_movies_slug ON movies (slug);

CREATE INDEX idx_movies_tmdb ON movies (tmdb_id);

CREATE INDEX idx_movies_year ON movies (release_year);

CREATE INDEX idx_movies_imdb ON movies (imdb);

CREATE INDEX idx_movies_featured ON movies (is_featured);

CREATE INDEX idx_movies_type ON movies (type);

CREATE INDEX idx_comments_movie ON comments (movie_id);

CREATE INDEX idx_rating_movie ON ratings (movie_id);

CREATE INDEX idx_favorite_movie ON favorites (movie_id);


