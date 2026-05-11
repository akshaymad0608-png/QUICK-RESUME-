import { useState, useEffect } from 'react';
import { ResumeData } from '../types';

const STORAGE_KEY = 'quickresume_data_v2'; // Bumped version to v2 to forcefully wipe old blank data

export const useAutoSave = (initialData: ResumeData) => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // If it's saved, return it 
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load saved resume data', err);
    }
    // Return the provided default layout
    return initialData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to auto-save resume data', err);
    }
  }, [data]);

  return [data, setData] as const;
};
