'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import resetPasswordEmail from '@/firebase/auth/recover-password';

function RecoverPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await resetPasswordEmail(email);

    alert('Email Sent');

    router.push('/');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleForm}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <h1 className="mb-6 text-3xl font-bold text-black">
            Password Recovery
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 font-semibold text-white"
            >
              Recover Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecoverPage;
