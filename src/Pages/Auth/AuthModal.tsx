import { Modal } from "@/components/ui/modal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Login } from "./Login"
import { SignUp } from "./SignUp"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultTab?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Login />
                </TabsContent>

                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </Modal>
    )
}