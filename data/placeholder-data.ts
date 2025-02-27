import cuid from 'cuid';
import { User, Customer, Revenue, InvoiceStatus, Invoice } from '@/lib/types';
import { Decimal } from '@prisma/client/runtime/library';

const maleNames = [
  'Mohamed',
  'Ahmed',
  'Mahmoud',
  'Ali',
  'Omar',
  'Mostafa',
  'Khaled',
  'Youssef',
  'Ibrahim',
  'Amr',
  'Karim',
  'Hassan',
  'Hussein',
  'Tamer',
  'Sherif',
  'Hossam',
  'Ayman',
  'Essam',
  'Waleed',
  'Ashraf',
  'Hamza',
  'Tarek',
  'Adel',
  'Ramy',
];

const femaleNames = [
  'Nour',
  'Fatma',
  'Aisha',
  'Mariam',
  'Sara',
  'Heba',
  'Aya',
  'Amira',
  'Salma',
  'Laila',
  'Dina',
  'Yasmin',
  'Rania',
  'Maha',
  'Eman',
  'Noha',
  'Hana',
  'Esraa',
  'Mona',
  'Hala',
  'Basma',
  'Nada',
  'Ghada',
  'Reem',
];

const surnames = [
  'Ibrahim',
  'Mohamed',
  'Ahmed',
  'Mahmoud',
  'Ali',
  'Hassan',
  'Hussein',
  'El-Sayed',
  'Abdelrahman',
  'Mostafa',
  'Kamal',
  'Fawzy',
  'Sayed',
  'Salah',
  'Magdy',
  'Nasser',
  'Samir',
  'Adel',
  'Youssef',
  'Ramadan',
  'Farouk',
  'Shafik',
];

const generateRandomName = (gender: 'male' | 'female') => {
  // 1. Select a random first name based on the gender
  const firstNames = gender === 'male' ? maleNames : femaleNames;

  // 2. Construct a random full name
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

  // 3. Return the full name
  return `${randomFirstName} ${randomSurname}`;
};

const generateRandomEmail = (name: string) => {
  // the email format is: <first-name>.<last-name>@example.com
  return `${name.split(' ').join('.').toLowerCase()}@example.com`;
};

const generateRandomPhoneNumber = () => {
  // 1. Define the number prefixes
  const prefixes = ['010', '011', '012', '015'];

  // 2. Generate a random prefix
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // 3. Generate the rest of the number
  const restOfNumber = Math.floor(10000000 + Math.random() * 90000000).toString();

  // 4. Return the full number
  return randomPrefix + restOfNumber;
};

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

const generateCustomers = () => {
  let customers: Customer[] = [];

  users.forEach((user) => {
    for (let i = 0; i < 20; i++) {
      // 0. Generate a random gender and image index from 1 to 5
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      const imageIndex = Math.floor(Math.random() * 5) + 1;

      // 1. Generate a random id using cuid
      const id = cuid();

      // 2. set the user id
      const userId = user.id;

      // 4. Generate a random name
      const name = generateRandomName(gender);

      // 3. Generate a random email
      const email = generateRandomEmail(name);

      // 5. Generate a random phone number
      const phone = generateRandomPhoneNumber();

      // 6. Generate a random image
      const image = `/avatars/${gender}${imageIndex}.png`;

      // 7. construct the customer object
      const customer: Customer = {
        id,
        userId,
        name,
        email,
        phone,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 8. Make sure this customer email is not exist in the customers array
      if (customers.find((c) => c.email === customer.email)) {
        continue;
      }
      customers.push(customer);
    }
  });

  return customers;
};

const generateInvoices = (customers: Customer[]) => {
  let invoices: Invoice[] = [];

  customers.forEach((customer) => {
    const numberOfInvoices = Math.floor(1 + Math.random() * 10);
    for (let i = 0; i < numberOfInvoices; i++) {
      const id = cuid();
      const userId = customer.userId;
      const customerId = customer.id;
      const amount = new Decimal(Math.floor(1000 + Math.random() * 900));
      const status = Math.random() > 0.5 ? InvoiceStatus.paid : InvoiceStatus.pending;

      const invoice: Invoice = {
        id,
        userId,
        customerId,
        amount,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      invoices.push(invoice);
    }
  });

  return invoices;
};

// DATA
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

const customers: Customer[] = generateCustomers();
const invoices: Invoice[] = generateInvoices(customers);
const revenues: Revenue[] = generateRevenues(users);

// Randomize the order of the arrays
users.sort(() => Math.random() - 0.5);
customers.sort(() => Math.random() - 0.5);
invoices.sort(() => Math.random() - 0.5);

export { users, customers, invoices, revenues };
