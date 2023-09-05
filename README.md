# JS Pros Main Site

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

---

## What is it?

---

A website to organize the challenges offered to members of **Not Another Course**.

Repos, videos and documents which will help you on your journey as a software developer.

This site stores the data in Supabase, deployed via Vercel, uses Tailwind for styling and Next Auth with Github.

The site is public and available for anyone but certain pages like `Readings` and certain content within pages is privatized for members.

For example, a user who is part of the course and signed in will see that all repos/videos and documents are clickable.

A non-auth user will see an overlay asking them to sign up if they are not part of the program.

---

### Contributing

---

Find an issue in the open issues tab https://github.com/CodeCoachJS/js_pro_main_site/issues and work with Brian to get it assigned so you can begin working on it.

To get the project working locally you will need to add a `.env` file at the root of the project.

---

### Getting Started with Supabase

---

You'll need to have Docker installed on your machine to run the supabase commands and create an account on supabase.

The docs are great and can be found here: https://supabase.com/docs/guides/cli/local-development#database-migrations

```bash
npx supabase login
npx supabase start
```

Update your `.env` file with the correct supabase `API URL` and supabase `service_role key` from the previous command.

You can find the url and `service_role key` by running

```bash
 npx supabase status
```

It should look like this

```
NEXTAUTH_SECRET=<your_nextauth_secret>
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=<your_github_id>
GITHUB_SECRET=<your_github_secret>
SUPABASE_SECRET=<service_role key>
SUPABASE_URL=http://localhost:54321
GITHUB_PERSONAL_TOKEN=<your_github_personal_token>
```

Now run

```bash
npx supabase db reset
```

This should seed the database for local development

---

### Git flow

---

- create a branch off `main` with a sensible name (e.g. `fix_filtering_on_homepage`)

- open a pull request against the `main` branch when you're ready and add Brian as a reviewer

- once your work has been approved, it will be merged to `main` which triggers a deployment to the production site!
