CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT into blogs (author, url, title, likes)
VALUES ('Helena Carter', 'https://fake-blog-link.com/', 'How to really cook pasta', 33);
INSERT into blogs (author, url, title, likes)
VALUES ('Martin Bohem', 'https://fake-blog-link.com/', 'Why is pizza overrated?', 33);
