# Developer notes:
## Issues encountered:

1. pcd file not loaded (because I was calling renderer.render before?)
2. LoaderType not reconnised (I found an example with @react-three)
3. loading the pcd twice because of React strict mode and attempts to remove the old scene failed 
(so I also checked in the useEffect if scene is already loaded)
image.png
4. I couldn't find anything related to the  render method initially so I spent a lot of time not knowing why my cuboid wasn't appearing
5. Adding a cube on the clicked position: I entered a small rabit hole trying to figure out how to render at the exact position. After changing the camera position to view the entire pcd file this turned out even more challenging. At some point I dropped it to finish the rest of the app, but then I got an ideea which worked for that specific camera position. However the zoom is disabled because the creation of the cubiods won't work properly after zoom, or for screen resize (the formula for the mouse position needs to be recalculated for that or overall improved -> an ideea would be a raycaster related implementation)

## Ideas to improve the asignment:
1. Add some edges to the cuboids
2. Only display the controls for a selected cuboid. Give option to click on cuboids for select and consider letting the user to also choose from a dropdown the cuboid he wants to edit. On hover highlight the cuboid in the scene (for this create an array with all the cuboids)
3. Add handlers on cuboid click (selection, change position on drag)
4. Allow zoom in and out and still properly calculate the mouse position on the scene.
5. Allow entire scene rotation and take it into account when creating a new cuboid
6. Edit cuboinds name. For a bigger project having a way to visualize all the cuboids and label them would be very usefull (ex a modal with a table containing all cuboinds)

## (end of Developer notes) 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


# Learn More


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

