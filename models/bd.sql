create database dbwebabancay;
use dbwebabancay;

create table tusers
 (
	idUser char(36) primary key,
    userName varchar(30) not null,
    age int not null,
    email varchar(30) not null,
    password varchar(40) not null,
    created_at datetime,
    updated_at datetime
 )engine=innodb;

create table tcontent(
	idContent char(36) primary key,
    title varchar(40) not null,
    mainContent text not null,
    imageExtension char(4) not null,
    imageExtension1 char(4),
    imageExtension2 char(4),
    location varchar(40) not null,
    entryPrice decimal(2,2) not null,
	timeTravel decimal(2,2) not null,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,--zona horario servidor de bd 😒😒
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)engine=innodb;

