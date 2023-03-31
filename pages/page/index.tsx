export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/page/1",
      permanent: false,
    },
  };
};

const Index = () => {
  return <></>;
};

export default Index;
