// Get User Information for Login From Json
const getData = async () => {
  const response = await fetch("https://dummyjson.com/c/37ff-0efe-49f1-b609");
  const json = await response.json();
  return json;
};

export { getData };
