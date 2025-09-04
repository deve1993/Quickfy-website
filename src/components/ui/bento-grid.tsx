import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 auto-rows-max",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  benefits,
  theme,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  benefits?: string[];
  theme?: 'blue' | 'green' | 'purple';
}) => {
  // Generate theme-based styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'blue':
        return {
          border: 'border-blue-200 hover:border-blue-300',
          shadow: 'shadow-lg hover:shadow-blue-100 hover:shadow-xl',
          checkIcon: 'text-blue-600'
        };
      case 'green':
        return {
          border: 'border-green-200 hover:border-green-300',
          shadow: 'shadow-lg hover:shadow-green-100 hover:shadow-xl',
          checkIcon: 'text-green-600'
        };
      case 'purple':
        return {
          border: 'border-purple-200 hover:border-purple-300',
          shadow: 'shadow-lg hover:shadow-purple-100 hover:shadow-xl',
          checkIcon: 'text-purple-600'
        };
      default:
        return {
          border: 'border-gray-200 hover:border-gray-300',
          shadow: 'shadow-lg hover:shadow-xl',
          checkIcon: 'text-green-600'
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div
      className={cn(
        `group/bento row-span-1 flex flex-col h-fit min-h-[350px] sm:min-h-[400px] rounded-xl border-2 ${themeStyles.border} bg-white ${themeStyles.shadow} transition-all duration-300 overflow-hidden`,
        className,
      )}
    >
      {header}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="transition duration-200 group-hover/bento:translate-x-2 flex-1 flex flex-col">
          {icon}
          <div className="mt-3 sm:mt-4 mb-2 sm:mb-3 font-sans font-bold text-base sm:text-lg leading-tight text-neutral-700 dark:text-neutral-200">
            {title}
          </div>
          <div className="font-sans text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 mb-3 sm:mb-4 flex-1">
            {description}
          </div>
          {benefits && (
            <div className="space-y-2 mt-auto">
              {benefits.map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Check className={`${themeStyles.checkIcon} flex-shrink-0 mt-0.5`} size={16} />
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
