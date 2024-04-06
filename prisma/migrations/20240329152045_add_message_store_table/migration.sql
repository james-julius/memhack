-- CreateTable
CREATE TABLE "MessageStore" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "message" JSONB NOT NULL,

    CONSTRAINT "MessageStore_pkey" PRIMARY KEY ("id")
);
