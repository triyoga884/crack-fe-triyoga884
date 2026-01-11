import { getAccessToken } from '../../../lib/fetcher';
import { Booking } from '../../../lib/type';

const API = process.env.NEXT_PUBLIC_LOCAL_API;
const token = getAccessToken();
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// WORKSPACE
export async function getAllVerifiedWorkspaces() {
  const res = await fetch(`${API}/workspaces/verified`);
  const data = await res.json();
  return data;
}

export async function getWorkspaceById(id: string) {
  const res = await fetch(`${API}/workspaces/${id}`);
  const data = await res.json();
  return data;
}

// BOOKING
export async function getAvailableDates(id: string) {
  const res = await fetch(`${API}/booking/${id}/availability`);
  const data = await res.json();
  return data;
}

export async function postBooking(booking: Booking) {
  const e = JSON.stringify({
    coworkingSpaceId: booking.workspaceId,
    startDate: booking.startDate,
    endDate: booking.endDate,
  });
  const res = await fetch(`${API}/booking`, {
    method: 'POST',
    headers: headers,
    body: e,
  });
  const data = await res.json();
  return data;
}

export async function getBookingById(id: string) {
  const res = await fetch(`${API}/booking/${id}`, {
    headers: headers,
  });
  const data = await res.json();
  return data;
}
