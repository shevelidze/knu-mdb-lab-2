--Enum types
CREATE TYPE mobile_platform as ENUM('android', 'ios');

--Tables
CREATE TABLE "mobile_application_builds" (
  "id" SERIAL PRIMARY KEY,
  "version" TEXT NOT NULL,
  "platform" mobile_platform NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT (NOW())
);

CREATE TABLE "mobile_application_ratings" (
  "build_id" INT NOT NULL,
  "rating" INT NOT NULL
);

ALTER TABLE "mobile_application_ratings" ADD FOREIGN KEY ("build_id") REFERENCES "mobile_application_builds" ("id");

--Data
INSERT INTO mobile_application_builds (version, platform) VALUES('1.0.0', 'ios');
INSERT INTO mobile_application_builds (version, platform) VALUES('1.0.0', 'android');

INSERT INTO mobile_application_builds (version, platform) VALUES('1.0.1', 'ios');
INSERT INTO mobile_application_builds (version, platform) VALUES('1.0.1', 'android');

INSERT INTO mobile_application_ratings (build_id, rating) VALUES(1, 2);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(1, 3);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(1, 2);

INSERT INTO mobile_application_ratings (build_id, rating) VALUES(2, 5);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(2, 4);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(2, 5);

INSERT INTO mobile_application_ratings (build_id, rating) VALUES(3, 3);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(3, 4);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(3, 5);

INSERT INTO mobile_application_ratings (build_id, rating) VALUES(4, 3);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(4, 3);
INSERT INTO mobile_application_ratings (build_id, rating) VALUES(4, 5);
