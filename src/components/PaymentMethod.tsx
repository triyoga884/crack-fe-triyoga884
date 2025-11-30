import { Banknote, CreditCard, Wallet } from 'lucide-react';
import React from 'react';

function PaymentMethod({
  id,
  desc,
}: {
  id: 'xendit' | 'midtrans' | 'bank';
  desc: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        name="payment"
        id={id}
        value={id}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="flex items-center justify-between w-full p-3 border rounded-md cursor-pointer transition-shadow hover:shadow-sm peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-200"
      >
        <div className="flex items-center gap-3">
          <CreditCard
            className={`${
              id === 'xendit' ? 'block' : 'hidden'
            } w-5 h-5 text-slate-600`}
          />
          <Wallet
            className={`${
              id === 'midtrans' ? 'block' : 'hidden'
            } w-5 h-5 text-slate-600`}
          />
          <Banknote
            className={`${
              id === 'bank' ? 'block' : 'hidden'
            } w-5 h-5 text-slate-600`}
          />
          <div className="text-sm">
            <div className="font-medium">{id}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
        </div>
        <div className="text-sm font-medium text-slate-700">Rp.198.000</div>
      </label>
    </div>
  );
}

export default PaymentMethod;
