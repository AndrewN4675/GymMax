'use client';

import { redirect } from 'next/navigation'
import Link from 'next/link';
import Head from 'next/head';
import Styles from './page.module.css';
import { FetchTrainers } from './trainerfetch'
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
              <h3>Name: {trainer.FirstName} {trainer.LastName}</h3>
              <p>Trainer ID: {trainer.TrainerID}</p>
              <p>Expertise: {trainer.Expertise}</p>
              <p>Phone number: {trainer.PhoneNumber}</p>
              <p>Email: {trainer.Email}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className={Styles.footer}>
        <p>&copy; 2025 GymMax | All rights reserved.</p>
      </footer>
    </div>
  );
}
