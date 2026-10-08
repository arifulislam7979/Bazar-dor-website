import AllProduct from "./components/AllProduct";
import Header from "./components/Header";
import PriceUp from "./components/PriceUp";
import PriceDown from "./PriceDown";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <PriceUp></PriceUp>
      <PriceDown></PriceDown>
      <AllProduct></AllProduct>
    </div>
  );
}
