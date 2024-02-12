'use client';

import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = searchParams.get('token');
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError('Missing token!');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.Success);
        setError(data.error);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel='Confirm your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex justify-center items-center w-full'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
