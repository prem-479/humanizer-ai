import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, Clipboard, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export function TextInput({ value, onChange, disabled, maxLength = 10000 }: TextInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text.slice(0, maxLength));
        toast.success('Text pasted from clipboard');
      }
    } catch {
      toast.error('Failed to paste from clipboard');
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      toast.error('Please upload a text file (.txt or .md)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onChange(text.slice(0, maxLength));
      toast.success(`Uploaded: ${file.name}`);
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.9;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Original Text
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            disabled={disabled}
            className="h-8"
          >
            <Clipboard className="h-4 w-4" />
            Paste
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="h-8"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              disabled={disabled}
              className="h-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div
        className={`relative transition-all duration-200 ${
          isDragging ? 'scale-[1.01]' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          disabled={disabled}
          placeholder="Paste or type your AI-generated text here..."
          className={`min-h-[240px] w-full resize-none rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
            isDragging ? 'border-primary ring-2 ring-primary/20' : 'border-input'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-primary">
              <FileText className="h-6 w-6" />
              <span className="font-medium">Drop file here</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Supports .txt and .md files
        </span>
        <span className={isNearLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}>
          {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,text/plain,text/markdown"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
