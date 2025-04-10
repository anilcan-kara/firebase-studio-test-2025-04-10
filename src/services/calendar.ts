
/**
 * Represents an appointment with a title, start time, and end time.
 */
export interface Appointment {
  /**
   * The title of the appointment.
   */
  title: string;
  /**
   * The start time of the appointment.
   */
  startTime: Date;
  /**
   * The end time of the appointment.
   */
  endTime: Date;
}

/**
 * Asynchronously retrieves a list of appointments for a given date range.
 *
 * @param startDate The start date of the range.
 * @param endDate The end date of the range.
 * @returns A promise that resolves to an array of Appointment objects.
 */
export async function getAppointments(
  startDate: Date,
  endDate: Date
): Promise<Appointment[]> {
  // TODO: Implement this by calling an API.

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  return [
    {
      title: 'Client Meeting',
      startTime: now,
      endTime: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour later
    },
    {
      title: 'Team Sync',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 30 * 60 * 1000), // 30 minutes later
    },
    {
      title: 'Project Review',
      startTime: dayAfter,
      endTime: new Date(dayAfter.getTime() + 90 * 60 * 1000), // 1.5 hours later
    },
  ];
}
