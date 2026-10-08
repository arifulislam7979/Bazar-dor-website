import AllProduct from "./components/AllProduct";
import Header from "./components/Header";
import PriceDown from "./components/PriceDown";
import PriceUp from "./components/PriceUp";


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
