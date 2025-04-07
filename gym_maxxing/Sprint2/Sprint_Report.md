# Sprint 2 Report

**Video Link:** TODO

## What's New (User Facing)
* User password encryption with SHA256
* Private user sessions after login (admin and member)
* Admin fitness class management page
* Member fitness class viewing page
* Password recovery feature
* Manage membership plans page 

## Work Summary (Developer Facing)
During sprint 2, our team focused on implementing some connecting features such as class viewing and scheduling as well as focusing on improving the security of our application with encrypted sensitive information, password recovery systems, and private sessions. Each team member felt more comfortable with the tech stack and ran into less issues than during sprint 1. The team aslo continued with collaboration methods, passing around ideas for pages and questions that they had, developing an overall great development amosphere. THe only obstacles that were encountered were Vercel deployment logs which cannot be accessed by anyone else in the group other than Andrew since he is the account in which the application is deployed through, but these issues were not too difficult to overcome as communication was quick and reliable.

## Unfinished Work
All planned features for this sprint were successfully completed. Features that are left and will be implemented in upcoming sprints include: payment automation, smartwatch data synchronization, management of membership plans, and viewing detailed trainer profiles.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:
* [Manage and schedule fitness classes (High)](https://github.com/AndrewN4675/GymMax/issues/8) - Andrew Neal
* [Encrypted Sensitive Information (Medium)](https://github.com/AndrewN4675/GymMax/issues/19) - Andrew Neal
* [Private Session Using Cookies (High)](https://github.com/AndrewN4675/GymMax/issues/22) - Calvin Wieland
* [Password Recovery (Low)](https://github.com/AndrewN4675/GymMax/issues/13) - Derek Williams
* [Manage membership plans (High)](https://github.com/AndrewN4675/GymMax/issues/2) - Derek Williams
* [View scheduled fitness classes (High)](https://github.com/AndrewN4675/GymMax/issues/4) - Philip Rickey

## Incomplete Issues/User Stories
Here are links to issues we worked on but did not complete in this sprint: All features that were started during this spring were completed

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [manageClasses.tsx](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/manage_classes/page.tsx)
* [scheduledClasses.tsx](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/scheduled_classes/page.tsx)
* [testSession.tsx](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/testSession/page.tsx)

## Retrospective Summary

**Here's what went well:**
* Successfully implemented all core features scheduled for the sprint
* Team felt familiar with tech stack and so production went very smoothly
* Effective collaboration resolved any questions on implementation methods
* Teammates made sure to check with others before commiting changes to our database tbles ensuring that they would not arise any unknown errors

**Here's what we'd like to improve:**
* Trainer profile management page is buggy and needs refinement
* Not all pages requires a session to be accessed, posing security risks to the system
* Most pages encompase a collective gym (manage_classes for example) so with the sessions we need to ensure they are tied to the gym table throught a foreign key
* View classes page is a little unintuitive and could be replaced with a calendar if time allows

**Here are changes we plan to implement in the next sprint:**
* Improve trainer profile management page to remove bugs and enhance usability
* Esure all pages requires a login and session and members cannot view admin pages and vice versa

---

**Team Members:**  
- Derek Williams (Project Leader): 011868372  
- Philip Rickey: 11820687  
- Calvin Wieland: 11799943  
- Andrew Neal: 11844393  

**Instructor:**  
Parteek Kumar  

**Course:**  
CPT_S 451 – Introduction to Database Systems
