/* eslint-disable @typescript-eslint/no-explicit-any */
const notification = (toast: any, message: any, status: any) => {
  toast({
    description: message,
    status: status,
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });
};

export default notification;
