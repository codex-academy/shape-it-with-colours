create table shapes(
    id serial not null primary key,
    shape text not null
);

create table colors(
    id serial not null primary key,
    color text not null
);

create table shapes_and_colors(
    id serial not null primary key,
    shape_id int not null,
    foreign key (shape_id) references shapes (id),
    colors_id int not null,
    foreign key (colors_id) references colors (id)
);

insert into shapes(shape) values('Triangle');
insert into shapes(shape) values('Square');
insert into shapes(shape) values('Circle');
insert into shapes(shape) values('Kite');
insert into shapes(shape) values('Star');


insert into colors(color) values('Blue');
insert into colors(color) values('Yellow');
insert into colors(color) values('Red');
insert into colors(color) values('Green');
insert into colors(color) values('Pink');

