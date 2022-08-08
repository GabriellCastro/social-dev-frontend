export const redirectLogin = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
