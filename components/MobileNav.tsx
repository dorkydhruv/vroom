"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="menu"
            className="cursor-pointer sm:hidden"
            width={36}
            height={36}
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex-between items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={40}
              height={40}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white ">Vroom</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-6 text-white">
                <div className="flex flex-1 flex-col gap-6">
                  {sideBarLinks.map((item) => {
                    const isActive = pathname === item.route;

                    return (
                      <SheetClose asChild key={item.route}>
                        <Link
                          href={item.route}
                          key={item.label}
                          className={cn(
                            "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                            {
                              "bg-blue-1": isActive,
                            }
                          )}
                        >
                          <Image
                            src={item.imgUrl}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                          <p className="font-semibold">{item.label}</p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
