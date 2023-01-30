export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const generateTransferUniqueNumber = (nbr = 10) => {
  let str = '';
  for(let i = 0 ; i < nbr; ++i) {
    str += Math.floor(Math.random() * 10);
  }
  return [str.slice(0, 5), str.slice(5)].join('-');
}

export const generateNumber = (nbr = 10) => {
  let str = '';
  for(let i = 0 ; i < nbr; ++i) {
    str += Math.floor(Math.random() * 10);
  }
  return parseInt(str);
}

export const computeCommission = (amountToSend: number, amountToReceive: number) => {
  // Commission à 1.5%
  return {
    percentage: 1.5,
    commission: amountToSend - amountToReceive
  };
}
