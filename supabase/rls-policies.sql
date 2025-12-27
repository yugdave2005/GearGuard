-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- GearGuard Database
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Everyone can view all profiles (for assigning technicians, etc.)
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Only admins can insert profiles (handled by trigger anyway)
CREATE POLICY "Admins can insert profiles"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- TEAMS POLICIES
-- ============================================

-- All authenticated users can view teams
CREATE POLICY "Teams are viewable by authenticated users"
  ON public.teams FOR SELECT
  TO authenticated
  USING (true);

-- Only admins and managers can create teams
CREATE POLICY "Admins and managers can create teams"
  ON public.teams FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- Only admins and managers can update teams
CREATE POLICY "Admins and managers can update teams"
  ON public.teams FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- ============================================
-- TEAM_MEMBERS POLICIES
-- ============================================

-- All authenticated users can view team memberships
CREATE POLICY "Team members are viewable by authenticated users"
  ON public.team_members FOR SELECT
  TO authenticated
  USING (true);

-- Admins and managers can manage team memberships
CREATE POLICY "Admins and managers can manage team members"
  ON public.team_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- ============================================
-- EQUIPMENT POLICIES
-- ============================================

-- All authenticated users can view equipment
CREATE POLICY "Equipment is viewable by authenticated users"
  ON public.equipment FOR SELECT
  TO authenticated
  USING (true);

-- Admins and managers can create equipment
CREATE POLICY "Admins and managers can create equipment"
  ON public.equipment FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- Admins, managers, and assigned technicians can update equipment
CREATE POLICY "Authorized users can update equipment"
  ON public.equipment FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND (
        role IN ('admin', 'manager') OR
        id = equipment.assigned_to
      )
    )
  );

-- Only admins can delete equipment
CREATE POLICY "Admins can delete equipment"
  ON public.equipment FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- MAINTENANCE_REQUESTS POLICIES
-- ============================================

-- All authenticated users can view maintenance requests
CREATE POLICY "Maintenance requests are viewable by authenticated users"
  ON public.maintenance_requests FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create maintenance requests
CREATE POLICY "Authenticated users can create maintenance requests"
  ON public.maintenance_requests FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Users can update requests they created or are assigned to,
-- or if they are admin/manager
CREATE POLICY "Authorized users can update maintenance requests"
  ON public.maintenance_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND (
        p.role IN ('admin', 'manager') OR
        p.id = maintenance_requests.assigned_technician_id
      )
    )
  );

-- Only admins can delete maintenance requests
CREATE POLICY "Admins can delete maintenance requests"
  ON public.maintenance_requests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
