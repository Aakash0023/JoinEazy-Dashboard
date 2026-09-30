# JoinEazy Assignment Dashboard

A responsive assignment and review dashboard designed for students and faculty to manage assignments, track submissions, and monitor academic progress.

## Overview

JoinEazy provides role-based workspaces for students and faculty with a focus on clear assignment workflows, submission tracking, and responsive UI.

The application is built as a frontend-focused implementation using React, Tailwind CSS, mock data, and browser localStorage.

## Features

### Student Workspace

- View enrolled courses
- View assignments for each course
- View assignment descriptions
- View deadline date and time
- Open external OneDrive submission links
- View individual and group submission types
- Confirm individual assignment submissions
- Two-step submission confirmation
- Group leader acknowledgment flow
- Automatically reflect group acknowledgment across all members
- View submission status
- View overdue assignments
- View overall assignment progress
- Persistent submission state using localStorage
- Responsive mobile navigation

### Faculty Workspace

- View courses being taught
- View course assignment information
- Create assignments
- Edit assignments
- Delete assignments
- Add assignment descriptions
- Set deadline date and time
- Add OneDrive submission links
- Select Individual or Group submission type
- View submitted student count
- View pending student count
- View overdue submissions
- View assignment completion percentage
- View individual student submission status
- View group submission status
- Expandable submission analytics
- Responsive dashboard layout

### Group Submission Flow

Group assignments follow a leader-based acknowledgment workflow.

- Only the group leader can acknowledge a group assignment
- Once the leader confirms submission, all group members see the assignment as submitted
- Group members who are not the leader see a waiting state
- Students without a group receive a prompt to form or join one before submitting

## UI & UX

The interface uses a dark, minimal visual system with a warm amber accent.

Key UI decisions include:

- Dark dashboard interface
- Consistent amber accent system
- Responsive desktop and mobile layouts
- Reusable assignment cards
- Status badges
- Progress indicators
- Expandable analytics sections
- Modal-based assignment workflows
- Hover states and micro-interactions
- Mobile sidebar navigation
- Submission confirmation feedback
- Consistent spacing and typography system

The design focuses on keeping assignment information easy to scan while separating student and faculty workflows clearly.

## Tech Stack

- React.js
- Vite
- JavaScript
- Tailwind CSS
- HTML5
- CSS3
- React Context API
- LocalStorage
- Mock data

## Architecture

The application follows a component-based React architecture.

Application-level state is managed through the React Context API using `AppContext`.

The context manages:

- Current user
- Authentication state
- Courses
- Students
- Faculty
- Groups
- Assignments
- Assignment creation
- Assignment editing
- Assignment deletion
- Submission acknowledgments
- Assignment analytics
- LocalStorage persistence

Reusable UI components are separated from page-level components to keep the application maintainable and easy to extend.

## State Management

`AppContext` acts as the central state layer for the application.

The context provides reusable actions and selectors such as:

- `login()`
- `logout()`
- `addAssignment()`
- `updateAssignment()`
- `deleteAssignment()`
- `acknowledgeAssignment()`
- `getStudentCourses()`
- `getProfessorCourses()`
- `getCourseAssignments()`
- `getStudentGroup()`
- `getAssignmentStatus()`
- `getAssignmentAnalytics()`

## Data Persistence

The project does not require a backend for the frontend demonstration.

Mock data is provided through `src/data/mockData.js`.

Application state is persisted in browser localStorage for:

- Current user
- Assignments
- Courses
- Groups

This allows assignment changes and submission acknowledgments to remain available after refreshing the page.

## Project Structure

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
```
