'use client';

import {useState, useRef, useEffect} from 'react';
import {Modal} from '@/components/Modal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
