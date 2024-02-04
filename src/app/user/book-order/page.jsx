import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const BookOrder = async () => {
  const session = await getServerSession(authOptions);
  //   console.log('the session', session);
  return (
    <div>
      <h1>BookOrder 2</h1>
    </div>
  );
};

export default BookOrder;
