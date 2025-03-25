
-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create roles table
CREATE TABLE IF NOT EXISTS `roles` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create sectors table
CREATE TABLE IF NOT EXISTS `sectors` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` VARCHAR(36) NOT NULL,
  `role_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
);

-- Create user_sectors table
CREATE TABLE IF NOT EXISTS `user_sectors` (
  `user_id` VARCHAR(36) NOT NULL,
  `sector_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `sector_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE
);

-- Create requests table
CREATE TABLE IF NOT EXISTS `requests` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `requester_id` VARCHAR(36) NOT NULL,
  `assignee_id` VARCHAR(36) NOT NULL,
  `sector_id` VARCHAR(36) NOT NULL,
  `status` ENUM('Open', 'In Progress', 'Closed') NOT NULL DEFAULT 'Open',
  `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`assignee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE
);

-- Create messages table
CREATE TABLE IF NOT EXISTS `messages` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `sender_id` VARCHAR(36) NOT NULL,
  `receiver_id` VARCHAR(36) NOT NULL,
  `content` TEXT,
  `file_path` VARCHAR(255),
  `read` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Insert roles
INSERT INTO `roles` (`id`, `name`) VALUES
  (UUID(), 'Admin'),
  (UUID(), 'Operator'),
  (UUID(), 'Guest');

-- Insert sectors
INSERT INTO `sectors` (`id`, `name`) VALUES
  (UUID(), 'Finance'),
  (UUID(), 'Tax'),
  (UUID(), 'HR'),
  (UUID(), 'Accounting'),
  (UUID(), 'Digital Certificate');

-- Insert users (password is 'password' hashed with bcrypt)
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
  (UUID(), 'Admin User', 'admin@example.com', '$2a$10$JIEyXH6CJM3aJHYN7OZOZu.c6OI9aiDfGQ6c5j.UdFXLgGe5TnQLK'),
  (UUID(), 'Operator User', 'operator@example.com', '$2a$10$JIEyXH6CJM3aJHYN7OZOZu.c6OI9aiDfGQ6c5j.UdFXLgGe5TnQLK'),
  (UUID(), 'Guest User', 'guest@example.com', '$2a$10$JIEyXH6CJM3aJHYN7OZOZu.c6OI9aiDfGQ6c5j.UdFXLgGe5TnQLK');

-- Assign roles to users (this assumes IDs will be found by queries)
INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT u.id, r.id
FROM `users` u, `roles` r
WHERE u.email = 'admin@example.com' AND r.name = 'Admin';

INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT u.id, r.id
FROM `users` u, `roles` r
WHERE u.email = 'operator@example.com' AND r.name = 'Operator';

INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT u.id, r.id
FROM `users` u, `roles` r
WHERE u.email = 'guest@example.com' AND r.name = 'Guest';

-- Assign sectors to users
INSERT INTO `user_sectors` (`user_id`, `sector_id`)
SELECT u.id, s.id
FROM `users` u, `sectors` s
WHERE u.email = 'admin@example.com' AND s.name IN ('Finance', 'Tax', 'Digital Certificate');

INSERT INTO `user_sectors` (`user_id`, `sector_id`)
SELECT u.id, s.id
FROM `users` u, `sectors` s
WHERE u.email = 'operator@example.com' AND s.name IN ('HR', 'Accounting');

INSERT INTO `user_sectors` (`user_id`, `sector_id`)
SELECT u.id, s.id
FROM `users` u, `sectors` s
WHERE u.email = 'guest@example.com' AND s.name IN ('Digital Certificate');

-- Insert sample requests
INSERT INTO `requests` (`id`, `title`, `description`, `requester_id`, `assignee_id`, `sector_id`, `status`, `priority`)
SELECT UUID(), 'Digital Certificate Renewal', 'Need to renew the company digital certificate that expires next month', 
       u1.id, u2.id, s.id, 'Open', 'High'
FROM `users` u1, `users` u2, `sectors` s
WHERE u1.email = 'admin@example.com' AND u2.email = 'operator@example.com' AND s.name = 'Digital Certificate';

INSERT INTO `requests` (`id`, `title`, `description`, `requester_id`, `assignee_id`, `sector_id`, `status`, `priority`)
SELECT UUID(), 'System Access Request', 'Request for access to the financial reporting system for the new hire', 
       u1.id, u2.id, s.id, 'In Progress', 'Medium'
FROM `users` u1, `users` u2, `sectors` s
WHERE u1.email = 'guest@example.com' AND u2.email = 'admin@example.com' AND s.name = 'Finance';

INSERT INTO `requests` (`id`, `title`, `description`, `requester_id`, `assignee_id`, `sector_id`, `status`, `priority`)
SELECT UUID(), 'Tax Document Approval', 'Approval needed for the quarterly tax filing documents', 
       u1.id, u2.id, s.id, 'Closed', 'Medium'
FROM `users` u1, `users` u2, `sectors` s
WHERE u1.email = 'operator@example.com' AND u2.email = 'admin@example.com' AND s.name = 'Tax';

-- Insert sample messages
INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `read`)
SELECT UUID(), u1.id, u2.id, 'Hello, can you help me with the tax documents?', TRUE
FROM `users` u1, `users` u2
WHERE u1.email = 'operator@example.com' AND u2.email = 'admin@example.com';

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `read`)
SELECT UUID(), u1.id, u2.id, 'Sure, I can review them for you. What exactly do you need?', TRUE
FROM `users` u1, `users` u2
WHERE u1.email = 'admin@example.com' AND u2.email = 'operator@example.com';

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `read`)
SELECT UUID(), u1.id, u2.id, 'I need help with the digital certificate renewal process', FALSE
FROM `users` u1, `users` u2
WHERE u1.email = 'guest@example.com' AND u2.email = 'admin@example.com';
