interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="max-w-[720px] mx-auto px-4 py-8 flex-1 w-full">
      {children}
    </main>
  );
}
