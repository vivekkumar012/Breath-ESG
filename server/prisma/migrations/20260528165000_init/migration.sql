-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('SAP', 'UTILITY', 'TRAVEL');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'FLAGGED', 'APPROVED', 'REJECTED', 'LOCKED');

-- CreateEnum
CREATE TYPE "ScopeCategory" AS ENUM ('SCOPE_1', 'SCOPE_2', 'SCOPE_3');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngestionBatch" (
    "id" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "filename" TEXT,
    "uploadedById" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngestionBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionRecord" (
    "id" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "scope" "ScopeCategory" NOT NULL,
    "activityType" TEXT NOT NULL,
    "rawPayload" JSONB NOT NULL,
    "normalizedPayload" JSONB NOT NULL,
    "normalizedUnit" TEXT NOT NULL,
    "normalizedValue" DOUBLE PRECISION NOT NULL,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "batchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmissionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationIssue" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,

    CONSTRAINT "ValidationIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewAction" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "comment" TEXT,
    "performedBy" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "changedBy" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionRecord" ADD CONSTRAINT "EmissionRecord_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "IngestionBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidationIssue" ADD CONSTRAINT "ValidationIssue_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "EmissionRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAction" ADD CONSTRAINT "ReviewAction_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "EmissionRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "EmissionRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
