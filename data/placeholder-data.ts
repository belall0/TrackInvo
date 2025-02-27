import cuid from 'cuid';
import { User, Customer, Revenue, InvoiceStatus } from '@/lib/types';

// Helper function to get a random item from an array
const getRandomItem = (array: any) => array[Math.floor(Math.random() * array.length)];

// Helper function to get a random date between two dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate customers
const generateCustomers = (users: User[], count = 15) => {
  const maleNames = [
    'Ahmed Hassan',
    'Mohamed Ali',
    'Mahmoud Salah',
    'Omar Ibrahim',
    'Youssef Farid',
    'Karim Abdel',
    'Tarek Mohamed',
    'Amir Samir',
    'Hany Khalil',
    'Samy Rashad',
    'Khaled Mahmoud',
    'Waleed Nasser',
    'Adel Fawzy',
    'Bassem Taha',
    'Sherif Gamal',
    'Hazem Osman',
    'Ramy Essam',
    'Fadi Magdy',
    'Ziad Hamdi',
    'Nasr El-Din',
  ];
  const femaleNames = [
    'Fatima Ahmed',
    'Aya Mohamed',
    'Mariam Hassan',
    'Yasmin Ali',
    'Nour Ibrahim',
    'Salma Farid',
    'Laila Abdel',
    'Rania Samir',
    'Dina Khalil',
    'Mona Rashad',
    'Hana Mahmoud',
    'Amira Nasser',
    'Shereen Fawzy',
    'Nadia Taha',
    'Reem Gamal',
    'Samar Osman',
    'Layla Essam',
    'Rasha Magdy',
    'Heba Hamdi',
    'Zeinab El-Din',
  ];

  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-01-25');

  return Array.from({ length: count }, (_, i) => {
    const isFemale = i % 2 === 1;
    const name = isFemale ? getRandomItem(femaleNames) : getRandomItem(maleNames);
    const firstName = name.split(' ')[0].toLowerCase();
    const lastName = name.split(' ')[1].toLowerCase();

    const createdAt = getRandomDate(startDate, endDate);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * (2 * 24 * 60 * 60 * 1000)); // 0-2 days later

    return {
      id: cuid(),
      userId: users[i % users.length].id,
      name,
      email: `${firstName}.${lastName}@example.com`,
      phone: `+2012345678${i < 10 ? '0' + i : i}`,
      image: `/avatars/${isFemale ? 'female' : 'male'}${(i % 5) + 1}.png`,
      createdAt,
      updatedAt,
    };
  });
};

// Function to generate invoices
const generateInvoices = (users: User[], customers: Customer[], count = 30) => {
  const startDate = new Date('2024-08-01');
  const endDate = new Date('2024-12-20');

  return Array.from({ length: count }, (_, i) => {
    const createdAt = getRandomDate(startDate, endDate);
    const customer = getRandomItem(customers);

    return {
      id: cuid(),
      userId: customer.userId,
      customerId: customer.id,
      amount: Math.round(75 + Math.random() * 375) + (Math.random() > 0.5 ? 0 : 0.99),
      status: Math.random() > 0.5 ? InvoiceStatus.paid : InvoiceStatus.pending,
      createdAt,
      updatedAt: createdAt,
    };
  });
};

// Function to generate revenues
const generateRevenues = (users: User[]) => {
  const revenues: Revenue[] = [];

  users.forEach((user) => {
    for (let month = 1; month <= 12; month++) {
      // Early months have higher revenue (pattern from original data)
      let baseRevenue = month <= 7 ? 2000 - month * 50 : 550 - month * 25;
      if (baseRevenue < 0) baseRevenue = 200;

      // Add some randomness
      const revenue = Math.round(baseRevenue * (0.8 + Math.random() * 0.4));

      // Calculate the next month for createdAt date (January of next year for December)
      const nextMonth = month < 12 ? month + 1 : 1;
      const year = month < 12 ? 2024 : 2025;

      revenues.push({
        id: cuid(),
        userId: user.id,
        month,
        year: 2024,
        revenue,
        createdAt: new Date(`${year}-${String(nextMonth).padStart(2, '0')}-01T10:00:00Z`),
        updatedAt: new Date(`${year}-${String(nextMonth).padStart(2, '0')}-01T10:00:00Z`),
      });
    }
  });

  return revenues;
};

const users: User[] = [
  {
    id: cuid(),
    name: 'Belal Muhammad',
    email: 'belallmuhammad0@gmail.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    image: '/avatars/male1.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: cuid(),
    name: 'Ahmed Mahmoud',
    email: 'ahmed@example.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    image: '/avatars/male3.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: cuid(),
    name: 'Rahma Ahmed',
    email: 'rahma@example.com',
    passwordHash: '$2a$12$Ybtft/v4kqI7UtYN1hYceul3xbXfZuPGTGaYU22H30ss7EIQwMQ5u', // password123
    image: '/avatars/male2.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const customers = generateCustomers(users, 20);
const invoices = generateInvoices(users, customers, 500);
const revenues = generateRevenues(users);

export { users, customers, invoices, revenues };
