import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  isDeleting: boolean;
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  productName,
  isDeleting
}: DeleteConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Dialog Content */}
      <div className="relative bg-card border shadow-lg max-w-md w-full mx-4 rounded-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 p-6 space-y-6">
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 rounded-full bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold">ยืนยันการลบสินค้า</h3>
            <p className="text-sm text-muted-foreground">
              คุณต้องการลบสินค้า <span className="font-semibold text-foreground">&quot;{productName}&quot;</span> ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isDeleting}
          >
            ยกเลิก
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                กำลังลบ...
              </>
            ) : (
              "ยืนยันการลบ"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
