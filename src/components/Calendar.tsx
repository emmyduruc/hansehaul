'use client';

import { useTranslations } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CalendarProps {
  pickupDate: Date | null;
  returnDate: Date | null;
  onPickupDateChange: (date: Date | null) => void;
  onReturnDateChange: (date: Date | null) => void;
  onValidationError: (message: string) => void;
}

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const bgColor = type === 'error' ? 'bg-accent-error' : type === 'success' ? 'bg-accent-success' : 'bg-accent';
  const textColor = 'text-background';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`fixed top-6 right-6 z-50 ${bgColor} ${textColor} px-6 py-4 rounded-lg shadow-lg max-w-sm`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-background/80 hover:text-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default function Calendar({
  pickupDate,
  returnDate,
  onPickupDateChange,
  onReturnDateChange,
  onValidationError
}: CalendarProps) {
  const { t } = useTranslations();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  // Mock booked dates - in real app this would come from API
  const bookedDates = [
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 11, 26),
    new Date(2024, 11, 31), // New Year's Eve
    new Date(2025, 0, 1),   // New Year's Day
    new Date(2025, 0, 6),   // Epiphany
  ];

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type, onClose: () => setToast(null) });
    setTimeout(() => setToast(null), 5000);
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() &&
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (date < today) return true;
    
    // Disable booked dates
    if (isDateBooked(date)) return true;
    
    // For return date, disable dates before pickup date
    if (pickupDate && date <= pickupDate) return true;
    
    return false;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const handleDateSelect = (date: Date, isPickup: boolean) => {
    if (isDateBooked(date)) {
      showToast(t('book.calendar.bookedOut'), 'error');
      return;
    }

    if (isPickup) {
      onPickupDateChange(date);
      setShowPickupCalendar(false);
      
      // If return date is before new pickup date, clear it
      if (returnDate && returnDate <= date) {
        onReturnDateChange(null);
      }
    } else {
      if (!pickupDate) {
        showToast(t('book.calendar.pickupRequired'), 'error');
        return;
      }
      
      if (date <= pickupDate) {
        showToast(t('book.calendar.invalidRange'), 'error');
        return;
      }
      
      onReturnDateChange(date);
      setShowReturnCalendar(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t('book.calendar.selectDate');
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const monthNames = [
    t('book.calendar.months.january'),
    t('book.calendar.months.february'),
    t('book.calendar.months.march'),
    t('book.calendar.months.april'),
    t('book.calendar.months.may'),
    t('book.calendar.months.june'),
    t('book.calendar.months.july'),
    t('book.calendar.months.august'),
    t('book.calendar.months.september'),
    t('book.calendar.months.october'),
    t('book.calendar.months.november'),
    t('book.calendar.months.december')
  ];

  const weekDays = [
    t('book.calendar.weekdays.monday'),
    t('book.calendar.weekdays.tuesday'),
    t('book.calendar.weekdays.wednesday'),
    t('book.calendar.weekdays.thursday'),
    t('book.calendar.weekdays.friday'),
    t('book.calendar.weekdays.saturday'),
    t('book.calendar.weekdays.sunday')
  ];

  const days = getDaysInMonth(currentMonth);

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast {...toast} />}
      </AnimatePresence>

      <div className="bg-background-secondary p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-text mb-6">{t('book.calendar.title')}</h3>
        <p className="text-text-secondary mb-6">{t('book.calendar.subtitle')}</p>
        
        {/* Date Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Pickup Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-text mb-2">
              {t('book.calendar.pickupDate')}
            </label>
            <button
              onClick={() => setShowPickupCalendar(!showPickupCalendar)}
              className={`w-full px-4 py-3 text-left border-2 rounded-lg transition-all duration-300 flex items-center justify-between ${
                pickupDate 
                  ? 'border-accent bg-accent/5 text-text' 
                  : 'border-background-tertiary hover:border-accent/30 text-text-secondary'
              }`}
            >
              <span>{formatDate(pickupDate)}</span>
              <CalendarIcon className="w-5 h-5" />
            </button>
            
            {/* Pickup Calendar Dropdown */}
            <AnimatePresence>
              {showPickupCalendar && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-background-tertiary rounded-lg shadow-xl z-20 p-4"
                >
                  <CalendarGrid
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    days={days}
                    weekDays={weekDays}
                    monthNames={monthNames}
                    isDateDisabled={isDateDisabled}
                    isDateBooked={isDateBooked}
                    onDateSelect={(date) => handleDateSelect(date, true)}
                    selectedDate={pickupDate}
                    highlightColor="accent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Return Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-text mb-2">
              {t('book.calendar.returnDate')}
            </label>
            <button
              onClick={() => setShowReturnCalendar(!showReturnCalendar)}
              className={`w-full px-4 py-3 text-left border-2 rounded-lg transition-all duration-300 flex items-center justify-between ${
                returnDate 
                  ? 'border-accent bg-accent/5 text-text' 
                  : 'border-background-tertiary hover:border-accent/30 text-text-secondary'
              }`}
            >
              <span>{formatDate(returnDate)}</span>
              <CalendarIcon className="w-5 h-5" />
            </button>
            
            {/* Return Calendar Dropdown */}
            <AnimatePresence>
              {showReturnCalendar && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-background-tertiary rounded-lg shadow-xl z-20 p-4"
                >
                  <CalendarGrid
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    days={days}
                    weekDays={weekDays}
                    monthNames={monthNames}
                    isDateDisabled={isDateDisabled}
                    isDateBooked={isDateBooked}
                    onDateSelect={(date) => handleDateSelect(date, false)}
                    selectedDate={returnDate}
                    highlightColor="accent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-text-secondary">{t('book.calendar.available')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-error rounded-full"></div>
            <span className="text-text-secondary">{t('book.calendar.bookedOut')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-background-tertiary rounded-full"></div>
            <span className="text-text-secondary">{t('book.calendar.today')}</span>
          </div>
        </div>
      </div>
    </>
  );
}

interface CalendarGridProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  days: (Date | null)[];
  weekDays: string[];
  monthNames: string[];
  isDateDisabled: (date: Date) => boolean;
  isDateBooked: (date: Date) => boolean;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  highlightColor: string;
}

const CalendarGrid = ({
  currentMonth,
  setCurrentMonth,
  days,
  weekDays,
  monthNames,
  isDateDisabled,
  isDateBooked,
  onDateSelect,
  selectedDate,
  highlightColor
}: CalendarGridProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return selectedDate &&
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-text" />
        </button>
        
        <h3 className="text-lg font-semibold text-text">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-text" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-text-secondary py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-10" />;
          }

          const disabled = isDateDisabled(day);
          const booked = isDateBooked(day);
          const today = isToday(day);
          const selected = isSelected(day);

          let bgColor = 'bg-background';
          let textColor = 'text-text';
          let borderColor = 'border-transparent';

          if (selected) {
            bgColor = 'bg-accent';
            textColor = 'text-background';
            borderColor = 'border-accent';
          } else if (booked) {
            bgColor = 'bg-accent-error';
            textColor = 'text-background';
            borderColor = 'border-accent-error';
          } else if (today) {
            bgColor = 'bg-background-tertiary';
            textColor = 'text-text';
            borderColor = 'border-background-tertiary';
          } else if (disabled) {
            bgColor = 'bg-background-secondary';
            textColor = 'text-text-muted';
            borderColor = 'border-background-secondary';
          }

          return (
            <button
              key={index}
              onClick={() => !disabled && onDateSelect(day)}
              disabled={disabled}
              className={`
                h-10 w-full rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-medium
                ${bgColor} ${textColor} ${borderColor}
                ${!disabled ? 'hover:scale-105 hover:shadow-md cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
