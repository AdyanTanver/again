import React from 'react';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

const MapIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 576 512"
    className={className}
    fill="currentColor"
  >
    <path d="M384 476.1L192 421.2l0-385.3L384 90.8l0 385.3zm32-1.2l0-386.5L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3l0 334.8c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2l0 386.5L32.9 474.5C17.1 480.8 0 469.2 0 452.2L0 117.4c0-9.8 6-18.6 15.1-22.3z"/>
  </svg>
);

interface ViewMapButtonProps {
  onClick?: () => void;
  className?: string;
}

export const ViewMapButton = ({ className }: ViewMapButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={`group px-3 py-1.5 bg-background hover:bg-accent text-foreground rounded-lg transition-all duration-200 text-sm flex items-center gap-0 hover:gap-2 hover:px-4 ${className}`}
    >
      <span>View Map</span>
      <MapIcon className="w-0 h-4 group-hover:w-4 transition-all duration-200" />
    </Button>
  );
};