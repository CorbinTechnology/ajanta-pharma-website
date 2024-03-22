"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import Navbar from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";
const raleway = Raleway({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ajanta Pharma Limited",
//   description: "An admin to manage you ecommerce applications and websites",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = true;
  const currentPath = usePathname();
  const hideNavbar =
    currentPath === "/admin/admin-add-course" ||
    currentPath === "/admin/admin-course-detail";

  return (
    <html lang="en">
      <body className={`main-body ${raleway.className}`}>
        {!hideNavbar && <Navbar isAdmin={isAdmin} />}
        <main>{children}</main>
      </body>
    </html>
  );
}
