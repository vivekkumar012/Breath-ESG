
# Tradeoffs

This document explains intentional scope limitations and engineering tradeoffs made during implementation.

The prototype was designed under a strict time constraint and intentionally optimized for:

* auditability
* ingestion realism
* normalization quality
* analyst workflows

rather than breadth of functionality.

---

# 1. PDF OCR Parsing Was Not Built

## Why

Utility providers frequently expose billing data through PDFs.

However, OCR pipelines introduce:

* layout variability
* extraction reliability issues
* vendor-specific formatting complexity
* operational instability

Within a four-day prototype window, implementing OCR would likely reduce overall ingestion reliability.

---

## Alternative Chosen

Portal CSV ingestion.

This allowed focus on:

* billing period handling
* normalization quality
* validation workflows

without introducing OCR uncertainty.

---

# 2. Real SAP Integrations Were Not Implemented

## Why

Real SAP integrations typically require:

* enterprise credentials
* middleware setup
* VPN/network access
* SAP-specific authentication
* tenant-specific schemas

This complexity was outside prototype scope.

---

## Alternative Chosen

CSV flat-file exports.

This still realistically models:

* legacy enterprise workflows
* messy SAP exports
* inconsistent data quality

while remaining deployable within assignment constraints.

---

# 3. Real Emission Factor Calculations Were Not Built

## Why

The assignment primarily focused on:

* ingestion
* normalization
* analyst review workflows

A production-grade emission engine would require:

* factor versioning
* geography-aware factors
* methodology selection
* reporting standards alignment

This would significantly expand system scope.

---

## Alternative Chosen

Normalized activity storage.

The platform prepares activity data for downstream emissions calculation systems.

---

# 4. Role-Based Access Control Was Simplified

## Why

Enterprise ESG platforms often include:

* admins
* analysts
* auditors
* approvers
* read-only users

Implementing full RBAC would increase:

* authorization complexity
* UI complexity
* review workflow overhead

---

## Alternative Chosen

Single analyst workflow.

This keeps the prototype focused on:

* ingestion quality
* review experience
* auditability

---

# 5. Real-Time Sync Infrastructure Was Not Built

## Why

Production ingestion systems often rely on:

* queues
* background workers
* retry infrastructure
* webhook processing

This would require:

* Redis
* BullMQ
* Kafka
* async orchestration

which was unnecessary for prototype scope.

---

## Alternative Chosen

Synchronous ingestion endpoints.

This simplified:

* deployment
* debugging
* reviewer setup

while still demonstrating ingestion architecture.

---

# 6. Advanced Anomaly Detection Was Not Built

## Why

Production ESG systems may include:

* ML anomaly detection
* historical baselines
* supplier-specific heuristics

This requires:

* historical datasets
* model training
* calibration workflows

which were not necessary for demonstrating core platform architecture.

---

## Alternative Chosen

Rule-based validation engine.

This supports:

* negative values
* missing identifiers
* invalid units
* suspicious records

while remaining interpretable for analysts.

---

# 7. Multi-Region Infrastructure Was Not Implemented

## Why

Global ESG platforms often require:

* regional data residency
* geo-replication
* tenant isolation

This introduces:

* operational complexity
* infrastructure cost
* deployment overhead

---

## Alternative Chosen

Single PostgreSQL deployment.

Appropriate for prototype scope.

---

# Final Philosophy

The system intentionally prioritizes:

* defensible data lineage
* ingestion transparency
* analyst usability
* audit workflows

over:

* infrastructure complexity
* premature scalability
* excessive feature breadth

This tradeoff strategy was chosen to maximize clarity, realism, and maintainability within the assignment timeline.
