import { join } from "path";
import { readFileSync } from "fs";
import { verifyPayment } from "./Payments.util";
import { Booking } from "../bookings/bookings.model";

interface BookingDetails {
  firstName: string;
  lastName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  paymentStatus: string;
}

const confirmationService = async (transactionId: string, status: string) => {
  try {
    // Verify payment
    const verifyResponse = await verifyPayment(transactionId);

    let bookingDetails: BookingDetails | null = null;

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      // Retrieve booking details
      const booking = await Booking.findOne({ transactionId }).exec();
      
      if (booking) {
        // Extract booking details with type conversion
        bookingDetails = {
          firstName: booking.firstName || "N/A",
          lastName: booking.lastName || "N/A",
          bookingDate: booking.date || "N/A",
          startTime: booking.startTime || "N/A",
          endTime: booking.endTime || "N/A",
          guestCount: typeof booking.guestCount === 'number' ? booking.guestCount : parseInt(booking.guestCount, 10) || 0,
          paymentStatus: "Paid",
        };

        // Update booking payment status
        await Booking.findOneAndUpdate(
          { transactionId },
          { paymentStatus: "Paid" },
          { new: true } // Optionally return the updated document
        );
      } else {
        console.warn(`No booking found with transactionId: ${transactionId}`);
      }
    }

    // Read and modify HTML template
    const filepath = join(__dirname, '../../views/confirmation.html');
    let template = readFileSync(filepath, "utf-8");

    // Replace placeholders with booking details
    if (bookingDetails) {
      template = template
        .replace("{{firstName}}", bookingDetails.firstName)
        .replace("{{lastName}}", bookingDetails.lastName)
        .replace("{{bookingDate}}", bookingDetails.bookingDate)
        .replace("{{startTime}}", bookingDetails.startTime)
        .replace("{{endTime}}", bookingDetails.endTime)
        .replace("{{guestCount}}", bookingDetails.guestCount.toString())
        .replace("{{paymentStatus}}", bookingDetails.paymentStatus);
    }

    // Replace status message
    template = template.replace("{{message}}", status);

    return template;

  } catch (error) {
    console.error("Error processing confirmation:", error);
    throw new Error("Failed to process confirmation.");
  }
};

export const paymentServices = {
  confirmationService,
  verifyPayment
};
