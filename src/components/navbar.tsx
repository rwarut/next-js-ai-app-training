import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBag } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-[#E5E5E5] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Badge className="px-3 py-1.5 bg-[#22D3EE]/15 hover:bg-[#22D3EE]/25 text-[#083344] border-none text-[13px] font-sans flex items-center gap-1.5 rounded-full">
              <ShoppingBag className="size-4 text-[#083344]" /> 
              <span><CountCartItem /> ชิ้น</span>
            </Badge>
          </Link>

          <div className="flex items-center gap-3">
            {
              !session && (
                <>
                  <Button asChild className="hidden sm:inline-flex" variant="outline" size="sm">
                    <Link href="/login">เข้าสู่ระบบ</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">สมัครสมาชิก</Link>
                  </Button>
                </>
              )
            }

            {
              session && (
                <>
                  <div className="hidden lg:block text-sm font-sans text-[#525252]">
                    สวัสดี, <span className="font-semibold text-foreground">{session.user.name}</span>
                  </div>
                  <div>
                    <LogoutButton />
                  </div>
                </>
              )
            }

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
