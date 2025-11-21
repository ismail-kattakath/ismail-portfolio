import React from "react";
import { Sparkles } from "lucide-react";

interface AITextAreaWithButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerateClick: () => void;
  placeholder: string;
  name: string;
  rows?: number;
  minHeight?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
}

const AITextAreaWithButton: React.FC<AITextAreaWithButtonProps> = ({
  value,
  onChange,
  onGenerateClick,
  placeholder,
  name,
  rows = 18,
  minHeight = "300px",
  maxLength,
  showCharacterCount = true,
  className = "",
}) => {
  const characterCount = value?.length || 0;
  const maxLengthDisplay = maxLength ? `/${maxLength}` : "";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative">
        <textarea
          placeholder={placeholder}
          name={name}
          rows={rows}
          className={`w-full px-4 py-3 bg-white/10 text-white rounded-t-lg rounded-b-none text-sm border border-white/20 border-b-0 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all resize-y min-h-[${minHeight}] placeholder:text-white/30 leading-relaxed block`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          style={{ minHeight }}
        />
        {showCharacterCount && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-white/5 rounded-lg text-xs text-white/50 pointer-events-none">
            {characterCount}
            {maxLengthDisplay}
          </div>
        )}
      </div>

      {/* Generate with AI Button - Connected to textarea bottom */}
      <button
        type="button"
        onClick={onGenerateClick}
        className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-t-none rounded-b-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group border border-white/20 border-t-0"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Generate with AI</span>
      </button>
    </div>
  );
};

export default AITextAreaWithButton;
