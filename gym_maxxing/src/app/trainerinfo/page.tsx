"use client"

import { redirect } from 'next/navigation'
import Link from 'next/link';
import Head from 'next/head';
import Styles from './page.module.css';
import { FetchTrainers } from './trainerfetch'
import { updateTrainerInfo } from './trainerupdate'
import { useEffect, useState } from "react";

type Trainer = {
  TrainerID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Expertise: string;
  Email: string;
};

export default function Login() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    FetchTrainers()
      .then((data: Trainer[]) => setTrainers(data))
      .catch((err) => console.error("Error loading trainers:", err));
  }, []);


  const handleChange = (trainerId: number, field: string, newValue: string) => {
    const updatedTrainers = trainers.map((trainer) => {
      if (trainer.TrainerID === trainerId) {
        return {...trainer, [field]: newValue, };
      }
      return trainer;
    });

    setTrainers(updatedTrainers);
  };

  const handleSubmitChanges = async () => {
    try {
      // Update the trainers
      const response = await updateTrainerInfo(trainers);


      if (response.success) {
        alert('Trainer information updated successfully!');
      } else {
        alert('Failed to update trainer information.');
      }
    } catch (error) {
      console.error('Error submitting changes:', error);
      alert('Error submitting changes.');
    }
  };

  return (
    <div className={Styles.page}>
      <Head>
        <title>GymMax | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className={Styles.header}>
        <nav>
          <ul className={Styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/membership">Membership</Link></li>
            <li><Link href="/classes">Classes</Link></li>
            <li><Link href="/trainers">Trainers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className={Styles.mainContent}>
        <section className={Styles.hero}>
          <h1>Trainer Manager Page</h1>
        </section>

        <section className={Styles.features}>
          <h2>Our Features</h2>
          {trainers.map((trainer) => (
            <div key={trainer.TrainerID} className={Styles.featureCard}>
              <h3>Name: 
                <input type="text" value={trainer.FirstName} onChange={(e) => handleChange(trainer.TrainerID, 'FirstName', e.target.value)}/>
                <input type="text" value={trainer.LastName} onChange={(e) => handleChange(trainer.TrainerID, 'LastName', e.target.value)}/>
              </h3>
              <p>Trainer ID: 
                <input type="text" value={trainer.TrainerID} onChange={(e) => handleChange(trainer.TrainerID, 'TrainerID', e.target.value)}/>
              </p>
              <p>Expertise: 
                <input type="text" value={trainer.Expertise} onChange={(e) => handleChange(trainer.TrainerID, 'Expertise', e.target.value)}/>
              </p>
              <p>Phone number: 
                <input type="text" value={trainer.PhoneNumber} onChange={(e) => handleChange(trainer.TrainerID, 'PhoneNumber', e.target.value)}/>
              </p>
              <p>Email: 
                <input type="text" value={trainer.Email} onChange={(e) => handleChange(trainer.TrainerID, 'Email', e.target.value)}/>
              </p>
            </div>
          ))}
          <button onClick={handleSubmitChanges} className={Styles.ctaButton}>Submit Changes</button>
        </section>
      </main>

      <footer className={Styles.footer}>
        <p>&copy; 2025 GymMax | All rights reserved.</p>
      </footer>
    </div>
  );
}