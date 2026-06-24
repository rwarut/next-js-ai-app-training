import { Button } from "@/components/ui/button";

interface PeriodSelectorProps {
  value: '7d' | '30d' | '90d';
  onChange: (value: '7d' | '30d' | '90d') => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex items-center bg-muted/50 p-1 rounded-lg border">
      {(['7d', '30d', '90d'] as const).map((period) => (
        <Button
          key={period}
          size="sm"
          variant={value === period ? "default" : "ghost"}
          onClick={() => onChange(period)}
          className="rounded-md px-3 py-1 text-xs transition-all"
        >
          {period === '7d' ? '7 วันล่าสุด' : period === '30d' ? '30 วันล่าสุด' : '90 วันล่าสุด'}
        </Button>
      ))}
    </div>
  );
}
