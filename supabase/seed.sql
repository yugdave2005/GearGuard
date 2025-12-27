-- Super Seed Script for GearGuard
-- Generates:
-- 10 Dummy Users (auth.users + profiles)
-- 4 Teams
-- 50 Equipment Items
-- 100 Maintenance Requests

-- NOTE: We insert into auth.users first to satisfy Foreign Key constraints.

-- 1. Create Dummy Users in auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES
  ('11111111-1111-4111-a111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'john.sparks@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "John Sparks"}', NOW(), NOW(), '', '', '', ''),
  ('22222222-2222-4222-a222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'sarah.wires@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Sarah Wires"}', NOW(), NOW(), '', '', '', ''),
  ('33333333-3333-4333-a333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'mike.hammer@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Mike Hammer"}', NOW(), NOW(), '', '', '', ''),
  ('44444444-4444-4444-a444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'emily.pipes@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Emily Pipes"}', NOW(), NOW(), '', '', '', ''),
  ('55555555-5555-4555-a555-555555555555', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'david.drill@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "David Drill"}', NOW(), NOW(), '', '', '', ''),
  ('66666666-6666-4666-a666-666666666666', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'lisa.volt@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Lisa Volt"}', NOW(), NOW(), '', '', '', ''),
  ('77777777-7777-4777-a777-777777777777', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'tom.gear@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Tom Gear"}', NOW(), NOW(), '', '', '', ''),
  ('88888888-8888-4888-a888-888888888888', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'anna.fuse@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Anna Fuse"}', NOW(), NOW(), '', '', '', ''),
  ('99999999-9999-4999-a999-999999999999', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'james.wrench@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "James Wrench"}', NOW(), NOW(), '', '', '', ''),
  ('00000000-0000-4000-a000-000000000000', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'robert.bolt@example.com', 'dummy_hash', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name": "Robert Bolt"}', NOW(), NOW(), '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Teams
INSERT INTO teams (id, name, description)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Alpha Squad', 'Primary response team for heavy machinery'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Beta Electrical', 'Specialists in high-voltage systems and circuitry'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Gamma HVAC', 'Climate control and ventilation experts'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Delta Plumbing', 'Hydraulics and piping infrastructure')
ON CONFLICT (id) DO NOTHING;

-- 3. Create Profiles
INSERT INTO profiles (id, full_name, role, avatar_url, updated_at)
VALUES
  ('11111111-1111-4111-a111-111111111111', 'John Sparks', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', NOW()),
  ('22222222-2222-4222-a222-222222222222', 'Sarah Wires', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', NOW()),
  ('33333333-3333-4333-a333-333333333333', 'Mike Hammer', 'manager', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', NOW()),
  ('44444444-4444-4444-a444-444444444444', 'Emily Pipes', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', NOW()),
  ('55555555-5555-4555-a555-555555555555', 'David Drill', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', NOW()),
  ('66666666-6666-4666-a666-666666666666', 'Lisa Volt', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', NOW()),
  ('77777777-7777-4777-a777-777777777777', 'Tom Gear', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', NOW()),
  ('88888888-8888-4888-a888-888888888888', 'Anna Fuse', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', NOW()),
  ('99999999-9999-4999-a999-999999999999', 'James Wrench', 'viewer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', NOW()),
  ('00000000-0000-4000-a000-000000000000', 'Robert Bolt', 'technician', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  avatar_url = EXCLUDED.avatar_url;

-- 4. Assign Members to Teams
INSERT INTO team_members (profile_id, team_id)
VALUES
  ('11111111-1111-4111-a111-111111111111', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  ('77777777-7777-4777-a777-777777777777', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'), 
  ('22222222-2222-4222-a222-222222222222', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
  ('66666666-6666-4666-a666-666666666666', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
  ('44444444-4444-4444-a444-444444444444', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44')
ON CONFLICT DO NOTHING;

-- 5. Generate Equipment (Fixed: Type Casting)
INSERT INTO equipment (name, serial_number, location, department, maintenance_team_id, status)
SELECT 
  CASE (i % 5)
    WHEN 0 THEN 'Hydraulic Press ' || i
    WHEN 1 THEN 'Conveyor Belt System ' || i
    WHEN 2 THEN 'Industrial Chiller ' || i
    WHEN 3 THEN 'Robotic Arm ' || i
    ELSE 'Emergency Generator ' || i
  END as name,
  'SN-' || 2024000 + i as serial_number,
  CASE (i % 4)
    WHEN 0 THEN 'Wing A - Production'
    WHEN 1 THEN 'Wing B - Assembly'
    WHEN 2 THEN 'Basement Utility'
    ELSE 'Rooftop'
  END as location,
  CASE (i % 3)
    WHEN 0 THEN 'Manufacturing'
    WHEN 1 THEN 'Logistics'
    ELSE 'Facilities'
  END as department,
  CASE (i % 4)
    WHEN 0 THEN 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid
    WHEN 1 THEN 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'::uuid
    WHEN 2 THEN 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'::uuid
    ELSE 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44'::uuid
  END as maintenance_team_id,
  CASE 
    WHEN i > 45 THEN 'scrap'::equipment_status
    ELSE 'active'::equipment_status
  END as status
FROM generate_series(1, 50) as i;

-- 6. Generate Maintenance Requests (Fixed: Type Casting)
INSERT INTO maintenance_requests (
  equipment_id, 
  team_id, 
  assigned_technician_id, 
  subject, 
  description, 
  request_type, 
  status, 
  scheduled_date, 
  duration,
  created_at
)
SELECT
  e.id as equipment_id,
  e.maintenance_team_id as team_id,
  CASE (i % 3)
     WHEN 0 THEN '11111111-1111-4111-a111-111111111111'::uuid
     WHEN 1 THEN '22222222-2222-4222-a222-222222222222'::uuid
     ELSE NULL
  END as assigned_technician_id,
  CASE (i % 5)
    WHEN 0 THEN 'Monthly Inspection'
    WHEN 1 THEN 'Unusual Noise Check'
    WHEN 2 THEN 'Filter Replacement'
    WHEN 3 THEN 'Calibration Required'
    ELSE 'Emergency Shutdown analysis'
  END as subject,
  'Automated generation request description for testing purposes.' as description,
  CASE (i % 2)
    WHEN 0 THEN 'preventive'::request_type
    ELSE 'corrective'::request_type
  END as request_type,
  CASE (i % 10)
    WHEN 0 THEN 'new'::request_status
    WHEN 1 THEN 'in_progress'::request_status
    WHEN 2 THEN 'repaired'::request_status
    WHEN 3 THEN 'scrap'::request_status
    WHEN 4 THEN 'new'::request_status
    WHEN 5 THEN 'in_progress'::request_status
    WHEN 6 THEN 'repaired'::request_status
    WHEN 7 THEN 'new'::request_status
    WHEN 8 THEN 'in_progress'::request_status
    ELSE 'repaired'::request_status
  END as status,
  NOW() + (i - 50) * INTERVAL '1 day' + (i % 24) * INTERVAL '1 hour',
  (i % 4 + 1) * 60,
  NOW() - (i % 10) * INTERVAL '1 day'
FROM generate_series(1, 100) as i
JOIN equipment e ON e.serial_number = 'SN-' || (2024000 + (i % 50) + 1);
