import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CircleCheck, CircleAlert, CircleX } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  const getIconByVariant = (variant) => {
    switch (variant) {
      case "default":
        return <CircleCheck color="green" />;
      case "info":
        return <CircleX color="yellow" />;
      case "alert":
        return <CircleAlert color="red" />;
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        variant,
        action,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid gap-1">
              <div className="flex items-center gap-2">
                {getIconByVariant(variant)}
                {title && <ToastTitle>{title}</ToastTitle>}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
