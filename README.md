# JoinEazy Assignment Dashboard

A responsive assignment management dashboard built for students and faculty to manage assignments, track submissions, and monitor academic progress.

## Overview

JoinEazy provides separate workspaces for students and faculty.

Students can:

- View their assignments
- Check due dates and submission links
- Track overall completion
- Confirm assignment submissions through a two-step verification flow
- View their submission status

Faculty can:

- Create assignments
- Add descriptions, due dates, and Google Drive links
- View student submission progress
- Track individual student submission status
- Monitor overall assignment completion

The application uses mock data and browser localStorage instead of a backend.

## Features

### Student Dashboard

- Assignment overview
- Submission statistics
- Overall progress tracking
- Assignment status indicators
- Google Drive submission links
- Double-confirmation before marking an assignment as submitted
- Persistent submission state using localStorage
- Responsive mobile navigation

### Faculty Dashboard

- Assignment statistics
- Create assignment workflow
- Assignment-level submission progress
- Individual student submission status
- Student progress indicators
- Expandable student lists
- Google Drive links
- Responsive dashboard layout

### UI & Interaction

- Dark dashboard interface
- Warm yellow accent system
- Responsive layout
- Animated navigation interactions
- Smooth section navigation
- Active sidebar tracking
- Hover states and micro-interactions
- Responsive modal dialogs
- Mobile sidebar drawer

## Tech Stack

- React.js
- Vite
- JavaScript
- Tailwind CSS
- HTML5
- CSS3
- LocalStorage
- Mock data

## Architecture

The application follows a component-based React architecture.

Application-level state is managed using React Context API through `AppContext`.

The context handles:

- Current authenticated user
- Assignment data
- Student data
- Faculty data
- Assignment creation
- Submission status updates
- LocalStorage persistence

The UI is divided into reusable components for navigation, layouts, assignments, progress indicators, and modal workflows.

## Folder Structure

```text
src/
├── components/
│   ├── admin/
│   │   ├── AssignmentAdminCard.jsx
│   │   └── CreateAssignmentModal.jsx
│   ├── layout/
│   │   └── DashboardLayout.jsx
│   ├── AssignmentCard.jsx
│   ├── Navbar.jsx
│   ├── ProgressBar.jsx
│   ├── Sidebar.jsx
│   └── StatusBadge.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── AdminDashboard.jsx
│   ├── Login.jsx
│   └── StudentDashboard.jsx
│
├── App.jsx
├── index.css
└── main.jsx