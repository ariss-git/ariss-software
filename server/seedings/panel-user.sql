-- Add Admins
INSERT INTO "PanelUser" (id, email, fullname, role, clerk_id) VALUES
('admin-d613bce6-29f6-4f94-8c1b-7c6bb9a9de68', 'saad@gmail.com', 'Saad Sayyed', 'ADMIN', 'user-abcxyz001'),
('admin-1e4b72c9-7c33-4c5b-9a89-74f5f332a002', 'jessica.hall@gmail.com', 'Jessica Hall', 'ADMIN', 'user-abcxyz010'),
('admin-29a74d88-5a7f-412e-845f-2b1a2f33a003', 'ryan.moore@gmail.com', 'Ryan Moore', 'ADMIN', 'user-abcxyz011'),
('admin-3b52e9d9-90f2-4e2a-bb1e-6b4c9f44a004', 'natalie.green@gmail.com', 'Natalie Green', 'ADMIN', 'user-abcxyz012'),
('admin-4d82c2e3-4b9e-47e2-8e8f-3d7d2a55a005', 'kevin.wright@gmail.com', 'Kevin Wright', 'ADMIN', 'user-abcxyz013'),
('admin-5a3d1b44-6d1f-4a42-b31a-2a8e9f66a006', 'chloe.adams@gmail.com', 'Chloe Adams', 'ADMIN', 'user-abcxyz014'),
('admin-6e9f23a7-7c88-49f0-911f-7b4f2b77a007', 'ethan.king@gmail.com', 'Ethan King', 'ADMIN', 'user-abcxyz015'),
('admin-7b1d4a55-8e12-4d77-ae1c-6f3d1a88a008', 'mia.scott@gmail.com', 'Mia Scott', 'ADMIN', 'user-abcxyz016');

-- Add Employees
INSERT INTO "PanelUser" (id, email, fullname, role, clerk_id) VALUES
('employee-51a5577b-57b4-423b-873a-55a559334605', 'trevor@gmail.com', 'Trevor RoZierr', 'EMPLOYEE', 'user-abcxyz002'),
('employee-1f2a334b-7a28-4d2b-83cc-4421aafc9a01', 'emily.smith@gmail.com', 'Emily Smith', 'EMPLOYEE', 'user-abcxyz003'),
('employee-7e93b6c4-4f9d-4535-944d-9bbd7a1c0123', 'michael.johnson@gmail.com', 'Michael Johnson', 'EMPLOYEE', 'user-abcxyz004'),
('employee-2b5d67aa-11ee-49b2-b511-8c9df34a5545', 'olivia.brown@gmail.com', 'Olivia Brown', 'EMPLOYEE', 'user-abcxyz005'),
('employee-3f49a1c7-6b89-4562-9d4e-bd72c6736789', 'daniel.lee@gmail.com', 'Daniel Lee', 'EMPLOYEE', 'user-abcxyz006'),
('employee-91f55c8e-bab4-4b99-bf70-b72b111e9012', 'sophia.taylor@gmail.com', 'Sophia Taylor', 'EMPLOYEE', 'user-abcxyz007'),
('employee-4b0b8f77-2e0f-4af1-93dd-39a8b0b8d901', 'liam.martin@gmail.com', 'Liam Martin', 'EMPLOYEE', 'user-abcxyz008'),
('employee-5d6a9e12-87f4-45ac-b9da-2f4e1a7b3456', 'ava.davis@gmail.com', 'Ava Davis', 'EMPLOYEE', 'user-abcxyz009');


-- Reset table
TRUNCATE TABLE "PanelUser" RESTART IDENTITY;

-- Fetch all
SELECT * FROM "PanelUser";