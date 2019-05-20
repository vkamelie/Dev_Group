drop table if exists users;
drop table if exists reviews;

create table users(
user_id serial primary key
);


create table reviews(
id serial primary key,
author_id int references users(user_id),
school text not null, 
course text not null, 
rate int not null,
post text not null
);

insert into users(user_id)
values('1');

insert into reviews(author_id, school, course, rate, post)
values('1', 'devyM', 'webDev', 5, 'life chaninging yo'),
('1', 'devyM', 'webDev', 5, 'life chaninging yo'),
('1', 'devyM', 'webDev', 5, 'life chaninging yo');