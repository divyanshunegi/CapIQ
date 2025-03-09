import { type IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className }) => {
  const IconComp = IconComponent as any;
  return <IconComp className={className} />;
}; 