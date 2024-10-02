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
    nameImage0 char(40) not null,--ALTER TABLE tcontent CHANGE nameImage nameImage0 CHAR(40);
    nameImage1 char(40),
    nameImage2 char(40),
    nameImage3 char(40),
    nameImage4 char(40),
    location varchar(40) not null,
    entryPrice decimal(5,2) not null,
	timeTravel decimal(5,2) not null,--deberúia ser en hora.ejempl 0.50
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,--zona horario servidor de bd 😒😒
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)engine=innodb;

