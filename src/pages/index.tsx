import {GetServerSideProps} from "next";
import Head from "next/head";
import {SubscribeButton} from "../components/SubscribeButton";
import {stripe} from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>{`for ${product.amount}  per month`}</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1Kk8avIihaK5LKRnlJ7oyzMf", {
    // expand: ["product"], use to expand information about products in price
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: price.currency,
    }).format(price.unit_amount / 100),
  };

  return {
    props: {product},
  };
};
