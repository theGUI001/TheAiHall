# The AI Hall
#### Video Demo:  https://www.youtube.com/watch?v=_W1CzFUBpL4
#### Description:
**AI Hall is a website that was made to share AI-generated images as well as your prompts among friends and members of a discord community.**

#### The site has the following 7 pages:

- Home (/app/page.jsx): Feed with all posts
- Upload (/app/upload/page.jsx): Page for submit a new post/image
- Register (/app/upload/page.jsx): Typical sign up page
- Post (/app/post/[postID].jsx): Displays all information (no character limit) and image of a post
- Login (/app/auth/signin/page.jsx): Typical login in page
- Login Wrong Credentials (/app/auth/loginerror/page.jsx): Typical login page with error message
- Logout (Next Auth Function): Confirms that the user really wants to log out

Why use 2 pages for login and error on login?

The project uses the nextauth plugin that sends the login message as a query parameter to a pre-established url and some errors were occurring when obtaining the query values on a page, consequently I was not able to make a message appear on the login page so to work around this I created a page with the same login component but with an invalid credentials message at the top and now when there is a login error the user is redirected to the login page with the error message

#### The site has the following components:

- Detailed Post (/Components/DetailsPost/index.jsx): Displays all information (no character limit) and image of a post
- Navbar (/Components/Navbar/index.jsx): Typical navbar
- Post (/Components/Post/index.jsx): Displays a post (small version) with your information and character limit at the prompt
- Register Form (/Components/RegisterComponent/index.jsx): Registration form
- Login Form (/Components/SignInComponent/index.jsx): Login form
- Button (/Components/Elements/Button.tsx): Button component
- Text Input (/Components/Elements/TextBox.tsx): Text input component

Why use the Navbar, Register Form and Login Form as components and not place them directly in the layout/your specific  pages?

These components were used as components due to Next.js rendering fundamentals, in this case these components need to be rendered on the client to work perfectly, therefore they cannot be placed directly in the code that runs on the server.
For more details access the [Next.js Documentation](https://beta.nextjs.org/docs/rendering/server-and-client-components)

#### The site has the following API routes

- Post Details (/api/post/[postId].js): Returns only the specified post
- Posts (/api/posts.js): Returns all posts
- Errors (/api/errors.js): Redirects to Login Wrong Credentials page
- Register (/api/register.js): Handles user sign up (hashes the password and inserts usr + pswd into database)
- Upload (/api/upload.js): Handles post image upload to OCI and inserts post information into database

#### Middleware

The middleware's only function is to redirect users to the login page when trying to access the upload page when not logged in

#### Comments

The entire site was built using [Next.js 13](https://beta.nextjs.org/docs), [Tailwind CSS](https://tailwindcss.com/docs/) and [SQLite3](https://www.sqlite.org/docs.html)

#### How to run on your local machine

Install all npm modules
```
npm install
```

Start the development server
```
npm run dev
```
or
```
npx next dev
```
