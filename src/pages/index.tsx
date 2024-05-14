import Head from "next/head";
import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  return (
    <>
      <Head>
        <title>Label cuboids in a point cloud</title>
        <meta
          name="description"
          content="Simple front-end web application to create/adjust cuboids"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/3Dicon.png" />
      </Head>
      <ThreeScene />
    </>
  );
}
