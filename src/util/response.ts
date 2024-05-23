type APIResponse = {
  status: 'Success' | 'Fail';
  message?: string;
  data?: any;
};

export const createResponse = (
  status: 'Success' | 'Fail',
  message: string,
  data?: any,
): APIResponse => {
  return {
    status,
    message,
    data,
  };
};
