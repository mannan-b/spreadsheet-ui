#Spreadsheet UI

Deployed Webpage Link: https://mannan-b.github.io/spreadsheet-ui/

This webpage is a pixel close version of the following image:  
<img width="2880" height="2048" alt="assignment" src="https://github.com/user-attachments/assets/18bddb01-b24b-4249-8526-4aab27d79c9c" />
with major focus on front end design aspect, but keeping no dead ui.

Features included: (i). implemented segregation of orders among all orders, pending, reviewed, arrived
(ii). all buttons work, either send alerts or actually change the ui
(iii). emojis included to avoid the compromise on ui due to a lot of icons

Trade-off: This project will not pass npm run type-check because its not written in typescript, typescript had its own complexities which got the best of my time even after converting every single file to .tsx (included in commit history). But the javascript code can be easily converted to typescript code with minor changes, to get the additional troubleshooting benefits of typescript.

Tech Stack: 
i. React 18 (Vite)
ii. Tailwind CSS
iii. Javascript

Setup was intended to be kept clean, there are just 4 components used which are all in ./src/components and Appp.jsx is the main application file which glues everything together.
