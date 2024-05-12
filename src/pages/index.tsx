import Head from "next/head";
import { Inter } from "next/font/google";
import ThreeScene from "@/components/ThreeScene";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Label cuboids in a point cloud</title>
        <meta name="description" content="Simple front-end web application to create/adjust cuboids" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <ThreeScene />
        </div>

      </main>
    </>
  );
}
