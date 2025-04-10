
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

interface RevenueFormProps {
  onRevenueAdded: (revenue: number) => void;
}

export function RevenueForm({onRevenueAdded}: RevenueFormProps) {
  const [revenue, setRevenue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revenue) {
      onRevenueAdded(parseFloat(revenue));
      setRevenue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="revenue">Revenue Amount</Label>
        <Input
          type="number"
          id="revenue"
          placeholder="Enter revenue amount"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
        />
      </div>
      <Button type="submit">Add Revenue</Button>
    </form>
  );
}
