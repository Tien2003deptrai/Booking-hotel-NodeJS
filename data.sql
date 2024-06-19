CREATE  DATABASE BookingHotel;
USE BookingHotel;

CREATE TABLE Users (
	id int auto_increment primary key,
    username varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    isAdmin boolean default false
);

INSERT INTO Users (username, email, password, isAdmin) values 
	("Ha Phuong", "haphuong@gmail.com", "Haphuong2022", true);

INSERT INTO Users (username, email, password) values 
	("Tien", "duongtien@gmail.com", "Tien2022");
    
select * from Users;

delete from users where id = 2