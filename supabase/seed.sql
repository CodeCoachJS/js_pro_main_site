INSERT INTO categories (name) VALUES
  ('Web Development'),
  ('Data Science'),
  ('Machine Learning'),
  ('Mobile Development'),
  ('Game Development');

INSERT INTO repos (name, url, description, updated_at, "isPrivate") VALUES
  ('Repo1', 'https://github.com/repo1', 'Web development project', NOW(), FALSE),
  ('Repo2', 'https://github.com/repo2', 'Data science project', NOW(), TRUE),
  ('Repo3', 'https://github.com/repo3', 'Machine learning project', NOW(), FALSE),
  ('Repo4', 'https://github.com/repo4', 'Mobile development project', NOW(), TRUE),
  ('Repo5', 'https://github.com/repo5', 'Game development project', NOW(), FALSE),
  ('Repo6', 'https://github.com/repo6', 'Web development project', NOW(), FALSE),
  ('Repo7', 'https://github.com/repo7', 'Data science project', NOW(), TRUE),
  ('Repo8', 'https://github.com/repo8', 'Machine learning project', NOW(), FALSE),
  ('Repo9', 'https://github.com/repo9', 'Mobile development project', NOW(), TRUE),
  ('Repo10', 'https://github.com/repo10', 'Game development project', NOW(), FALSE);

-- Inserting repo-category associations
INSERT INTO repo_categories (category_id, repo_id) VALUES
  (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
  (1, 6), (2, 7), (3, 8), (4, 9), (5, 10);


INSERT INTO videos (url, description, "isPublic") VALUES
  ('https://www.example.com/video1', 'Video description 1', TRUE),
  ('https://www.example.com/video2', 'Video description 2', FALSE),
  ('https://www.example.com/video3', 'Video description 3', TRUE),
  ('https://www.example.com/video4', 'Video description 4', FALSE),
  ('https://www.example.com/video5', 'Video description 5', TRUE);


INSERT INTO weekly_meetups (url, description, "isPublic") VALUES
  ('https://www.example.com/meetup1', 'Meetup description 1', TRUE),
  ('https://www.example.com/meetup2', 'Meetup description 2', FALSE),
  ('https://www.example.com/meetup3', 'Meetup description 3', TRUE),
  ('https://www.example.com/meetup4', 'Meetup description 4', FALSE),
  ('https://www.example.com/meetup5', 'Meetup description 5', TRUE);


INSERT INTO documents (url, description, name) VALUES
  ('https://www.example.com/document1', 'Document description 1', 'Document1'),
  ('https://www.example.com/document2', 'Document description 2', 'Document2'),
  ('https://www.example.com/document3', 'Document description 3', 'Document3'),
  ('https://www.example.com/document4', 'Document description 4', 'Document4'),
  ('https://www.example.com/document5', 'Document description 5', 'Document5');
