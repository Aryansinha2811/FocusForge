import * as React from "react"
import { cn } from "@/lib/utils"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
    // Close on ESC key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    "relative bg-white border-4 border-border shadow-[12px_12px_0px_0px_oklch(var(--border))] rounded-base max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto",
                    className
                )}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 bg-secondary-background border-2 border-border rounded-base hover:bg-destructive hover:text-white transition-colors flex items-center justify-center font-bold"
                >
                    ✕
                </button>

                {/* Content */}
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}