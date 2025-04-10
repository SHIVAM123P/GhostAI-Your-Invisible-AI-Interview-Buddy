
'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
} from 'react';
import ReactMarkdown from 'react-markdown';
import {Gemini} from './Gemini';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalStyles: CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(45, 55, 72, 0.8)', // Dark muted background with opacity
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  width: '80%',
  maxWidth: '600px',
  color: '#A0AEC0', // Light gray text
  backdropFilter: 'blur(5px)',
  opacity: 0.9,
  border: '1px solid rgba(160, 174, 192, 0.1)',
};

const headerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '15px',
};

const contentStyles: CSSProperties = {
  marginBottom: '20px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid rgba(160, 174, 192, 0.1)',
};

const codeBlockStyles: CSSProperties = {
  backgroundColor: 'rgba(45, 55, 72, 0.9)',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid rgba(160, 174, 192, 0.1)',
};

const footerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const Modal: React.FC<ModalProps> = ({isOpen, onClose}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { type: 'user' | 'ai'; text: string }[]
  >([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to handle AI responses
  const handleSend = useCallback(async () => {
    if (inputValue.trim()) {
      setChatHistory((prev) => [...prev, {type: 'user', text: inputValue}]);
      const aiResponse = await Gemini(inputValue);
      setChatHistory((prev) => [...prev, {type: 'ai', text: aiResponse}]);
      setInputValue(''); // Clear the input after sending
    }
  }, [inputValue]);

  // Auto-scroll logic
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Hotkey to send message
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        handleSend();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSend]);

  // Drag logic
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !modalRef.current) return;

    const movementX = e.movementX || e.clientX - (mousePosition.current?.x || 0);
    const movementY = e.movementY || e.clientY - (mousePosition.current?.y || 0);

    setPosition((prevPosition) => ({
      x: prevPosition.x + movementX,
      y: prevPosition.y + movementY,
    }));

    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const mousePosition = useRef<{ x: number; y: number }>();

  useEffect(() => {
    mousePosition.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      style={{
        ...modalStyles,
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={headerStyles}>
        <h2 style={{margin: 0, fontSize: '1.2em'}}>StealthCoder</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <span>X</span>
        </Button>
      </div>

      <div ref={contentRef} style={contentStyles}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: '8px',
              textAlign: message.type === 'user' ? 'right' : 'left',
            }}
          >
            <strong
              style={{
                color: message.type === 'user' ? '#4DC0B5' : '#A0AEC0',
                marginRight: '5px',
              }}
            >
              {message.type === 'user' ? 'You:' : 'AI:'}
            </strong>
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline ? (
                    <code style={codeBlockStyles} className={className} {...props}>{children}</code>
                  ) : (
                    <code className={className} {...props}>{children}</code>
                  );
                }
              }}>{message.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div style={footerStyles}>
        <Textarea
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault(); // Prevent newline
              handleSend();
            }
          }}
          style={{
            marginRight: '10px',
            color: '#A0AEC0', // Light gray text
            backgroundColor: 'rgba(45, 55, 72, 0.9)',
            border: '1px solid rgba(160, 174, 192, 0.1)',
          }}
        />
        <Button variant="default" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};
