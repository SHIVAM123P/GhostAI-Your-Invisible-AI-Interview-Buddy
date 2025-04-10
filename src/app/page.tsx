'use client';

import {useState, useRef} from 'react';
import {Modal} from '@/components/Modal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
