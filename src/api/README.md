# 💻 JobResearch Frontend (Next.js + TypeScript)

This is the frontend of the JobResearch full-stack application. It allows users to log in and manage job listings through a clean, interactive interface, and communicates with a Spring Boot backend via JWT-secured REST APIs.

---

## ✨ Features

- JWT-based login and protected routes
- Job listing with MUI DataGrid and detail view
- Job creation via dialog-based form using controlled components (useState)
- Next.js routing with dynamic route support
- React Query (`@tanstack/react-query`) for async operations and caching
- Built with **Next.js (App Router)** for  server/client flexibility
- Deployed on **Vercel**

---

## 🧱 Tech Stack

- Next.js + TypeScript
- Material UI (MUI)
- Axios
- React Query (v4+ from `@tanstack/react-query`)

---

## 📁 Project Structure

```
src/
├── api/              # Axios config and job API methods (e.g. jobapi.ts)
├── app/              # Next.js app directory (routing, pages, layout)
│   ├── jobs/         
│   │   ├── page.tsx      # Job list page
│   │   └── [id]/page.tsx # Job detail page
│   ├── login/page.tsx    # Login page
│   └── layout.tsx        # Global layout
├── components/       # All major UI components (JobList, Login, etc.)
│   ├── AddJob.tsx
│   ├── EditJob.tsx
│   ├── JobDetail.tsx
│   ├── JobDialogContent.tsx
│   └── JobList.tsx
├── types/            # Type definitions
│   └── types.ts
├── .env              # Environment variables
```

---
## 🔗 Backend API

This app connects to a RESTful backend build with:
- Spring Boot
- PostgreSQL
- JWT authentication

The backend is deployed on Render, and the frontend communicates with it using the base URL specified in the .env file.

---

## ⚙️ React Query Usage

This project uses React Query for managing server state and handling API requests:

- `useQuery` for fetching job details
- `useMutation` for adding/updating jobs
- Automatic cache invalidation via `queryClient.invalidateQueries`

---

## 🚀 Deployment

Frontend: Deployed using Vercel

Backend: Deployed using Render

