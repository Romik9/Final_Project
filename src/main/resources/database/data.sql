INSERT INTO `role` (`r_name`) VALUES ('owner');
INSERT INTO `role` (`r_name`) VALUES ('managingDirector');
INSERT INTO `role` (`r_name`) VALUES ('chef');
INSERT INTO `role` (`r_name`) VALUES ('manager');
INSERT INTO `role` (`r_name`) VALUES ('administrator');
INSERT INTO `role` (`r_name`) VALUES ('seniorHousemaid');
INSERT INTO `role` (`r_name`) VALUES ('seniorBartender');
INSERT INTO `role` (`r_name`) VALUES ('stateFarm');

INSERT INTO `user` (u_login, u_password) VALUES ('rostyslav@mail.com','1');
INSERT INTO `user` (u_login, u_password) VALUES ('myroslav@mail.com','1');
INSERT INTO `user` (u_login, u_password) VALUES ('vas@mail.com','1');

INSERT INTO `position` (p_title) VALUES ('chef');
INSERT INTO `position` (p_title) VALUES ('housekeeper');

INSERT INTO `vacancy` (p_id, v_salary) VALUES (1, 10000);
INSERT INTO `vacancy` (p_id, v_salary) VALUES (2, 10000);

INSERT  INTO  `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number) VALUES (1, 1, 'Vasyl', 'Kit', 'Vasylovich', '+380556221486');
INSERT  INTO  `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number) VALUES (2, 2, 'Mykola', 'Kit', 'Vasylovich','+380995534219');


INSERT INTO `schedule` (`id`, `p_id`, `start`, `end`) VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO `work_shift` (id, u_id, s_id, date) VALUES (1, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (1, 'first comment', 1);
INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (2, 'second comment', 1);

