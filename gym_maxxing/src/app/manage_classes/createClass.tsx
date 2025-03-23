import React from 'react';
import { useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddClass, FetchTrainers } from './manageClasses';
import { ClassInfo, Trainer } from '../lib/types';
import './style.css';

export function CreateClass() {

  // Getting trainer ID and 'last, first' and creating teh options for dropdown menu
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let data = await FetchTrainers();
      setTrainers(data ?? []);
    };
    fetchData();

    const trainerDropDown = document.getElementById('trainerDropdown');
    if(trainerDropDown) {
      for(let key in trainers) {
        let option = document.createElement('option');
        option.setAttribute('value', trainers[key].trainerName);
        let optionText = document.createTextNode(key);
        option.appendChild(optionText);
        trainerDropDown.appendChild(option);
      }
    }
  }, []);

  useEffect(() => {
    
  }, []);


  const handleSubmit = () => {
      const trainerDropDown = document.getElementById('trainerDropDown') as HTMLSelectElement;
      const classSizeInput = document.getElementById('classSize') as HTMLInputElement;

      const cls: ClassInfo = {
        classID: 0, // this value does not matter since the database is serialized
        title: (document.getElementById('className') as HTMLInputElement).value,
        date: (document.getElementById('classDate') as HTMLInputElement).value,
        time: (document.getElementById('classTime') as HTMLInputElement).value,
        trainerID: parseInt(trainerDropDown.value), // Convert string to number
        classSize: parseInt(classSizeInput.value) // Convert string to number
      }

      const addClass = async () => {
        await AddClass(cls);
        window.location.reload(); // refresh page to show updated table
      };
      addClass();
  };

  return (
    <Card className='mx-8 my-4'>
      <CardHeader>
        <CardTitle>Insert New Fitness Class:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 w-full'>
          <input 
            id='className' 
            type='text' 
            maxLength={25}
            placeholder='Enter class name' 
            className='input-style'
            style={{width:'25%'}}>
          </input>
          <input 
            id='classDate' 
            type='date' 
            className='input-style' 
            min={GetDate()} 
            style={{width:'15%'}}>
          </input>
          <input 
            id='classTime' 
            type='time' 
            className='input-style' 
            style={{width:'15%'}}>           
          </input>
          <select 
            id='trainerDropDown' 
            className='input-style' 
            style={{width:'20%'}}>
            <option value=''>Select a Trainer</option>
              {trainers.map((trainer) => (<option key={trainer.trainerID} value={trainer.trainerID}>{trainer.trainerName}</option>))}
          </select>
          <input 
            id='classSize' 
            type='number' 
            placeholder='Enter class size' 
            className='input-style' 
            min={0}>
          </input>
          <button 
            className='bg-blue-600 hover:bg-blue-700 button-style justify-center' 
            style={{width:'10%'}}
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function GetDate() {
  // get todays current date to only allow creation of classes that are today or in the future
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
