import { Header } from "./header/header";

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 flex flex-col gap-8 h-dvh">
      <Header />

      {children}
    </div>
  );
}
