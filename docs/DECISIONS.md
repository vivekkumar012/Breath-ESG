# Engineering Decisions

This document explains important implementation decisions and tradeoffs made during development.

---

# 1. SAP Ingestion Strategy

## Chosen Approach

CSV flat-file upload.

---

## Alternatives Considered

* SAP IDoc
* SAP OData APIs
* SAP BAPI integrations

---

## Why CSV Was Chosen

Flat-file exports are still extremely common in enterprise sustainability workflows.

CSV ingestion:

* reduced implementation complexity
* allowed realistic messy data handling
* matched prototype scope constraints

---

## Realistic SAP Behaviors Modeled

* German column headers
* inconsistent units
* plant codes
* malformed values
* legacy export formats

---

# 2. Utility Data Strategy

## Chosen Approach

Portal CSV export ingestion.

---

## Alternatives Considered

* Utility APIs
* PDF OCR parsing

---

## Why CSV Was Chosen

Facilities teams commonly download CSV exports manually from utility portals.

PDF OCR was intentionally avoided because:

* parsing reliability is inconsistent
* layout variability is high
* OCR accuracy would reduce ingestion quality

---

## Realistic Behaviors Modeled

* non-calendar billing periods
* meter identifiers
* varying billing windows
* missing tariff metadata

---

# 3. Travel Data Strategy

## Chosen Approach

Mock Concur-style API payloads.

---

## Why This Was Chosen

This demonstrates:

* API ingestion architecture
* normalization workflows
* async integration patterns

without requiring real enterprise credentials.

---

## Realistic Behaviors Modeled

* airport codes
* missing distances
* travel classes
* incomplete itinerary data

---

# 4. Why Raw Payloads Are Stored

The system stores:

* original source payload
* normalized payload

This was prioritized for:

* audit traceability
* analyst transparency
* reproducibility
* debugging

---

# 5. Why Validation Is Separate

Validation logic was intentionally isolated from ingestion.

Benefits:

* cleaner architecture
* extensible rule engine
* easier analyst workflows

---

# 6. Why PostgreSQL Was Chosen

PostgreSQL supports:

* relational integrity
* JSON payload storage
* flexible normalization models

It also reflects realistic enterprise backend infrastructure.

---

# 7. Why Prisma Was Chosen

Prisma improved:

* schema clarity
* migration management
* developer speed

This was important within a short prototype timeline.

---

# 8. Why Tailwind Was Chosen

Tailwind accelerated:

* layout development
* responsive UI implementation
* consistent styling

without introducing large UI framework complexity.

---

# 9. Why Real Emission Calculations Were Not Built

This prototype intentionally focused on:

* ingestion
* normalization
* review workflows

rather than:

* emissions methodology engines

because the assignment emphasized ingestion complexity.

---

# 10. Why Auditability Was Prioritized

The product requirements strongly implied:

* downstream audit workflows
* assurance reviews
* analyst sign-off requirements

As a result:

* immutable approvals
* audit logs
* lineage tracking

were treated as first-class concerns.

---

# Questions I Would Ask The PM

If given more time, I would clarify:

1. Which ESG framework should be prioritized?
2. How should emission factor versions be managed?
3. Are approvals legally immutable?
4. Should analysts be able to override validation rules?
5. Are ingestion retries required?
6. Should source schemas be configurable per client?
