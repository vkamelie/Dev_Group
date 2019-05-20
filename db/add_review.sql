insert into reviews(author_id, school, course, rate, post)
values($1, $2, $3, $4, $5);
select * from reviews;