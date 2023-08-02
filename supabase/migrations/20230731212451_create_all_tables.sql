CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE repos (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  updated_at TIMESTAMP,
  "isPrivate" BOOLEAN
);

CREATE TABLE repo_categories (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  repo_id INT REFERENCES repos(id)
);

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  thumbnail_url VARCHAR(255),
  "isPublic" BOOLEAN NOT NULL
);

CREATE TABLE weekly_meetups (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  thumbnail_url VARCHAR(255),
  "isPublic" BOOLEAN NOT NULL
);

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  name VARCHAR(255) NOT NULL
);
