This is our Project it will go really well and will be really simple --- Sam 7/11/2024.

It was anything but simple --- Sam 15/11/2024

Welcome to AFK Empire below we will go into the development of the project from concept creation to final implementation but first a quick overview of the game.

            It is very simple, you click the button to get money. You use that money to upgrade your gear. You then fight the monsters in the dungeon with your equiped gear. The more monsters you kill the more rewards you get.

Click the link and have a go - https://afk-empire.vercel.app/

Concept and Planning.

    We decided very early on we wanted to make a game since it is an easy way to engage the user - it is also where our intrests lie. Once this was decided we naturally decided on idle clicker games since this was something we had experience in and we thought it would be relativley simple - fun fact it was not - it was also a project that we had enjoyed in the past. It was also something that we could very easily add to and expand later on, this gave the project major scope.

    With a concept set we went on to our most important step - making sure we had ample amounts of coffee to hand. We then went to our 2nd most important step - wireframes, trello boards and user stories. We made a design, planned out features and divied up the work - making sure that we were all doing something that we were not comfortable with. Feel free to have a gander at some of our user stories below...

            As a user, I want to sign up and log in securely using Clerk so that I can interact with the app as a user on the site .

            As a player, I want my counter to increase when I click the attack button and decrease when I buy items so that I can track my progress and manage my resources effectively.

            As a player, I want my health and DPS to change based on the items I buy from the shop, so that I can strengthen my character for tougher battles.

            As a player, I want to customize my profile by picking an avatar, updating my bio, and viewing my current items and stats, so that I can personalize my experience and track my progress.

            As a player, I want to buy and sell items in the shop to improve my stats, so that I can enhance my gameplay and progress in the dungeon.

            As a player, I want to engage in combat with enemies in the dungeon, where I can earn rewards on success or return to the landing page on failure so that I can experience progression and consequences in the game.

            As a user, I want an enhanced user experience with modern UI components, such as using a Radix UI Primitive or a similar library, so that the interface is more intuitive and visually appealing.

    Sorting out our conflict management was a simple and effective. There were 3 members on the team so a simple 2-1 vote was to be taken with the winner having to remark "Suck it up, buttercup" to the loser - we felt public humiliation in this manner would make us all the more keen to negotiate if there was a dissagreement. But alas no tie break was needed. Then all hell broke loose...

First Steps

    On the heels of freshly topping up our coffee cups and lamenting over our now canceled weekend plans we had our first big decision to make. React or Next.js. Sam was on the fence while Mary and Dave were all about the Next.js life. Before it could spiral into a full blown argument the convincing line was uttered. "We do not need to worry about all that Server stuff in Next".

    Next we to set up Github and Vercel - after Sam led some people astray trying to be fancy the show was (finally) on the road. Dave was handling all the Clerk authentication, Mary was smashing out the dungeon page while sorting out styling and Sam was and is a valuable member of the team.

In The Thick Of It

    It was open water and smooth sailing we had pretty much completed the trello board and eyeing up the stretch goals we were about to tackle. All that was left was "Linking the shop and the dungeon page...Only a few lines of SQL then we have finished". And in said individuals defence it was only a few lines of SQL however they were wrapped in about 60 lines of other code to get it to work. We had run into the age old problem of getting Client and Server side talking to each other.

    However through teamwork, coffee and a healthy amount of luck - there is a function which when you remove a comment from it it stops working I cannot explain how or why this happens but it is best left alone. We got there we had a fully functioning MVP. Winning.

Stretch Goals

    Finally we were on to icing this beautiful cake we had made. We have listed our stretch goals below but it would go amiss to not mention some shoutouts. While adding the audio elements was not an original strech goal it elevates the game to the next level for user experince - an absloute inspired decision by Mary. As well as Dave's "I got annnoyed at some code not working so I made a forum to blow off some steam" fully function comments board allows a genuine community to form. As well as Sam being a valuable member of the team.

            Radix/Toastify
            Dungeon Page - includes Audio and pictures as well as dynamically generated enemies.
            Custom error pages.
            UI/CSS/Tailwind
            extra features/functionality

Deployment

    Now came the true test - Vercel Deployment. On our first attept we set a record - quickest ever vercel deploymeny failure with a grand time of 2 seconds. Not the start we were looking for but we pushed ahead. After some quick fixes we were running into some issues and nothing seemed to work. THen Sam got reminded to check the env variables and it was at this point Sam remebered he never put them in. After this slight hiccup we were up and running and had a fully functioning project.

Bug Fixes

    Naturally when you run through a project for the first time you notice some things that don't run as smoothly as you want and we went to fixing these things. However there was one where we just ran out of time and could not fix. Now before I carry on I would like to introduce a man named Joe. He is very nice and helped us out during the deployment to fix things that went wrong and he made it very clear that we could not add anymore code since time was up and if anything broke he would not help to fix it since he was not allowed. Anyway Sam ignored him and carried on fixing the bugs figuring he would ask Manny if anything broke.

The Fat Lady Sings

    I could wax a lyrical about about the trials and trepidations we faced and the ups and the downs of doing this however I can sum it up in a few words.

                "Fucking Smashed it" #Winning

Signing Off

Mary, Dave and Sam

Team Week 12

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

P.S. We were meant to come up with a better name but we never got round to it - deal with the placeholder.

P.P.S. See below how we ranked ourselves

Web Fundamentals
HTML
This evaluates your ability to use HTML and JSX to structure content effectively and semantically.

3 = Uses semantic HTML elements and JSX to structure content
4 = Breaks down pages into reusable components (e.g., React components) ✅

CSS
This measures how well you apply CSS to style your pages in a structured and effective manner.

3 = CSS is well-organized, with thematic groupings or comments for sections
4 = Includes advanced CSS features like pseudo-classes, transitions, or animations, or utilises a CSS framework like Tailwind ✅

Responsive Design
This assesses how well your website adapts to different screen sizes and devices.

3 = Implements media queries and maintains functionality on mobile devices ✅
4 = Ensures full functionality and optimised user experience across all device sizes

UI
This evaluates how effectively your user interface is designed for usability and visual appeal.

3 = User interface is thoughtfully designed and visually appealing ✅
4 = UI design demonstrates excellence in creativity, user experience, and functionality

Accessibility
This measures the accessibility of your website.

3 = Meets basic accessibility standards as tested by Lighthouse
4 = Achieves high accessibility scores (above 90%) and includes additional accessibility features ✅

Programming Logic
Readable Code
This assesses the clarity and organisation of your code.

3 = Code is well-organised with semantic naming, proper indentation, and line breaks
4 = Includes comments to explain complex decisions and has been refactored for clarity and reduced repetition ✅

CRUD
This evaluates the implementation of Create and Read (and Update, and Delete) operations within your application.

3 = Implements basic CR(UD) functionality with correct data schema and queries
4 = Manages CR(UD) permissions and relationships, such as user-specific data or relational tables with foreign keys ✅

Forms
This measures the effectiveness of form handling and validation within your application.

3 = Forms correctly submit and handle data
4 = Forms include validation features to enforce data requirements and informs the user ✅

More Advanced JavaScript
This assesses your use of advanced JavaScript features and concepts.

3 = Uses ES6 features like let, const, arrow functions, and template literals
4 = Employs a broader range of advanced features or utilises TypeScript ✅

Modern Development Tools
App
This evaluates the use of modern frameworks or libraries to build your application.

3 = Uses a framework or library such as Next.js or React
4 = Integrates third-party libraries like Radix, MUI, or Framer Motion ✅

Routes
This measures the implementation of dynamic routing within your application.

3 = Implements dynamic routes and parameters
4 = Above and uses query strings for advanced functionalities like filtering, sorting, or searching ✅

Authentication
This assesses how authentication is implemented and utilised within your application.

3 = Basic authentication functionality is in place
4 = User IDs are used to associate and manage data specific to users ✅

Manage State
This evaluates how effectively you manage application state.

3 = Manages state using useState and props ✅
4 = Implements state management with advanced methods like useContext or useReducer

Planning
This measures the effectiveness of your project planning.

3 = Maps out pages and components
4 = Provides explanations of structural and tool choices in the presentation ✅

Accessibility
This assesses the implementation of accessible design practices.

3 = Keyboard navigation and accessibility features
4 = Additional accessibility features, such as voiceover support, are implemented ✅

Deployment
This evaluates how well you deploy and share your application.

3 = Deployed to Vercel or Render
4 = Includes a README.md to help others understand and use the code ✅

Dev Skills & Industry Practices
Planning
This measures the thoroughness and clarity of your project planning process.

3 = Includes user stories, problem domain, wireframes, file/page/component planning, and Trello (or other project management tools).
4 = Provides critical reflections on project challenges, successes, and learnings ✅

Version Control
This assesses your use of Git for version control and collaborative development.

3 = Uses clear commit messages, manages branches, and employs pull requests for code merging
4 = Demonstrates advanced version control practices like resolving merge conflicts without help from staff - mentioning this in the presentation ✅

Professional Skills
Presenting
This evaluates your ability to present your project effectively.

3 = Uses presentation tools, follows a clear structure, and adheres to the 10-minute time limit ✅
4 = Excellence in presentation flow, audience engagement, and use of visual aids

Collaborating (Peer and Self Assessed)
This measures your effectiveness in team collaboration and peer evaluation.

3 = Contributes to the group’s discussions and the group’s project, works together to learn (e.g. paired programming), contributes to team cohesion, and evaluates colleagues generously but fairly
4 = Demonstrates active engagement, group support, and constructive feedback in team settings ✅

76/80
