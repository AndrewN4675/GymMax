'use client';

import React, { useEffect, useState } from 'react';
import { RetrieveClasses } from './retrieveClasses';
import { ClassInfo, Gym } from './interfaces';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function FilterableGymClasses() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function GymClasses() {
      try {
        const gymList: Gym[] = [
          {
            gym_id: 1,
            gym_name: 'Gym A',
            street: '123 Main',
            city: 'Townsville',
            state: 'CA',
            postal_code: 12345,
            phone_numer: 5551111,
          },
          {
            gym_id: 2,
            gym_name: 'Gym B',
            street: '456 Oak Ave',
            city: 'Cityplace',
            state: 'NY',
            postal_code: 67890,
            phone_numer: 5552222,
          },
          {
            gym_id: 3,
            gym_name: 'Gym C',
            street: '123 Oak Ave',
            city: 'Cilace',
            state: 'OI',
            postal_code: 21234,
            phone_numer: 5431322,
          }
        ];
        setGyms(gymList);
      } catch (error) {
        console.error('Error fetching gyms:', error);
      }
    }
    GymClasses();
  }, []);

  useEffect(() => {
    if (selectedGymId === null) {
      return;
    }

    const fetchClasses = async () => {
      setLoading(true);
      try {
        const data = await RetrieveClasses(selectedGymId);
        setClasses(data ?? []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [selectedGymId]);

  const handleGymChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedGymId(val);
  };

  const calendarEvents = classes.map(cls => {
    const start = new Date(`${cls.date} ${cls.time}`);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    return {
      title: cls.title,
      start,
      end
    };
  });

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Filter Classes By Gym</h2>

      {/* Gym dropdown */}
      <label htmlFor="gymSelect">Select a Gym:</label>
      <select
        id="gymSelect"
        value={selectedGymId ?? ''}
        onChange={handleGymChange}
        style={{ marginLeft: '1rem' }}
      >
        <option value="">-- Choose a Gym --</option>
        {gyms.map(gym => (
          <option key={gym.gym_id} value={gym.gym_id}>
            {gym.gym_name}
          </option>
        ))}
      </select>

      {loading && <p>Loading classes...</p>}

      {/* Classes table */}
      {!loading && classes.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Class List</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-center p-2 border">Title</th>
                <th className="text-center p-2 border">Date</th>
                <th className="text-center p-2 border">Start Time</th>
                <th className="text-center p-2 border">Trainer</th>
                <th className="text-center p-2 border">Size</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => (
                <tr key={cls.classID} className="border-b">
                  <td className="text-left p-2 border">{cls.title}</td>
                  <td className="text-left p-2 border">{cls.date}</td>
                  <td className="text-left p-2 border">{cls.time}</td>
                  <td className="text-left p-2 border">{cls.trainerName}</td>
                  <td className="text-left p-2 border">{cls.classSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* If a gym is selected but no classes were found */}
      {!loading && selectedGymId !== null && classes.length === 0 && (
        <p>No classes found for this gym.</p>
      )}

      {/* Calendar view */}
      {!loading && classes.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Calendar View</h3>
          <div style={{ height: '500px' }}>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
