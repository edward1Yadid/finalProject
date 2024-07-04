const normalizedUser = (userFromClient) => {
    const {
      address,
      name,
    } = userFromClient;
  
    return {
      ...userFromClient,
      name: {
        ...userFromClient.name,
        middle: name.middle || "",
      },
  
      address: {
        ...userFromClient.address,
        state: address.state || "not defined",
      },
    };
  };
  module.exports = normalizedUser;