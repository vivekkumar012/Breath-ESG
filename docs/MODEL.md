# MODEL.md

# Data Model Design

This document explains the core data modeling decisions used in the ESG ingestion platform.

---

# Design Goals

The data model was designed around five priorities:

1. Multi-tenancy
2. Source traceability
3. Auditability
4. Normalization consistency
5. Analyst review workflows

---

# Core Entities

```txt
Organization
 ├── Users
 ├── IngestionBatches
 ├── EmissionRecords
 ├── ValidationIssues
 ├── ReviewActions
 └── AuditLogs
```

---

# Multi-Tenancy

Each organization owns:

* users
* ingestion batches
* emission records
* review history

This ensures logical separation between enterprise clients.

---

# Ingestion Model

## IngestionBatch

Represents:

* one uploaded file
* one API sync event
* one import execution

Tracks:

* source type
* upload time
* uploaded by
* filename

This allows auditors to trace records back to their ingestion event.

---

# EmissionRecord

This is the central normalized entity.

Every source eventually becomes an `EmissionRecord`.

Stores:

* source type
* scope category
* activity type
* normalized value
* normalized unit
* raw payload
* normalized payload

---

# Raw Payload Preservation

The system stores BOTH:

## rawPayload

Original source row exactly as received.

Example:

```json
{
  "MATNR": "DSL001",
  "WERKS": "PLT100",
  "Menge": "5000"
}
```

## normalizedPayload

Normalized system representation.

Example:

```json
{
  "fuelType": "diesel",
  "liters": 5000
}
```

---

# Why Preserve Raw Data?

This was intentionally prioritized for:

* audit defensibility
* analyst transparency
* debugging ingestion issues
* reproducibility

Auditors can compare transformed records against the original source row.

---

# Scope Categorization

The system supports:

## Scope 1

Fuel combustion.

## Scope 2

Purchased electricity.

## Scope 3

Business travel.

---

# Validation Model

Validation issues are stored separately from records.

This allows:

* multiple validation flags per row
* severity classification
* analyst prioritization

Example:

```txt
HIGH
MEDIUM
LOW
```

---

# Review Workflow

Records move through statuses:

```txt
PENDING
FLAGGED
APPROVED
REJECTED
LOCKED
```

---

# Why Lock Approved Records?

Approved records become immutable to:

* preserve audit integrity
* prevent accidental edits
* support assurance workflows

---

# Audit Trail

Every modification creates an AuditLog entry.

Tracks:

* changed field
* previous value
* new value
* changed by
* timestamp

This provides complete historical traceability.

---

# Source Lineage

Every record stores:

* source type
* ingestion batch
* upload timestamp
* original payload

This ensures end-to-end lineage.

---

# Normalization Layer

Normalization is intentionally isolated from ingestion.

Reason:
Each source has different semantics and transformation logic.

Examples:

* SAP fuel exports
* utility meter data
* travel API payloads

All normalize into a common ESG schema.

---

# Why Prisma + PostgreSQL?

## PostgreSQL

Chosen for:

* relational integrity
* JSON support
* enterprise reliability

## Prisma

Chosen for:

* developer velocity
* schema clarity
* migration support

---

# Tradeoff Decisions

The model intentionally avoided:

* event sourcing
* microservices
* distributed ingestion queues

because:

* they would add operational complexity
* they were unnecessary for prototype scope

---

# Final Design Philosophy

The data model optimizes for:

* auditability
* ingestion traceability
* realistic enterprise workflows
* analyst usability

rather than:

* feature breadth
* infrastructure complexity
* premature optimization
