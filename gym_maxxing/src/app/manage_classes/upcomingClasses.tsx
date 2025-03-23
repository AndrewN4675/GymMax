
import { useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FetchClasses, RemoveClass } from './manageClasses';
import { ClassInfo } from '../lib/types';
import './style.css';

export function SheduledClasses() {

  const [classes, setClasses] = useState<ClassInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await FetchClasses();
      setClasses(data ?? []);
    };
    fetchData();
  }, []);

  return (
    <Card className='mx-8 my-4'>
      <CardHeader>
        <CardTitle>Upcoming Fitness Classes:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='text-center p-2 border' style={{width:'23%'}}>Title</th>
                <th className='text-center p-2 border' style={{width:'20%'}}>Date</th>
                <th className='text-center p-2 border' style={{width:'20%'}}>Start Time</th>
                <th className='text-center p-2 border' style={{width:'20%'}}>Trainer</th>
                <th className='text-center p-2 border' style={{width:'10%'}}>Size</th>
                <th className='border' style={{width:'7%'}}></th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                  <tr key={cls.classID} className='border-b'>
                    <td className='text-left p-2 border'>{cls.title}</td>
                    <td className='text-left p-2 border'>{cls.date}</td>
                    <td className='text-left p-2 border'>{cls.time}</td>
                    <td className='text-left p-2 border'>{cls.trainerName}</td>
                    <td className='text-left p-2 border'>{cls.classSize}</td>
                    <td className='items-center p-1 border'>
                      <button 
                        className='bg-red-700 hover:bg-red-800 button-style' 
                        onClick={() => RemoveRow(cls, classes)}>
                      Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function RemoveRow(cls: ClassInfo, classes: ClassInfo[]) {
  if(confirm('You are about to remove the following fitness class: ' + cls.title)) { // prompt user to ensure they meant to delete the class
    const removeRow = async () => {
      await RemoveClass(cls.classID);
      window.location.reload(); // refresh page to show updated table
    }
    removeRow();
  };
}