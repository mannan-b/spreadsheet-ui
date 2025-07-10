#Spreadsheet UI

Deployed Webpage Link: https://mannan-b.github.io/spreadsheet-ui/

This webpage is a pixel close version of https://www.figma.com/design/3nywpu5sz45RrCmwe68QZP/Intern-Design-Assigment?node-id=
2-2535&t=DJGGMt8I4fiZjoIB-1 with major focus on front end design aspect, but keeping no dead ui.

Features included: (i). implemented segregation of orders among all orders, pending, reviewed, arrived
(ii). all buttons work, either send alerts or actually change the ui
(iii). emojis included to avoid the compromise on ui due to a lot of icons

Trade-off: This project will not pass npm run type-check because its not written in typescript, typescript had its own complexities which got the best of my time even after converting every single file to .tsx (included in commit history). But the javascript code can be easily converted to typescript code with minor changes, to get the additional troubleshooting benefits of typescript.

Tech Stack: 
i. React 18 (Vite)
ii. Tailwind CSS
iii. Javascript

Setup was intended to be kept clean, there are just 4 components used which are all in ./src/components and Appp.jsx is the main application file which glues everything together.
