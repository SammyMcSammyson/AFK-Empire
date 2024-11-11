import SeedData from '@/components/SeedData';
import ShopItems from '@/components/ShopItems';
export default async function devPage() {
  return (
    <div>
      <SeedData />
      <ShopItems />
    </div>
  );
}
