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
    let bookingDetails: BookingDetails | null = null;
    let message = '';  // Variable to hold the message

    // Check if the status is 'success' or 'failed'
    if (status === "success") {
      // Verify payment
      const verifyResponse = await verifyPayment(transactionId);

      if (verifyResponse && verifyResponse.pay_status === "Successful") {
        // Retrieve booking details if payment is successful
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

          // Update booking payment status to 'Paid'
          await Booking.findOneAndUpdate(
            { transactionId },
            { paymentStatus: "Paid" },
            { new: true } // Optionally return the updated document
          );

          // Set success message
          message = "Thank you for your booking! Your reservation has been confirmed. Here are the details of your booking:";
        } else {
          console.warn(`No booking found with transactionId: ${transactionId}`);
          message = "Payment was successful, but we couldn't find your booking details. Please contact support.";
        }
      } else {
        throw new Error("Payment verification failed.");
      }
    } else if (status === "failed") {
      // If payment failed, no need to retrieve booking details
      // Set the response message to 'Payment Failed' or a retry message
      bookingDetails = {
        firstName: "N/A",
        lastName: "N/A",
        bookingDate: "N/A",
        startTime: "N/A",
        endTime: "N/A",
        guestCount: 0,
        paymentStatus: "Failed",
      };
      message = "Unfortunately, your payment has failed. Please try again or contact support.";
    } else {
      throw new Error("Invalid status provided.");
    }

    // Read and modify HTML template
    const filepath = join(__dirname, '../../../public/confirmation.html');
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

    // Replace the dynamic message
    template = template.replace("{{message}}", message);

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
