export const generateOrderId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `FV-${randomNum}`;
};

export const sleep = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
