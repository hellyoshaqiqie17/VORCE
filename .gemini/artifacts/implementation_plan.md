# Implementation Plan: Vorce Admin Panel Enhancement

## Overview
Comprehensive evaluation and enhancement of the Vorce admin panel to make all features fully functional and add new pages/functionality.

## Current Status Analysis

### Pages with Incomplete/Non-functional Elements:
1. **Dashboard** (`/admin/dashboard`)
   - Quick links to "Izin", "Kinerja", "Arsip", "Kamera", "Log Aktivitas" point to "#"
   - Missing Employee Activity section
   - Approve/Reject buttons need functionality

2. **GPS Camera** (`/admin/gps-camera`)
   - Flash button non-functional (browser limitation)
   - Video mode toggle doesn't enable video recording

3. **Chat** (`/admin/chat`)
   - Send button not sending actual messages
   - Toolbar buttons non-functional

4. **Sidebar**
   - Settings link points to "#"
   - Missing new pages (Archive, Company Account, Info, Employees)

## Implementation Tasks

### Phase 1: Fix Existing Broken Links & Buttons

#### 1.1 Dashboard Quick Links
- Fix "Izin" link → `/admin/izin`
- Fix "Arsip" link → `/admin/archive` (new page)
- Fix "Kamera" link → `/admin/gps-camera`
- Fix "Log Aktivitas" → Add activity log section

#### 1.2 Add Employee Activity Section to Dashboard
- Display recent employee activities (log aktivitas)
- Show: leave requests, task updates, reimbursements, file uploads, etc.

### Phase 2: Create New Pages

#### 2.1 Archive Page (`/admin/archive`)
- Task Archive - completed/archived tasks
- Filter by date, employee, status
- Restore functionality

#### 2.2 Company Account Page (`/admin/company`)
- Company logo and name
- Company info link → `/admin/info`
- Employees link → `/admin/employees`
- About Vorce link (external)
- Vorce policies link
- User privacy link
- Device settings

#### 2.3 Info Page (`/admin/info`)
- Company name (editable)
- Email (editable)
- Address (editable)
- Phone numbers (editable)
- WhatsApp numbers (editable)

#### 2.4 Employees Page (`/admin/employees`)
- List all employees
- Add new employee form
- View individual employee details
- Edit employee info
- Search & filter employees

### Phase 3: Update Sidebar Navigation
- Add Archive link
- Add Company Account link
- Add Employees link
- Add Info link (or nest under Company)

### Phase 4: Employee Profile Modal
- Accessible from any page
- View employee details
- Quick actions (message, assign task, etc.)

## File Changes Required

1. `src/app/admin/dashboard/page.tsx` - Fix links, add activity section
2. `src/app/admin/archive/page.tsx` - NEW
3. `src/app/admin/company/page.tsx` - NEW
4. `src/app/admin/info/page.tsx` - NEW
5. `src/app/admin/employees/page.tsx` - NEW
6. `src/components/Admin/Sidebar.tsx` - Add new nav items
7. `src/components/Admin/EmployeeModal.tsx` - NEW (reusable modal)

## Execution Order
1. Create Archive page
2. Create Employees page
3. Create Company Account page
4. Create Info page
5. Update Dashboard with activity log
6. Fix all quick links on Dashboard
7. Update Sidebar with new navigation items
8. Create reusable Employee Profile Modal
