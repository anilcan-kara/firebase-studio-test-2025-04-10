
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {categorizeExpense} from '@/ai/flows/categorize-expense';
import {toast} from "@/hooks/use-toast";

interface ExpenseFormProps {
  onExpenseAdded: (expense: number) => void;
}

export function ExpenseForm({onExpenseAdded}: ExpenseFormProps) {
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (expense) {
      onExpenseAdded(parseFloat(expense));
      try {
        const aiResponse = await categorizeExpense({description});
        setCategory(aiResponse?.category || 'Uncategorized');
        toast({
          title: "Expense categorized",
          description: `Expense was categorized as ${aiResponse?.category || 'Uncategorized'}`,
        });
      } catch (e) {
        toast({
          title: "Expense categorization failed",
          description: 'AI Categorization failed. Please try again later.',
        });
        console.log("AI Categorization failed", e);
      }

      setExpense('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="expense">Expense Amount</Label>
        <Input
          type="number"
          id="expense"
          placeholder="Enter expense amount"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Expense Description</Label>
        <Textarea
          id="description"
          placeholder="Enter expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {category && (
        <div>
          <Label>Category</Label>
          <Input type="text" value={category} readOnly />
        </div>
      )}
      <Button type="submit">Add Expense</Button>
    </form>
  );
}
