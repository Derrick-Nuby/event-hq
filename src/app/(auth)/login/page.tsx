import LoginForm from '@/components/LoginForm';
import React from 'react';
import { Suspense } from 'react';


export default function page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>

  );
}
