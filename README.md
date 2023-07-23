# JS Pros Main Site

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What is it?

A website to organize the challenges offered to members of **Not Another Course**.

Repos, videos and documents which will help you on your journey as a software developer.

This site stores the data in Supabase, deployed via Vercel, uses Tailwind for styling and Next Auth with Github.

The site is public and available for anyone but certain pages like `Readings` and certain content within pages is privatized for members.

For example, a user who is part of the course and signed in will see that all repos/videos and documents are clickable.

A non-auth user will see an overlay asking them to sign up if they are not part of the program.

### Contributing

Find an issue in the open issues tab https://github.com/CodeCoachJS/js_pro_main_site/issues and work with Brian to get it assigned so you can begin working on it.

To get the project working locally you will need to add a `.env` file at the root of the project. Contact Brian via slack to get the environment variables and please do not share them with anyone else.

**Git flow:**

- create a branch off `main` with a sensible name (e.g. `fix_filtering_on_homepage`)

- open a pull request against the `main` branch when you're ready and add Brian as a reviewer

- once your work has been approved, it will merged to `main` which triggers a deployment to the production site!
