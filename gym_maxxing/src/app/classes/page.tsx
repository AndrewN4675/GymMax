"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

// Define interfaces
interface ClassData {
  id: string;
  name: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  instructor: string;
  category?: string;
  spots_available?: number;
}

interface CategoryItem {
  id: string;
  name: string;
}

export default function Classes(): React.ReactElement {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // This would come from your app's configuration or context
  const gymId = process.env.NEXT_PUBLIC_GYM_ID || '1'; 

  useEffect(() => {
    const fetchClasses = async (): Promise<void> => {
      try {
        setLoading(true);
        
        // Format date range based on current view
        const startDate = getStartDate(currentDate, currentView);
        const endDate = getEndDate(currentDate, currentView);
        
        const response = await fetch(`/api/classes?gym_id=${gymId}&start_date=${formatDateForAPI(startDate)}&end_date=${formatDateForAPI(endDate)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        
        const data = await response.json();
        setClasses(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchClasses();
  }, [gymId, currentDate, currentView]);

  const getStartDate = (date: Date, view: 'day' | 'week' | 'month'): Date => {
    const result = new Date(date);
    if (view === 'day') {
      return result;
    } else if (view === 'week') {
      const day = result.getDay();
      result.setDate(result.getDate() - day); // Start of week (Sunday)
      return result;
    } else if (view === 'month') {
      result.setDate(1); // Start of month
      return result;
    }
    return result;
  };

  const getEndDate = (date: Date, view: 'day' | 'week' | 'month'): Date => {
    const result = new Date(date);
    if (view === 'day') {
      return result;
    } else if (view === 'week') {
      const day = result.getDay();
      result.setDate(result.getDate() + (6 - day)); // End of week (Saturday)
      return result;
    } else if (view === 'month') {
      result.setMonth(result.getMonth() + 1);
      result.setDate(0); // Last day of current month
      return result;
    }
    return result;
  };

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeForDisplay = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const navigatePrevious = (): void => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = (): void => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToday = (): void => {
    setCurrentDate(new Date());
  };

  const getDaysInView = (): Date[] => {
    const days: Date[] = [];
    const start = getStartDate(currentDate, currentView);
    const end = getEndDate(currentDate, currentView);
    
    const current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getClassesForDay = (day: Date): ClassData[] => {
    const dayString = formatDateForAPI(day);
    return classes.filter(c => c.date === dayString);
  };

  const getCategoryColor = (category?: string): string => {
    const colors: Record<string, string> = {
      'cardio': 'bg-red-100 border-red-300',
      'strength': 'bg-blue-100 border-blue-300',
      'yoga': 'bg-green-100 border-green-300',
      'hiit': 'bg-orange-100 border-orange-300',
      'dance': 'bg-purple-100 border-purple-300',
      'pilates': 'bg-pink-100 border-pink-300',
      'spin': 'bg-yellow-100 border-yellow-300',
      'default': 'bg-gray-100 border-gray-300'
    };
    
    return colors[category?.toLowerCase() || ''] || colors.default;
  };

  // Mock categories for filtering - in reality, you would extract these from your classes data
  const categories: CategoryItem[] = [
    { id: 'all', name: 'All Classes' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'strength', name: 'Strength' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'dance', name: 'Dance' },
    { id: 'pilates', name: 'Pilates' },
    { id: 'spin', name: 'Spin' },
  ];

  const filteredClasses = filterCategory === 'all' 
    ? classes 
    : classes.filter(c => c.category?.toLowerCase() === filterCategory);

  return (
    <Layout title="GymMax | Classes">
      <div className="container mx-auto max-w-6xl">
        <section className="bg-[#a3ccd0] py-12 px-6 text-center rounded-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Fitness Classes</h1>
          <p className="text-lg text-white my-5">Browse and book our wide range of fitness classes</p>
        </section>
        
        <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <button 
                onClick={navigatePrevious} 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={navigateToday} 
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Today
              </button>
              <button 
                onClick={navigateNext} 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentView('day')} 
                className={`px-4 py-2 rounded transition-colors ${currentView === 'day' ? 'bg-[#a3ccd0] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Day
              </button>
              <button 
                onClick={() => setCurrentView('week')} 
                className={`px-4 py-2 rounded transition-colors ${currentView === 'week' ? 'bg-[#a3ccd0] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setCurrentView('month')} 
                className={`px-4 py-2 rounded transition-colors ${currentView === 'month' ? 'bg-[#a3ccd0] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterCategory === category.id 
                      ? 'bg-[#a3ccd0] text-white' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#a3ccd0] border-r-transparent"></div>
              <p className="mt-4">Loading classes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              <p>Error: {error}</p>
              <p className="mt-2">Please try again later or contact support.</p>
            </div>
          ) : (
            <>
              {/* Day View */}
              {currentView === 'day' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  
                  {filteredClasses.filter(c => c.date === formatDateForAPI(currentDate)).length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No classes scheduled for this day.</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredClasses
                        .filter(c => c.date === formatDateForAPI(currentDate))
                        .sort((a, b) => a.start_time.localeCompare(b.start_time))
                        .map(cls => (
                          <div 
                            key={cls.id} 
                            className={`p-4 rounded-lg border-2 ${getCategoryColor(cls.category)}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold">{cls.name}</h3>
                                <p className="text-sm text-gray-600">{formatTimeForDisplay(cls.start_time)} - {formatTimeForDisplay(cls.end_time)}</p>
                                <p className="mt-2">{cls.description}</p>
                                <p className="mt-1 font-medium">Instructor: {cls.instructor}</p>
                              </div>
                              
                              <Link 
                                href={`/book-class/${cls.id}`} 
                                className="bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                              >
                                Book Class
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Week View */}
              {currentView === 'week' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Week of {getStartDate(currentDate, 'week').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {getEndDate(currentDate, 'week').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {getDaysInView().map(day => (
                      <div key={day.toISOString()} className="border border-gray-300 rounded-lg">
                        <div className={`px-2 py-3 text-center font-medium ${
                          day.toDateString() === new Date().toDateString() 
                            ? 'bg-[#a3ccd0] text-white' 
                            : 'bg-gray-200'
                        }`}>
                          {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        
                        <div className="p-2 min-h-[150px]">
                          {filteredClasses
                            .filter(c => c.date === formatDateForAPI(day))
                            .sort((a, b) => a.start_time.localeCompare(b.start_time))
                            .map(cls => (
                              <div 
                                key={cls.id} 
                                className={`p-2 mb-2 text-sm rounded ${getCategoryColor(cls.category)}`}
                              >
                                <p className="font-bold truncate">{cls.name}</p>
                                <p className="text-xs">{formatTimeForDisplay(cls.start_time)}</p>
                                <Link 
                                  href={`/book-class/${cls.id}`} 
                                  className="block mt-1 text-xs bg-gray-900 text-white px-2 py-1 rounded text-center hover:bg-gray-800 transition-colors"
                                >
                                  Book
                                </Link>
                              </div>
                            ))}
                            
                          {filteredClasses.filter(c => c.date === formatDateForAPI(day)).length === 0 && (
                            <p className="text-xs text-center text-gray-500 pt-4">No classes</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Month View */}
              {currentView === 'month' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  
                  <div className="grid grid-cols-7 gap-1 text-center font-medium mb-1">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                      const daysInMonth = lastDayOfMonth.getDate();
                      const firstDayOfWeek = firstDayOfMonth.getDay();
                      
                      const days: (Date | null)[] = [];
                      
                      // Previous month days
                      for (let i = 0; i < firstDayOfWeek; i++) {
                        days.push(null);
                      }
                      
                      // Current month days
                      for (let i = 1; i <= daysInMonth; i++) {
                        days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
                      }
                      
                      return days.map((day, index) => (
                        <div 
                          key={index} 
                          className={`border p-1 min-h-[100px] ${
                            day === null 
                              ? 'bg-gray-50' 
                              : day.toDateString() === new Date().toDateString()
                                ? 'bg-[#a3ccd0] bg-opacity-20'
                                : ''
                          }`}
                        >
                          {day !== null && (
                            <>
                              <div className="text-right text-sm font-medium">{day.getDate()}</div>
                              <div className="mt-1">
                                {filteredClasses
                                  .filter(c => c.date === formatDateForAPI(day))
                                  .slice(0, 2) // Show only first 2 classes for space
                                  .map(cls => (
                                    <div 
                                      key={cls.id} 
                                      className={`text-xs p-1 mb-1 rounded truncate ${getCategoryColor(cls.category)}`}
                                    >
                                      {cls.name}
                                    </div>
                                  ))}
                                  
                                {filteredClasses.filter(c => c.date === formatDateForAPI(day)).length > 2 && (
                                  <div className="text-xs text-center text-gray-500">
                                    +{filteredClasses.filter(c => c.date === formatDateForAPI(day)).length - 2} more
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
}