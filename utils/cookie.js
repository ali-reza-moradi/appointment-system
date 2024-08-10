const getCookie = () => {
  const cookie = document.cookie;

  if (cookie) {
    const arrayCookie = cookie.split("=");
    return {
      [arrayCookie[0]]: arrayCookie[1],
    };
  } else {
    return false;
  }
};

export { getCookie };
