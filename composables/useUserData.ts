type User = {
  name: string;
  email: string;
  id: string;
};
const useUserData = () => {
  const userData = useState<User | undefined>("user");

  const setUserData = (user: User) => {
    userData.value = user;
  };

  return { userData, setUserData };
};

export default useUserData;
