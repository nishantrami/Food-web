import React from 'react';

export const OrderStatus = ({ timeline = [], currentStatus = "Order Placed" }) => {
  const statusIcons = {
    "Order Placed": "fa-solid fa-receipt",
    "Preparing": "fa-solid fa-kitchen-set",
    "Out for Delivery": "fa-solid fa-motorcycle",
    "Delivered": "fa-solid fa-house-chimney-check"
  };

  return (
    <div className="py-4">
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((step, idx) => {
          const iconClass = statusIcons[step.status] || "fa-solid fa-clock";
          const isDone = step.completed;
          const isCurrent = step.current;

          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Step indicator node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  isDone && !isCurrent
                    ? 'bg-amber-400 text-slate-900 shadow-md ring-4 ring-white'
                    : isCurrent
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 ring-4 ring-orange-100 animate-soft-pulse'
                    : 'bg-white border-2 border-slate-300 text-slate-400 ring-4 ring-white'
                }`}
              >
                {isDone && !isCurrent ? (
                  <i className="fa-solid fa-check text-[10px] sm:text-xs" aria-hidden="true" />
                ) : (
                  <i className={`${iconClass} text-[10px] sm:text-xs`} aria-hidden="true" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className={`text-sm sm:text-base font-black tracking-tight ${
                    isCurrent ? 'text-orange-600' : isDone ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.status}
                    {isCurrent && (
                      <span className="ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        In Progress
                      </span>
                    )}
                  </h4>
                  <span className="text-xs font-bold text-slate-400">
                    {step.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
