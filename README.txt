


STEPS

1. Upgrade from Angular 11 to Angular 13
npx @angular/cli@12 update @angular/core@12 @angular/cli@12
ng update
npx @angular/cli@13 update @angular/core@13 @angular/cli@13

2. Generate Dashboard Module
   ng generate module dashboard --routing

   2.1 Generate default dashboard component

   ng generate component dashboard/default-dashboard

3. Generate Token Service
  ng generate service services/token

4. Generate Auth Service
  ng generate service services/auth


5. Generate Interfaces
  ng generate interface interfaces/login


5. Generate Authentication Module
   ng generate module authentication --routing


6. Create Register &  Login Component in Authentication Module
   ng generate component authentication/register
   ng generate component authentication/login


7. Create Guards to protect routes
   ng generate guard guards/register
   ng generate component authentication/login
