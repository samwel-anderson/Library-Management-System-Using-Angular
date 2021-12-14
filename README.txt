


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


6. Create Register, Login & Logout Components in Authentication Module
   ng generate component authentication/register
   ng generate component authentication/login
   ng generate component authentication/logout


7. Create Guards to protect routes
   ng generate guard guards/auth


8. Create Interceptors to Intercept our network requests
   ng generate interceptor services/interceptors/error


9. Create Books Module & Components & Interfaces & Services
      ng generate module books --routing
      ng generate component books/index
      ng generate service books/services/book
      ng generate interface books/interfaces/book



10. Create Jwt Interceptor
      ng generate interceptor services/interceptors/jwt


11. Generate Menu Service to display Menu based on Roles / Permissions
      ng generate service services/menu


12. Create Register Interface
      ng generate interface interfaces/register

13.  Create View, Create, & Edit Components
      ng generate component books/view
      ng generate component books/edit
      ng generate component books/create



14.  Create Student Dashboard
      ng generate component dashboard/student-dashboard


15.  Create Shared Components
      ng generate component dashboard/shared/summary-tile


16.  Create Test Output Component
      ng generate component dashboard/shared/test-output
