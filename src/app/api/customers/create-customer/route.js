import { getSession } from 'next-auth/react';
import axios from 'axios';

const apiUrl = 'https://api.paystack.co/customer';
const secretKey = `${process.env.PAYSTACK_SECRET_KEY}`;

const headers = {
  Authorization: `Bearer ${secretKey}`,
  'Content-Type': 'application/json',
};

export const POST = async (req, res) => {
  const data = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return res.status(409).json({ message: 'something went wrong' });
    }

    const responseData = await response.json();
    // console.log(responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(409).json({ message: 'something went wrong' });
  }
};

export const GET = async (req, res) => {
  try {
    const response = await fetch(apiUrl, { method: 'GET', headers });

    if (!response.ok) {
      return res.status(409).json({ message: 'something went wrong' });
    }

    const data = await response.json();

    return res.status(200).json(data.data);
  } catch (error) {
    return res.status(409).json({ message: 'something went wrong' });
  }
};
