import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import React from 'react';
import { Button } from './ui/button';

interface ModalProps {
  title: string;
  desc: string;
  variant?: any;
  func: () => void;
  closeFunc: (e: boolean) => void;
}

function ConfirmModal({ title, desc, variant, func, closeFunc }: ModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{desc}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex-row justify-end">
        <Button onClick={() => closeFunc(false)} variant="outline">
          Cancel
        </Button>
        <Button onClick={func} variant={variant ? variant : 'default'}>
          Ok
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default ConfirmModal;
