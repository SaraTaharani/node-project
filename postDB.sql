CREATE DATABASE IF NOT EXISTS postDB;

USE postDB;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS addresses;

DROP TABLE IF EXISTS todos;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS comments;

DROP TABLE IF EXISTS passwords;

CREATE TABLE addresses (
  id int auto_increment,
  city varchar(50) NOT NULL,
  street varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int auto_increment,
  name varchar(50) NOT NULL,
  username varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(10) NOT NULL,
  addressId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (addressId) REFERENCES addresses (id)
);

CREATE TABLE passwords (
  id int auto_increment,
  userId int,
  password varchar(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE todos (
  userId int,
  id int auto_increment,
  title varchar(50) NOT NULL,
  completed bool,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE posts (
  userId int,
  id int auto_increment,
  title text NOT NULL,
  body text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE comments (
  postId int,
  id int auto_increment,
  name varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  body text NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (postId) REFERENCES posts (id)
);

insert into
  addresses(city, street)
values
  ("Jerusalem", "Avraham Ravitz");

insert into
  addresses(city, street)
values
  ("Jerusalem", "Bait Vagan");

insert into
  passwords(userId, password)
values
  (1, "hildegard.org");

insert into
  passwords(userId, password)
values
  (2, "anastasia.net");

insert into
  todos(userId, title, completed)
values
  (1, "delectus aut autem", false);

insert into
  todos(userId, title, completed)
values
  (2, "quis ut nam facilis et officia qui", false);

insert into
  users(name, username, email, phone, addressId)
values
  (
    "Leanne Graham",
    "L.G.",
    "LeanneGraham@gmail.com",
    "054878463",
    1
  );

insert into
  users(name, username, email, phone, addressId)
values
  (
    "Ervin Howell",
    "E.H.",
    "ErvinHowell@gmail.com",
    "054472956",
    2
  );

insert into
  posts(userId, title, body)
values
(
    1,
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  );

insert into
  posts(userId, title, body)
values
(
    2,
    "qui est esse",
    "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  );

insert into
  comments(postId, name, email, body)
values
(
    1,
    "id labore ex et quam laborum",
    "Eliseo@gardner.biz",
    "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  );

insert into
  comments(postId, name, email, body)
values
(
    2,
    "quo vero reiciendis velit similique earum",
    "Jayne_Kuhic@sydney.com",
    "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  );

select
  *
from
  posts;