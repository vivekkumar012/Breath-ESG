# Breathe ESG — ESG Data Ingestion & Review Platform

A production-style prototype ESG platform built for enterprise sustainability reporting workflows.

This system ingests emissions and operational activity data from multiple enterprise sources, normalizes records into a common schema, surfaces suspicious or incomplete records for analyst review, and preserves audit traceability for downstream assurance workflows.

---

# Live Architecture

```txt
Enterprise Sources
    ↓
Ingestion Layer
    ↓
Normalization Engine
    ↓
Validation Rules
    ↓
Analyst Review Queue
    ↓
Approval + Audit Trail
```

---

# Tech Stack

## Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL

## Frontend

* React
* Vite
* Tailwind CSS

## Deployment

* Render
* Vercel
* Neon PostgreSQL

---

# Supported Sources

## 1. SAP Fuel & Procurement Data

* CSV flat-file export ingestion
* Handles:

  * German headers
  * inconsistent units
  * plant codes
  * malformed dates

## 2. Utility Electricity Data

* Utility portal CSV exports
* Handles:

  * meter IDs
  * billing periods
  * non-calendar month alignment

## 3. Corporate Travel Data

* Mock Concur-style API payload
* Handles:

  * airport codes
  * travel class
  * inferred travel distance

---

# Core Features

* Multi-source ingestion
* Data normalization
* Validation engine
* Analyst review queue
* Approval workflow
* Audit logging
* Multi-tenancy support
* Raw payload preservation
* Source lineage tracking

---

# Folder Structure

```txt
breathe-esg/
│
├── server/
├── client/
├── docs/
└── sample-data/
```

---

# Backend Setup

## Install dependencies

```bash
cd server
npm install
```

## Configure environment

Create `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/breathe_esg"
JWT_SECRET="supersecret"
PORT=5000
```

## Run Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Start backend

```bash
npm run dev
```

---

# Frontend Setup

## Install dependencies

```bash
cd client
npm install
```

## Start frontend

```bash
npm run dev
```

---


# Review Workflow

```txt
Upload Source
    ↓
Parse Records
    ↓
Normalize Data
    ↓
Run Validation Rules
    ↓
Flag Suspicious Rows
    ↓
Analyst Review
    ↓
Approve / Reject
    ↓
Lock for Audit
```

---

# Design Priorities

This prototype intentionally prioritizes:

* ingestion traceability
* auditability
* analyst workflows
* realistic enterprise data handling

over:

* visualization
* OCR pipelines
* real-time sync infrastructure

---

# Deployment

## Backend

Render

## Frontend

Vercel

## Database

Neon PostgreSQL

---


# Key Architectural Decisions

* Raw and normalized payloads are stored separately
* Source lineage is preserved at record level
* Validation is isolated from ingestion
* Review workflow is immutable after approval

---

# Future Improvements

* OCR ingestion for utility PDFs
* Real SAP OData integration
* Emission factor calculation engine
* Bulk approval workflows
* Advanced anomaly detection

---

# Author Notes

This prototype was intentionally scoped around realistic ingestion and audit workflows rather than feature breadth.

The focus was:

* defensible data lineage
* normalization consistency
* enterprise-style review workflows
* realistic ESG operational constraints
