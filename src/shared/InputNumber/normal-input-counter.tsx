"use client";

import type { FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export interface InputNumberProps {
  className?: string;
  moq?: number; // Minimum order quantity
  soh?: number; // Stock on hand
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const QuantityInputNumber: FC<InputNumberProps> = ({
  className = "w-fit",
  moq = 1,
  soh = 0,
  onChange,
  label,
  desc,
}) => {
  const step = moq || 1;
  const min = moq || 1;
  const max = soh > 0 ? soh * 2 : moq*10;
  const defaultValue = min;

  const [value, setValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue.toString());

  useEffect(() => {
    setValue(defaultValue);
    setInputValue(defaultValue.toString());
  }, [defaultValue]);

  // Round to nearest multiple of step
  const roundToStep = (val: number) => {
    return Math.round(val / step) * step;
  };

  // Debounced validation (1 sec)
  const debouncedValidation = useMemo(
    () =>
      debounce((val: string) => {
        let numValue = parseInt(val, 10);
        if (isNaN(numValue)) numValue = min;

        // Round to nearest step
        let newValue = roundToStep(numValue);

        if (newValue < min) {
          newValue = min;
        } else if (max && newValue > max) {
          newValue = max;
        }

        setValue(newValue);
        setInputValue(newValue.toString());
        onChange?.(newValue);
      }, 1000),
    [min, max, step, onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only digits
    const val = e.target.value.replace(/\D/g, "");
    setInputValue(val);
    debouncedValidation(val);
  };

  const handleClickDecrement = () => {
    if (value <= min) return;
    const newValue = Math.max(min, value - step);
    setValue(newValue);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleClickIncrement = () => {
    if (max && value >= max) return;
    const newValue = Math.min(max, value + step);
    setValue(newValue);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const renderLabel = () => (
    <div className="flex flex-col">
      <span className="font-medium">{label}</span>
      {desc && (
        <span className="text-xs font-normal text-neutral-500">{desc}</span>
      )}
    </div>
  );

  return (
    <div
      className={`nc-InputNumber border-2 rounded-md border-primary/15 dark:border-neutral-500 flex items-center justify-between ${className}`}
    >
      {label && renderLabel() }

      <div className="nc-NcInputNumber__content text-primary dark:text-neutral-100 flex w-[120px] items-center justify-between">
        <button
          className="flex h-8 w-6 items-center justify-center text-xl focus:outline-none disabled:opacity-50"
          type="button"
          onClick={handleClickDecrement}
          disabled={value <= min}
        >
          -
        </button>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleChange}
          className="block w-20 text-center border-none outline-none bg-transparent"
        />

        <button
          className="flex h-8 w-6 items-center justify-center text-xl focus:outline-none disabled:opacity-50"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? value >= max : false}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInputNumber;
