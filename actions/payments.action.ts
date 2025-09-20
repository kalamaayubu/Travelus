'use server';

import { BookingInfoProps } from '@/types';

export default async function initializePayments(data: BookingInfoProps) {
  console.log("Simulating STK Push for booking:", data);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate Daraja success response
      resolve({
        success: true,
        message: 'Payment made successfully',
        ResponseCode: '0', // Like from Daraja
        MerchantRequestID: 'MOCK123456',
        CheckoutRequestID: 'CHECKOUT123456',
      });
    }, 5000); // Simulate delay (e.g. 5 seconds)
  });
}
