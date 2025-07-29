export const detectErrorMessage = (e: unknown, defaultError = 'Ошибка') => {
  if (!e) {
    return defaultError
  }

  // Check if e is an object and not null
  if (typeof e === 'object' && e !== null) {
    // Check if e has a 'message' property
    if ('message' in e && (e as { message?: string }).message) {
      return (e as { message?: string }).message!
    }

    // Check if e has a 'data' property and that 'data' has a 'message' property
    if (
      'data' in e &&
      typeof (e as { data?: { message?: string } }).data === 'object' &&
      (e as { data?: { message?: string } }).data?.message
    ) {
      return (e as { data: { message: string } }).data.message
    }
  }

  return defaultError
}

export const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'Неизвестная ошибка';

  if (typeof error === 'string') return error;

  if (typeof error === 'object') {
    const err = error as Record<string, any>;

    return (
      err.message ||
      err.msg ||
      err.error?.message ||
      err.error?.msg ||
      JSON.stringify(err)
    );
  }

  return 'Неизвестная ошибка';
};
