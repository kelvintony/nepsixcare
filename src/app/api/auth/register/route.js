import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user';
import db from '@/utils/db';
import transactionProfileModel from '@/models/transactionProfile';
import generateToken from '@/utils/generateToken';

const apiUrl = 'https://api.monnify.com/api/v1/bank-transfer/reserved-accounts';

//! Calling this on the register route so as to create virtual accoint on signup
const createVirtualAccount = async (accountInfo) => {
  try {
    let data = await generateToken();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    };

    const monnifyContractCode = `${process.env.MONNIFY_CONTRACT_CODE}`;

    const requestBody = {
      accountName: accountInfo.accountName,
      accountReference: accountInfo.accountReference,
      currencyCode: 'NGN',
      contractCode: monnifyContractCode,
      customerName: accountInfo.customerName,
      customerEmail: accountInfo.customerEmail,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const responseData = await response.json();
    return response.status;
  } catch (error) {
    console.log(error.message);
  }
};

export const POST = async (res) => {
  const { firstName, lastName, phoneNumber, email, password, confirmPassword } =
    await res.json();

  //   return new NextResponse(JSON.stringify({ message: uuidv4() }), {
  //     status: 200,
  //   });

  if (
    !firstName ||
    !lastName ||
    !email ||
    !email.includes('@') ||
    !password ||
    !phoneNumber
  ) {
    return new NextResponse(JSON.stringify({ message: 'Validation error' }), {
      status: 409,
    });
  }

  try {
    await db.connect();

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: 'Email already exists!' }),
        {
          status: 409,
        }
      );
    }

    if (password !== confirmPassword) {
      return new NextResponse(
        JSON.stringify({ message: 'Password must match' }),
        {
          status: 409,
        }
      );
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phoneNumber,
      email,
      password: bcryptjs.hashSync(password),
      superUser: false,
    });

    //!create wallet balance
    await transactionProfileModel.create({
      userId: newUser?._id,
    });

    //!generate user Virtual Account
    if (newUser) {
      const data = {
        accountName: newUser?.firstName,
        accountReference: newUser?._id,
        customerName: newUser?.phoneNumber,
        customerEmail: newUser?.email,
      };

      let accountResponse = await createVirtualAccount(data);

      if (accountResponse !== 200) {
        await userModel.findOneAndDelete({ userId: newUser._id });
        await transactionProfileModel.findOneAndDelete({ userId: newUser._id });

        return new NextResponse(
          JSON.stringify({
            message: 'Something went wron creating email',
          }),
          {
            status: 500,
          }
        );
      }

      return new NextResponse(
        JSON.stringify({ message: 'registration successful' }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
