import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type ProductCardItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageName: string | null;
};

type Props = {
  products: ProductCardItem[];
};

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png";
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col px-6 py-14 sm:py-20">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-heading text-4xl font-extrabold tracking-[0.01em] sm:text-5xl text-foreground">
          สินค้าทั้งหมด
        </h2>
        <p className="font-sans text-muted-foreground text-[16px]">
          เลือกช้อปสินค้าคอลเลคชันยอดนิยมที่ตอบโจทย์ไลฟ์สไตล์และความเป็นตัวคุณ
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-12 rounded-[16px] border border-dashed border-[#D4D4D4] px-6 py-20 text-center text-muted-foreground bg-white shadow-subtle">
          ยังไม่มีสินค้าในฐานข้อมูล
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article 
              className="group flex flex-col overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-product-hover hover:-translate-y-1 hover:border-[#D4D4D4]" 
              key={product.id}
            >
              {/* Product Image - Flush to container top */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
                <Image
                  alt={product.name}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={getProductImage(product)}
                />
              </div>

              {/* Product Content - 16px Padding */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Category Tag */}
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {product.categoryName}
                  </span>
                  
                  {/* ID Tag using Secondary Cyan badge */}
                  <Badge className="bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20 text-[#083344] border-none text-[11px]">
                    PRODUCT #{product.id}
                  </Badge>
                </div>

                {/* Product Name using Poppins headline typography */}
                <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-foreground">
                  {product.name}
                </h3>

                {/* Product Description - 14px size (Body Small) */}
                <p className="mt-2 line-clamp-2 min-h-[40px] font-sans text-sm text-[#525252]">
                  {product.description || "ไม่มีรายละเอียดสินค้า"}
                </p>

                {/* Price and Cart Action */}
                <div className="mt-4 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block font-sans">ราคา</span>
                    <span className="text-xl font-extrabold text-foreground font-heading">
                      {priceFormatter.format(product.price)}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <CartButton product={product} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturesProduct;
