import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../hooks/useToast';
import { getRecipeForFood } from '../../data/recipes';

export const FoodRecipeSection = ({ food }) => {
  const { success: toastSuccess, info: toastInfo } = useToast();
  const recipe = food?.recipe || getRecipeForFood(food);

  // Portion multiplier: 1x, 2x, 4x
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Active cooking mode modal
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Interactive kitchen timer for cooking mode
  const [timerSeconds, setTimerSeconds] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  if (!recipe || !recipe.steps || recipe.steps.length === 0) {
    return null;
  }

  // Base servings
  const baseServings = recipe.servings || 2;
  const currentServings = baseServings * portionMultiplier;

  // Toggle step complete
  const toggleStepComplete = (stepNum) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  // Toggle ingredient checked
  const toggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Calculate progress
  const totalSteps = recipe.steps.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  // Scale ingredient amounts if they contain numbers
  const scaleAmount = (amountStr, mult) => {
    if (mult === 1 || !amountStr) return amountStr;
    // Attempt to parse leading or embedded numbers (e.g., "250g", "1/2 cup", "2 tbsp", "1.5 cups")
    return amountStr.replace(/(\d+(\.\d+)?|\d+\/\d+)/g, (match) => {
      if (match.includes('/')) {
        const [num, den] = match.split('/');
        const val = (parseFloat(num) / parseFloat(den)) * mult;
        return Number.isInteger(val) ? val : val.toFixed(1);
      }
      const val = parseFloat(match) * mult;
      return Number.isInteger(val) ? val : val.toFixed(1);
    });
  };

  // Copy recipe to clipboard
  const handleCopyRecipe = () => {
    const text = `🍳 RECIPE: ${food.name}\n` +
      `⏱️ Prep Time: ${recipe.prepTime} | Cook Time: ${recipe.cookTime} | Servings: ${currentServings}\n\n` +
      `🛒 INGREDIENTS:\n` +
      recipe.ingredients.map(ing => `• ${scaleAmount(ing.amount, portionMultiplier)} ${ing.name}`).join('\n') +
      `\n\n👨‍🍳 STEP-BY-STEP INSTRUCTIONS:\n` +
      recipe.steps.map(s => `Step ${s.step}: ${s.title}\n${s.instruction}${s.tip ? `\n💡 Chef Tip: ${s.tip}` : ''}`).join('\n\n') +
      `\n\nBon Appétit! (From FoodVerse)`;

    navigator.clipboard.writeText(text);
    toastSuccess("Recipe copied to clipboard! Share with friends or save in your notes.");
  };

  // Print recipe
  const handlePrint = () => {
    window.print();
  };

  // Cooking mode timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      toastInfo("⏱️ Timer finished for this step!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, toastInfo]);

  const startStepTimer = (minutes) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimer = (sec) => {
    if (sec == null) return "00:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="recipe" className="mt-12 pt-10 border-t border-slate-200/80">
      {/* Header Container */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-orange-200/70 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm mb-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-black tracking-wider uppercase shadow-xs">
              <i className="fa-solid fa-kitchen-set text-xs" aria-hidden="true" />
              <span>Step-by-Step Cooking Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Chef's Recipe:</span>
              <span className="text-orange-600">{food.name}</span>
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              {recipe.chefNote || `Follow our master culinary team's authentic step-by-step instructions to recreate restaurant-quality ${food.name} in your own kitchen.`}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveStepIndex(0);
                setIsCookingModeOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            >
              <i className="fa-solid fa-play text-xs" aria-hidden="true" />
              <span>Start Cooking Mode</span>
            </motion.button>

            <button
              type="button"
              onClick={handleCopyRecipe}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs transition-colors cursor-pointer"
              title="Copy Recipe"
            >
              <i className="fa-solid fa-copy text-xs text-orange-500" aria-hidden="true" />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs transition-colors cursor-pointer"
              title="Print Recipe"
            >
              <i className="fa-solid fa-print text-xs text-slate-500" aria-hidden="true" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Floating background decorative chef hat */}
        <div className="absolute -right-6 -bottom-8 text-orange-500/10 text-9xl pointer-events-none select-none">
          <i className="fa-solid fa-hat-chef" aria-hidden="true" />
        </div>
      </div>

      {/* Metrics Row: Prep Time, Cook Time, Servings, Difficulty, Nutrition */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-clock text-base" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Prep Time</span>
            <span className="text-sm font-extrabold text-slate-800">{recipe.prepTime}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-fire text-base" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cook Time</span>
            <span className="text-sm font-extrabold text-slate-800">{recipe.cookTime}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-users text-base" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Servings</span>
            <span className="text-sm font-extrabold text-slate-800">{currentServings} Portions</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-gauge-high text-base" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</span>
            <span className="text-sm font-extrabold text-slate-800 capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        {recipe.nutrition && (
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-heart-pulse text-base" aria-hidden="true" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Calories</span>
              <span className="text-sm font-extrabold text-slate-800">{recipe.nutrition.calories}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Column Content: Ingredients on Left, Steps on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ingredients with Checkboxes & Serving Scaler */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Ingredients Needed
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  Check off items as you prep
                </span>
              </div>

              {/* Portion Multiplier Pill */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[1, 2, 4].map(mult => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => setPortionMultiplier(mult)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      portionMultiplier === mult
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist of Ingredients */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = Boolean(checkedIngredients[idx]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                        : 'bg-white hover:bg-orange-50/40 border-slate-200/80 text-slate-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <i className="fa-solid fa-check text-[11px]" aria-hidden="true" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-xs font-bold leading-tight ${isChecked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {ing.name}
                        </span>
                        <span className={`text-xs font-black shrink-0 ${isChecked ? 'line-through text-slate-400' : 'text-orange-600'}`}>
                          {scaleAmount(ing.amount, portionMultiplier)}
                        </span>
                      </div>
                      {ing.category && (
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {ing.category}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress status */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Ingredients Prepared:</span>
              <span className="text-orange-600 font-black">
                {Object.values(checkedIngredients).filter(Boolean).length} of {recipe.ingredients.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Step-Wise Step Instructions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Progress Header */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Cooking Directions (Step-by-Step)
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  Follow each step sequentially for the best texture and flavor
                </span>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                {completedCount} / {totalSteps} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            {recipe.steps.map((s, index) => {
              const isDone = Boolean(completedSteps[s.step]);
              return (
                <div
                  key={s.step}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-300 relative overflow-hidden ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50/20 shadow-xs'
                      : 'border-slate-200/90 shadow-xs hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number Circle */}
                    <button
                      type="button"
                      onClick={() => toggleStepComplete(s.step)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm transition-transform cursor-pointer hover:scale-105 ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'bg-orange-500 text-white shadow-sm'
                      }`}
                      title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                    >
                      {isDone ? (
                        <i className="fa-solid fa-check text-base" aria-hidden="true" />
                      ) : (
                        <span>{s.step}</span>
                      )}
                    </button>

                    {/* Step Content */}
                    <div className="flex-1 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className={`text-base font-black tracking-tight ${
                          isDone ? 'text-slate-600 line-through' : 'text-slate-900'
                        }`}>
                          {s.title}
                        </h4>

                        <div className="flex items-center gap-2">
                          {s.timerMinutes && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                              <i className="fa-solid fa-stopwatch text-[10px]" aria-hidden="true" />
                              <span>{s.timerMinutes} mins</span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleStepComplete(s.step)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                              isDone
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-700'
                            }`}
                          >
                            {isDone ? "Completed" : "Mark Done"}
                          </button>
                        </div>
                      </div>

                      <p className={`text-sm leading-relaxed ${
                        isDone ? 'text-slate-500' : 'text-slate-700 font-normal'
                      }`}>
                        {s.instruction}
                      </p>

                      {/* Chef's Pro Tip Box */}
                      {s.tip && (
                        <div className="mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 font-medium">
                          <i className="fa-solid fa-lightbulb text-amber-500 text-sm mt-0.5 shrink-0" aria-hidden="true" />
                          <div>
                            <span className="font-black text-amber-800 block">Chef's Secret Tip:</span>
                            <span>{s.tip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chef's General Pro Tips Card */}
          {recipe.chefTips && recipe.chefTips.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                <i className="fa-solid fa-award text-amber-500 text-base" aria-hidden="true" />
                <span>Culinary Master Secrets</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {recipe.chefTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Guided "Cooking Mode" Modal */}
      <AnimatePresence>
        {isCookingModeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-kitchen-set text-lg" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-black leading-tight truncate">
                      {food.name} — Cooking Mode
                    </h3>
                    <span className="text-xs font-bold text-white/80">
                      Step {activeStepIndex + 1} of {totalSteps}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCookingModeOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Close Cooking Mode"
                >
                  <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                {/* Step Title & Instruction with Extra Large Typography */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase">
                    <span>Step {recipe.steps[activeStepIndex]?.step}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {recipe.steps[activeStepIndex]?.title}
                  </h2>

                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {recipe.steps[activeStepIndex]?.instruction}
                  </p>
                </div>

                {/* Step Tip */}
                {recipe.steps[activeStepIndex]?.tip && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
                    <i className="fa-solid fa-lightbulb text-amber-500 text-base mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-black block">Chef's Tip:</span>
                      <span>{recipe.steps[activeStepIndex]?.tip}</span>
                    </div>
                  </div>
                )}

                {/* Built-in Kitchen Timer */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl font-black shadow-xs">
                      <i className="fa-solid fa-stopwatch" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kitchen Timer</span>
                      <span className="text-2xl font-black text-slate-900 font-mono">
                        {formatTimer(timerSeconds ?? (recipe.steps[activeStepIndex]?.timerMinutes ? recipe.steps[activeStepIndex].timerMinutes * 60 : 0))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {recipe.steps[activeStepIndex]?.timerMinutes && !timerSeconds && (
                      <button
                        type="button"
                        onClick={() => startStepTimer(recipe.steps[activeStepIndex].timerMinutes)}
                        className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Set {recipe.steps[activeStepIndex].timerMinutes}m
                      </button>
                    )}

                    {timerSeconds != null && (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsTimerRunning(r => !r)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          {isTimerRunning ? "Pause" : "Resume"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsTimerRunning(false);
                            setTimerSeconds(null);
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Reset
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Navigation Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(i => Math.max(0, i - 1))}
                  className="px-4 py-2 rounded-xl bg-white text-slate-700 font-bold text-xs border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-chevron-left text-[10px]" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-bold text-slate-500">
                  Step {activeStepIndex + 1} of {totalSteps}
                </div>

                {activeStepIndex < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      toggleStepComplete(recipe.steps[activeStepIndex]?.step);
                      setActiveStepIndex(i => Math.min(totalSteps - 1, i + 1));
                    }}
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Next Step</span>
                    <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      toggleStepComplete(recipe.steps[activeStepIndex]?.step);
                      setIsCookingModeOpen(false);
                      toastSuccess("🎉 Congratulations! Recipe completed. Enjoy your delicious homemade meal!");
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Finish Cooking 🎉</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
