'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar} from '@/components/ui/calendar';
import {RevenueForm} from '@/components/revenue-form';
import {ExpenseForm} from '@/components/expense-form';
import {useEffect, useState} from 'react';
import {getAppointments} from '@/services/calendar';

export default function Home() {
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const calculateProfit = () => {
      setProfit(revenue - expenses);
    };

    calculateProfit();
  }, [revenue, expenses]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const appointmentsData = await getAppointments(today, nextWeek);
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">BizFlow Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${revenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${expenses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                profit >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              ${profit}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueForm onRevenueAdded={(newRevenue) => setRevenue(revenue + newRevenue)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm onExpenseAdded={(newExpense) => setExpenses(expenses + newExpense)} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Calendar</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Calendar className="rounded-md border" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((appointment, index) => (
                    <li key={index} className="mb-2">
                      <strong>{appointment.title}</strong>
                      <br />
                      {appointment.startTime.toLocaleTimeString()} - {appointment.endTime.toLocaleTimeString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming appointments.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    