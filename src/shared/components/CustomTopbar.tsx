import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Search } from "lucide-react"
import AvatarImg from "../../assets/avatar.png"

interface Props {
    title?: string
}

export default function CustomTopbar({ title }: Props) {
    return (
        <div
            className="border-b"
        >
            <div
                className="flex h-16 items-center px-4"
            >
                <div
                    className="ml-4 flex items-center gap-4"
                >
                    <h2
                        className="text-lg font-semibold"
                    >
                        {title}
                    </h2>
                </div>

                <div
                    className="ml-auto flex items-center gap-4"
                >
                    <Button
                        variant="ghost" size="icon"
                    >
                        <Search
                            className="h-5 w-5"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <Bell
                            className="h-5 w-5"
                        />
                    </Button>
                    <Separator
                        orientation="vertical"
                        className="h-6"
                    />
                    <Avatar>
                        <AvatarImage
                            src={AvatarImg}
                        />
                        <AvatarFallback>
                            JR
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}
