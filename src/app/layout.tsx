import { Navbar } from "@/components/navbar/Navbar";
import { Poppins } from 'next/font/google';
import "@/styles/global.css";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // выбирай нужные
    variable: '--font-poppins', // кастомная переменная
    display: 'swap',
  });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={poppins.variable}>
            <body>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    )
}