
CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  food_pic_url VARCHAR(255)
);
