export function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i + 1 === current
              ? "w-6 h-2.5 bg-orange-500"
              : i + 1 < current
                ? "w-2.5 h-2.5 bg-orange-300"
                : "w-2.5 h-2.5 bg-stone-200"
          }`}
        />
      ))}
    </div>
  );
}
