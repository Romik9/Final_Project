DROP TABLE IF EXISTS `task`;
DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `work_shift`;
DROP TABLE IF EXISTS `schedule`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role`;

CREATE TABLE IF NOT EXISTS `role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `r_name` VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `r_id` BIGINT NOT NULL,
  `u_login` VARCHAR(32) NOT NULL UNIQUE,
  `u_password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`r_id`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `r_id` BIGINT NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`r_id`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `work_shift` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT,
  `s_id` BIGINT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`s_id`) REFERENCES `schedule`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `w_shift_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`w_shift_id`) REFERENCES `work_shift`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `employee` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT,
  `e_forename` VARCHAR(32) NOT NULL,
  `e_surname` VARCHAR(32) NOT NULL,
  `e_patronymic` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `employee` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT UNIQUE,
  `e_forename` VARCHAR(32) NOT NULL,
  `e_surname` VARCHAR(32) NOT NULL,
  `e_patronymic` VARCHAR(32),
  `e_telephone` VARCHAR(15) UNIQUE,
  `e_position` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `location` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `l_title` VARCHAR(50) NOT NULL,
  `l_info` VARCHAR(127),
  CONSTRAINT `l_title_info` UNIQUE (`l_title`, `l_info`),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `task` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `t_author_u_id` BIGINT NOT NULL,
  `t_assignee_u_id` BIGINT NOT NULL,
  `l_id` BIGINT NOT NULL,
  `t_status` VARCHAR(32) NOT NULL CHECK (`t_status` IN ('ACTIVE', 'CLOSED', 'PROCESSING', 'FINISHED')),
  `t_text` VARCHAR(500) NOT NULL,
  `t_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `t_status_changed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`t_assignee_u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`t_author_u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`l_id`) REFERENCES  `location`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;