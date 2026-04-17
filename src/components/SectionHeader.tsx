interface Props {
  number: string;
  title: string;
  subtitle: string;
  keyMessage?: string;
}

export default function SectionHeader({ number, title, subtitle, keyMessage }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/30 flex items-center justify-center">
          <span className="text-accent-500 text-sm font-bold">{number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-navy-900 leading-tight">{title}</h2>
          <p className="mt-1 text-navy-500 text-sm leading-relaxed">{subtitle}</p>
        </div>
      </div>
      {keyMessage && (
        <div className="mt-4 ml-14 pl-4 border-l-2 border-accent-400">
          <p className="text-sm text-navy-700 font-medium">{keyMessage}</p>
        </div>
      )}
    </div>
  );
}
