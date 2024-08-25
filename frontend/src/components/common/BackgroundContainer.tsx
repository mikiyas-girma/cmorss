import { ReactNode } from 'react';

type BackgroundType = {
  image?: string;
  children: ReactNode;
};

//TODO: Implement the Background Container Image
/**
 * Background Container that Wraps around
 * JSX Children Element
 * @returns
 */
const BackgroundContainer: React.FC<BackgroundType> = () => {
  return <div>BackgroundContainer</div>;
};

export default BackgroundContainer;
