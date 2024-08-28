const getColorGradient = (colorType: 'green' | 'blue' | 'orange' | 'red') => {
  let color = 'bg-gradient-to-r from-primary-blue to-secondary-blue';

  //   Define Switch Statement to get Gradient
  switch (colorType) {
    case 'green':
      color = 'bg-gradient-to-r from-primary-green to-secondary-green';
      break;

    case 'orange':
      color = 'bg-gradient-to-r from-primary-orange to-secondary-orange';
      break;

    case 'red':
      color = 'bg-gradient-to-r from-red-600 to-red-400';
      break;

    default:
      break;
  }

  return color;
};

export default getColorGradient;
