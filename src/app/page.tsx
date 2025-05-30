import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src="/hero.jpeg"
        alt="Wedding background"
        fill
        className="object-cover -z-10"
        priority
      />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        
      </main>
    
    </div>
  );
}
