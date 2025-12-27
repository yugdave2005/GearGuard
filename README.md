# GearGuard - Complete Setup Instructions

## 1. Supabase Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details and wait for setup to complete

### Step 2: Run Database Schema
1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase/schema.sql`
3. Click "Run" to execute the schema
4. Copy and paste the contents of `supabase/rls-policies.sql`
5. Click "Run" to execute the RLS policies

### Step 3: Get API Credentials
1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the **Project URL** and **anon public** key
3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Run the Application

### Install Dependencies (if not already done)
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 3. Initial Usage

### Create First User
1. Navigate to **http://localhost:3000/signup**
2. Create an account with your email and password
3. You'll be automatically redirected to the dashboard

### Add Sample Data (Optional)

#### Create a Team
```sql
INSERT INTO teams (name, description) VALUES 
('Maintenance Team A', 'Primary maintenance team');
```

#### Create Equipment
```sql
INSERT INTO equipment (name, serial_number, location, department, maintenance_team_id) VALUES
('Industrial Pump #1', 'PUMP-001', 'Building A', 'Manufacturing', 
  (SELECT id FROM teams WHERE name = 'Maintenance Team A'));
```

#### Create Maintenance Request
```sql
INSERT INTO maintenance_requests (equipment_id, subject, request_type, scheduled_date) VALUES
((SELECT id FROM equipment WHERE serial_number = 'PUMP-001'), 
 'Routine Inspection', 'preventive', NOW() + INTERVAL '7 days');
```

## 4. Features Overview

### Dashboard (Kanban Board)
- **Drag-and-drop** maintenance requests between status columns
- **Real-time updates** - changes sync across all users
- **Overdue indicators** - red badges for past-due requests
- **Status columns**: New, In Progress, Repaired, Scrap

### Calendar View
- View all **preventive maintenance** requests
- Monthly and weekly views
- Color-coded by status

### Equipment Management
- **Search** equipment by name or serial number
- View all equipment with status badges
- **Detailed view** includes:
  - Purchase and warranty information
  - Location and department
  - Assigned technician and maintenance team
  - **Maintenance History** - complete timeline of all work

### Smart Features
- **Auto-assignment**: When creating a request for equipment, the maintenance team is automatically assigned
- **Scrap workflow**: Moving a request to "Scrap" automatically marks the equipment as scrap status

## 5. Development Tips

### Type Safety
Run type checking:
```bash
npm run type-check
```

### Build for Production
```bash
npm run build
npm start
```

### Dark Mode
Toggle dark mode using the sun/moon icon in the header

## 6. Troubleshooting

### "Invalid API Key" Error
- Verify that `.env.local` exists and contains correct Supabase credentials
- Restart the dev server after creating/updating `.env.local`

### Database Connection Issues
- Ensure RLS policies are executed
- Check that schema was created successfully in Supabase SQL Editor

### Login Issues
- Verify email confirmation is disabled in Supabase Auth settings for development
- Go to **Authentication** > **Email** in Supabase dashboard

## Project Structure

```
gearguard/
├── app/
│   ├── (auth)/              # Login & Signup pages
│   ├── (dashboard)/         # Dashboard routes
│   │   ├── calendar/        # Calendar view
│   │   ├── equipment/       # Equipment management
│   │   └── page.tsx         # Kanban dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── kanban/              # Kanban board components
│   ├── calendar/            # Calendar components
│   ├── layout/              # Sidebar & Header
│   └── ui/                  # UI primitives
├── hooks/                   # Custom React hooks
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── providers/           # React providers
│   └── utils.ts             # Utility functions
├── types/                   # TypeScript types
└── supabase/                # SQL schemas
```

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **State**: TanStack Query
- **Drag & Drop**: @hello-pangea/dnd
- **Calendar**: react-big-calendar
