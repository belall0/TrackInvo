import cuid from 'cuid';
import { InvoiceStatus } from '@prisma/client';

const users = [
  {
    id: 'cm7ipw4dr00070cl130u4hfow',
    name: 'Belal Muhammad',
    email: 'belallmuhammad0@gmail.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    image: 'https://i.pravatar.cc/150?img=8',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iq8oik000h0cl1b6u19gfh',
    name: 'Ahmed Muhammad',
    email: 'ahmed@example.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iq8tql000i0cl12yoab4sd',
    name: 'Mostafa Ashraf',
    email: 'mostafa@example.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const customers = [
  // Customers for Belal Muhammad
  {
    id: 'cm7iqfd1g000s0cl190in7i4n',
    userId: users[0].id,
    name: 'Customer 1',
    phone: '+20123456789',
    image: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqfhef000t0cl13kg45kof',
    userId: users[0].id,
    name: 'Customer 2',
    phone: '+20123456790',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqflhd000u0cl1eayy7gfq',
    userId: users[0].id,
    name: 'Customer 3',
    phone: '+20123456791',
    image: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqfph7000v0cl1blnk908a',
    userId: users[0].id,
    name: 'Customer 4',
    phone: '+20123456792',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqftv2000w0cl13gj6bpdx',
    userId: users[0].id,
    name: 'Customer 5',
    phone: '+20123456793',
    image: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Customers for Ahmed Muhammad
  {
    id: 'cm7iqfx82000x0cl19bc42kdb',
    userId: users[1].id,
    name: 'Customer 6',
    phone: '+20123456794',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqiewj00180cl1bpngg25n',
    userId: users[1].id,
    name: 'Customer 7',
    phone: '+20123456795',
    image: 'https://i.pravatar.cc/150?img=7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqiivw00190cl1b79l64fx',
    userId: users[1].id,
    name: 'Customer 8',
    phone: '+20123456796',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqilyz001a0cl1cezl2c86',
    userId: users[1].id,
    name: 'Customer 9',
    phone: '+20123456797',
    image: 'https://i.pravatar.cc/150?img=9',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqiqdb001b0cl1dd217bz9',
    userId: users[1].id,
    name: 'Customer 10',
    phone: '+20123456798',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Customers for Mostafa Ashraf
  {
    id: 'cm7iqiucx001c0cl1gu1jdla0',
    userId: users[2].id,
    name: 'Customer 11',
    phone: '+20123456799',
    image: 'https://i.pravatar.cc/150?img=11',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqixl6001d0cl1dy21418h',
    userId: users[2].id,
    name: 'Customer 12',
    phone: '+20123456800',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqj1tp001e0cl19u7obhqj',
    userId: users[2].id,
    name: 'Customer 13',
    phone: '+20123456801',
    image: 'https://i.pravatar.cc/150?img=13',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqj4c5001f0cl1fxr680ce',
    userId: users[2].id,
    name: 'Customer 14',
    phone: '+20123456802',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cm7iqj74w001g0cl1g7sw4hbr',
    userId: users[2].id,
    name: 'Customer 15',
    phone: '+20123456803',
    image: 'https://i.pravatar.cc/150?img=15',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const invoices = [
  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      id: cuid(),
      userId: users[0].id,
      customerId: customers[Math.floor(Math.random() * 5)].id, // Random from first 5 customers
      amount: (Math.random() * 1000 + 100).toFixed(2),
      status: Math.random() > 0.3 ? InvoiceStatus.paid : InvoiceStatus.pending,
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      updatedAt: new Date(),
    })),

  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      id: cuid(),
      userId: users[1].id,
      customerId: customers[5 + Math.floor(Math.random() * 5)].id, // Random from customers 6-10
      amount: (Math.random() * 1500 + 200).toFixed(2),
      status: Math.random() > 0.3 ? InvoiceStatus.paid : InvoiceStatus.pending,
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      updatedAt: new Date(),
    })),

  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      id: cuid(),
      userId: users[2].id,
      customerId: customers[10 + Math.floor(Math.random() * 5)].id, // Random from customers 11-15
      amount: (Math.random() * 2000 + 300).toFixed(2),
      status: Math.random() > 0.3 ? InvoiceStatus.paid : InvoiceStatus.pending,
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      updatedAt: new Date(),
    })),
];

export { users, customers, invoices };
