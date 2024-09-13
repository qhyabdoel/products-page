"use client";

import { getCategoriesApi, getDataApi } from "@/actions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface productItemProps {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

interface categoryProps {
  name: string;
  slug: string;
}

export default function Home() {
  const [products, setProducts] = useState<Array<productItemProps>>();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCateories] = useState([]);

  useEffect(() => {
    getDataApi(0)
      .then((res) => {
        // console.log({ res });
        setProducts(res?.products || []);
        setTotalPage(Math.ceil(res?.total || 0));
      })
      .catch((err) => console.log({ err }));

    getCategoriesApi()
      .then((res) => {
        // console.log({ res });
        setCateories(
          res.map((item: categoryProps) => ({
            name: item.name,
            slug: item.slug,
          }))
        );
      })
      .catch((err) => console.log({ err }));
  }, []);

  // useEffect(() => console.log({ categories }), [categories]);

  useEffect(() => {
    getDataApi(currentPage)
      .then((res) => setProducts(res?.products || []))
      .catch((err) => console.log({ err }));
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-3">
        <p className="mb-1">Filter By Category</p>
        <select className="bg-gray-200 py-1 px-2 rounded-sm">
          {categories.map((cat: categoryProps, index: number) => (
            <option key={index} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <p className="mb-1">Sort By Price</p>
        <select className="bg-gray-200 py-1 px-2 rounded-sm">
          <option key={0} value={0}>
            -select-
          </option>
          <option key={1} value={"asc"}>
            Asc
          </option>
          <option key={2} value={"desc"}>
            Descending
          </option>
        </select>
      </div>

      <div className="flex flex-wrap">
        {products &&
          products.map((product: productItemProps, index: number) => (
            <div key={index} className="w-1/2 pr-4 py-2">
              <div className="border border-gray-400 rounded-md ">
                <div className="flex flex-row">
                  <div className="flex-auto py-4 px-8">
                    {/* title, description, price  */}
                    <p className="font-bold text-xl mb-2">{product.title}</p>
                    <p>{product.description}</p>
                    <p className="text-lg font-bold mt-2">{product.price}</p>
                  </div>
                  <div className="flex-none w-48 py-2">
                    <Image
                      src={product.thumbnail}
                      alt=""
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-row px-4 py-4">
        <div className="flex-auto">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-600 text-white w-32 py-3 rounded-md font-bold"
          >
            {"< PREV"}
          </button>
        </div>
        <div className="flex-none">
          {currentPage <= totalPage && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-blue-600 text-white w-32 py-3 rounded-md font-bold"
            >
              {"NEXT >"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
