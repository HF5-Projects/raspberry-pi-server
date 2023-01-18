create database if not exists scuffedware;

use scuffedware;

create table if not exists devices
(
    `id`            int unsigned auto_increment,
    `name`          varchar(255) not null,
    `created_at`    timestamp not null default CURRENT_TIMESTAMP(),
    `updated_at`    timestamp not null default CURRENT_TIMESTAMP() on update CURRENT_TIMESTAMP(),
    constraint `devices_pk`
        primary key (`id`)
);

create table if not exists device_logs
(
    `id`            int unsigned auto_increment,
    `device_id`     int unsigned not null,
    `message`       varchar(255) not null,
    `created_at`    timestamp not null default CURRENT_TIMESTAMP(),
    `updated_at`    timestamp not null default CURRENT_TIMESTAMP() on update CURRENT_TIMESTAMP(),
    constraint `device_logs_pk`
        primary key (`id`),
    constraint `device_logs_devices_fk`
        foreign key (`device_id`) references devices (`id`)
);

create table if not exists settings
(
    `id`            int unsigned auto_increment,
    `name`          varchar(255) not null,
    `value`         varchar(255) not null,
    `value_type`    varchar(255) not null,
    constraint `settings_pk`
        primary key (`id`)
);