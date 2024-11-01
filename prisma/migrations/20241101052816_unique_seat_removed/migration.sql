-- DropIndex
DROP INDEX "Booking_seatId_key";

-- CreateIndex
CREATE INDEX "Booking_seatId_idx" ON "Booking"("seatId");
