"use client";

import * as React from "react";
import { FlipCard } from "@/components/ui/flip-card";
import { Logo } from "@/components/common/Logo";

const cards = [
  {
    cardNumber: 1,
    backTitle: "Mount Everest",
    backContent: "Height: 8,849 m · Location: Nepal / Tibet",
    backImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cardNumber: 2,
    backTitle: "K2",
    backContent: "Height: 8,611 m · Location: Pakistan / China",
    backImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cardNumber: 3,
    backTitle: "Kangchenjunga",
    backContent: "Height: 8,586 m · Location: Nepal / India",
    backImage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop",
  },
];

export function FlipCardDemo() {
  const [flippedCards, setFlippedCards] = React.useState<
    Record<string, boolean>
  >({});

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-black p-6 text-white">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {cards.map((card) => (
            <div
              key={card.cardNumber}
              className="w-[220px] sm:w-[260px] h-[350px] sm:h-[390px]"
            >
              <FlipCard
                cardNumber={card.cardNumber}
                frontTitle={card.backTitle}
                backTitle={card.backTitle}
                backContent={card.backContent}
                backImage={card.backImage}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default FlipCardDemo;
