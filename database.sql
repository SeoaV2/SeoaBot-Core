create user seoabot@localhost identified by '**seoa1234';
create schema seoav2;
grant all privileges on seoav2.* to seoabot@localhost identified by '**seoa1234';

use seoav2;

-- User Table;

create table user
(
	id int not null,
	score int default 0 not null,
	solve int default 0 null
);

create unique index user_id_uindex
	on user (id);

alter table user
	add constraint user_pk
		primary key (id);

-- Guild Table;

create table guild
(
	id int not null,
	locale varchar(10) default 'en_US' not null
);

create unique index guild_id_uindex
	on guild (id);

alter table guild
	add constraint guild_pk
		primary key (id);
