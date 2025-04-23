
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EntryDetailsFormProps {
  entryDate: string;
  reference: string;
  description: string;
  onDateChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function EntryDetailsForm({
  entryDate,
  reference,
  description,
  onDateChange,
  onReferenceChange,
  onDescriptionChange
}: EntryDetailsFormProps) {
  return (
    <div className="grid gap-6 py-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="entry-date" className="text-sm font-medium">Date</label>
          <Input 
            id="entry-date" 
            type="date" 
            value={entryDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="entry-reference" className="text-sm font-medium">Reference (Optional)</label>
          <Input 
            id="entry-reference" 
            placeholder="e.g., INV-001 or Payment #123"
            value={reference}
            onChange={(e) => onReferenceChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="entry-description" className="text-sm font-medium">Description</label>
        <Textarea 
          id="entry-description" 
          placeholder="Enter a detailed description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
}
