# JS Pros Main Site

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What is it?

A website to organize the challenges offered to members of **Not Another Course**.

Repos, videos and documents which will help you on your journey as a software developer.

This site stores the data in Supabase, deployed via Vercel, uses Tailwind for styling and Next Auth with Github.

The site is public and available for anyone and there's no real need to sign in other than to show what repos are publicly available.

For example, a user who is part of the course and signed in will see that all repos are clickable.

A non-auth user will see an overlay asking them to sign up if they are not part of the program.

The `/videos` route is auth protected and available to logged in users.
