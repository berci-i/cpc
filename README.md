# Developer notes:
## Issues encountered:

1. Loading pcd file (because renderer.render was called before)
2. LoaderType not reconnised 
3. loading the pcd twice because of React strict mode and attempts to remove the old scene failed 
4. I couldn't find anything related to the  render method initially => the cuboid wasn't appearing
5. Adding a cube on the clicked position: After changing the camera position to view the entire pcd file this turned out even more challenging. Added a fixed which works for a specific camera position. However the zoom is disabled because the creation of the cubiods won't work properly after zoom, or for screen resize (the formula for the mouse position needs to be recalculated for that or overall improved -> an ideea would be a raycaster implementation)

## Ideas to improve the asignment:
1. Add some edges to the cuboids
2. Only display the controls for a selected cuboid. Give option to click on cuboids for select and consider letting the user to also choose from a dropdown the cuboid he wants to edit. On hover highlight the cuboid in the scene (for this create an array with all the cuboids)
3. Add handlers on cuboid click (selection, change position on drag)
4. Allow zoom in and out and still properly calculate the mouse position on the scene.
5. Allow entire scene rotation and take it into account when creating a new cuboid
6. Edit cuboinds name. For a bigger project having a way to visualize all the cuboids and label them would be very usefull (ex a modal with a table containing all cuboinds)
7. For a real react app the following code should be considered for improves:
```
const sceneContainer = document.getElementById("scene-container") || document.body;
        sceneContainer.appendChild(renderer.domElement);
```
This is beucase is not a good practice to update state using DOM manipulation (beucause react won't be aware of that element and won't be able to properly update it). 
However for first version this should be fine, since the scene shouldn't be dependent on react re-renders but on the props (like renderer, scene, camera, etc.) and also the context makes sure that, if something gets reinitialized the hole content will be re-rendered.  

## (end of Developer notes) 

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

