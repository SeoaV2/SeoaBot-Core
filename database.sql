create user seoabot@localhost identified by '**seoa1234';
create schema seoav2;
grant all privileges on seoav2.* to seoabot@localhost identified by '**seoa1234';

use seoav2;

-- User Table;

create table user
(
	id varchar(20) not null,
	score int default 0 not null,
	solved int default 0 null,
	sg_stage int default 0 not null,
	sg_x int default 0 not null,
	sg_y int default 0 not null
);

create unique index user_id_uindex
	on user (id);

alter table user
	add constraint user_pk
		primary key (id);

-- Guild Table;

create table guild
(
	id varchar(20) not null,
	locale varchar(10) default 'en_US' not null
);

create unique index guild_id_uindex
	on guild (id);

alter table guild
	add constraint guild_pk
		primary key (id);
