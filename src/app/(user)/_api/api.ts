import { Booking, Payment } from '../../../lib/type';

const API = process.env.NEXT_PUBLIC_LOCAL_API;

// WORKSPACE
export async function getAllWorkspaces(isVerified: boolean) {
  const res = await fetch(`${API}/workspaces?isVerified=${isVerified}`);
  const data = await res.json();
  return data;
}

export async function getWorkspaceById(id: string) {
  const res = await fetch(`${API}/workspaces/${id}`);
  const data = await res.json();
  return data;
}

export async function searchWorkspace(search: string, type: string) {
  const params = new URLSearchParams();
  if (search) params.append('name', search);
  if (type !== 'ALL') params.append('type', type);

  const rest = await fetch(`${API}/workspaces/search?${params.toString()}`);
  const data = rest.json();
  return data;
}

// BOOKING
export async function getAvailableDates(id: string) {
  const res = await fetch(`${API}/bookings/${id}/availability`);
  const data = await res.json();
  return data;
}

export async function postBooking(booking: Booking) {
  const e = JSON.stringify({
    coworkingSpaceId: booking.workspaceId,
    startDate: booking.startDate,
    endDate: booking.endDate,
  });
  const res = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: e,
  });
  const data = await res.json();
  return data;
}

export async function getChekoutData(id: string) {
  const res = await fetch(`${API}/bookings/checkout/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

// PAYMENT

export async function postPayment(payment: Payment) {
  const e = JSON.stringify({
    bookingId: payment.bookingId,
    method: payment.method,
  });
  const res = await fetch(`${API}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: e,
  });
  const data = res.json();
  return data;
}

// USER

export async function getProfile() {
  const res = await fetch(`${API}/users/me`, {
    credentials: 'include',
  });
  const data = res.json();
  return data;
}
